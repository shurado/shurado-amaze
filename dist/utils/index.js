'use strict';

var _require = require('ramda'),
    pick = _require.pick,
    pickAll = _require.pickAll,
    pathOr = _require.pathOr,
    isNil = _require.isNil;

var toHumanReadable = function toHumanReadable(message, reg) {
  return message.replace(/(Validation error:)+/g, '').replace(/\n/g, '').split(',');
};

var serialize = function serialize(fields, model) {
  if (!model) {
    return null;
  }

  if (Array.isArray(fields)) {
    return pick(fields, model);
  } else {
    return new TypeError('`serialize fields` should be an array');
  }
};

var convertByteSize = function convertByteSize(byte) {
  var KB = 1024;
  var MB = 1024 * 1024;
  var GB = 1024 * 1024 * 1024;

  if (byte > 0 && byte < MB) {
    return Math.floor(byte / KB).toString() + 'KB';
  } else if (byte > KB && byte < GB) {
    return Math.floor(byte / MB).toString() + 'MB';
  } else {
    return Math.floor(byte / GB).toString() + 'GB';
  }

  return 0;
};

/**
 * use for pick data value from Sequlize Object.
 * Sequlize object has complex structure.
 * to fetch its dataValues, you can use this function.
 * 
 * @param  [Sequelize Model] model
 * @return {object || null}
 */
var pickDataValues = function pickDataValues(model) {
  if (model) {
    var data = pickAll(['dataValues'])(model);
    return pathOr(null, ['dataValues'])(data);
  }

  return null;
};

var nullResponse = function nullResponse(res) {
  return function (nullable) {
    if (process.env.NODE_ENV === 'development') {
      console.log('passing null value, return 404 by default.');
    }

    if (isNil(nullable)) {
      res.status(400).json();
    }
  };
};

var getReqAccept = function getReqAccept(req) {
  return req.accepts(['application/json', 'html']);
};

var render404 = function render404(req, res) {
  switch (getReqAccept(req)) {
    case 'application/json':
      return res.status(err.status || 500).json({
        error: err,
        message: err.message
      });
    case 'html':
      return res.status(err.status || 500).render('error', {
        error: err,
        message: err.message
      });
  }

  return res.status(err.status || 500).render('error', {
    error: err,
    message: err.message
  });
};

var uniq = function uniq(array) {
  return array.reduce(function (acc, curr) {
    if (acc.indexOf(curr) === -1) {
      acc.push(curr);
    }

    return acc;
  }, []);
};

module.exports = {
  toHumanReadable: toHumanReadable,
  serialize: serialize,
  convertByteSize: convertByteSize,
  pickDataValues: pickDataValues,
  nullResponse: nullResponse,
  getReqAccept: getReqAccept,
  render404: render404
};
//# sourceMappingURL=index.js.map