const request = require('request');
const cheerio = require('cheerio');
const { pickAll } = require('ramda');

const MAX_RESPONSE_TIMEOUT = 10 * 1000;
const URL_REG = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; // eslint-disable-line no-useless-escape
const YOUTUBE_REG = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g; // eslint-disable-line no-useless-escape

const ERROR_CODE_RESPONSE = [400, 404, 500, 403, 401, 402, 302];

const TARGET_META_PROPERTYS = ['og:type', 'og:description', 'og:title', 'og:url', 'og:image'];

function NotValidURLError(message) {
  this.name = 'NotValidURLError';
  this.message = message;

  return this;
}

function ResponseError(message) {
  this.name = 'ResponseError';
  this.message = message;

  return this;
}


NotValidURLError.prototype = Error.prototype;

function WebParser() {
  return this;
}

WebParser.parseWeb = (url) => {
  
  return new Promise((resolve, reject) => {
    if (!URL_REG.test(url)) {
      reject(new NotValidURLError(`input is not Valid URL, got \`${url}\``));
    }  
    request({ url, timeout: MAX_RESPONSE_TIMEOUT }, (error, response, body) => {
      if (error) {
        return reject(new ResponseError(`Response with error ${error}`));
      }

      if ((response && response.statusCode) 
          && ERROR_CODE_RESPONSE.indexOf(response.statusCode) !== -1) {
        return reject(new ResponseError(`Response with error code \`${response.statusCode}\` with URL ${url}`))
      }

      const $ = cheerio.load(body);

      if (YOUTUBE_REG.test(url)) {
        return resolve(pickAll(TARGET_META_PROPERTYS)(WebParser.parseMeta($)));
      }

      return resolve(WebParser.parseMeta($));
    })
  })
}


WebParser.parseMeta = ($) => {
  const pickPropertyMeta = (i, elm) => ({
    [$(elm).prop('property')]: $(elm).prop('content')
  });

  const metasArray = Array.prototype.slice.call($('meta[property]').map(pickPropertyMeta));
  
  return metasArray.reduce((acc, curr) => {
    for (var key in curr) {
      acc[key] = curr[key];
    }

    return acc;
  }, {})
}

module.exports = WebParser;

