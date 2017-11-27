const { pick, pickAll, pathOr, isNil } = require('ramda');

const toHumanReadable = (message, reg) =>
  message.replace(/(Validation error:)+/g, '').replace(/\n/g, '').split(',')

const serialize = (fields, model) => {
  if (!model) {
    return null;
  }

  if (Array.isArray(fields)) {
    return pick(fields, model);
  } else {
    return new TypeError('`serialize fields` should be an array');
  }
  
}

const convertByteSize = (byte) => {
  const KB = 1024;
  const MB = 1024 * 1024;
  const GB = 1024 * 1024 * 1024;

  if (byte > 0 && byte < MB) {
    return Math.floor(byte / KB).toString() + 'KB';
  } else if (byte > KB && byte < GB) {
    return Math.floor(byte / MB).toString() + 'MB';
  } else {
    return Math.floor(byte / GB).toString() + 'GB';
  }

  return 0;
}

/**
 * use for pick data value from Sequlize Object.
 * Sequlize object has complex structure.
 * to fetch its dataValues, you can use this function.
 * 
 * @param  [Sequelize Model] model
 * @return {object || null}
 */
const pickDataValues = (model) => {
  if (model) {
    const data = pickAll(['dataValues'])(model);
    return pathOr(null, ['dataValues'])(data);
  } 

  return null;
}

const nullResponse = (res) => (nullable) => {
  if(process.env.NODE_ENV === 'development') {
    console.log('passing null value, return 404 by default.');
  }

  if (isNil(nullable)) {
    res.status(400).json();
  }
}

const getReqAccept = (req) => {
  return req.accepts(['application/json', 'html']);
}

const render404 = (req, res) => {
  switch(getReqAccept(req)) {
    case 'application/json':
      return res.status(err.status || 500).json({
        error: err,
        message: err.message
      });
    case 'html':
      return res
        .status(err.status || 500)
        .render('error', {
          error: err,
          message: err.message
        });
  }

  return res
          .status(err.status || 500)
          .render('error', {
            error: err,
            message: err.message
          });
}

const uniq = (array) => {
  return array.reduce((acc, curr) => {
    if (acc.indexOf(curr) === -1) {
      acc.push(curr);
    }

    return acc;
  }, [])
}

module.exports = {
  toHumanReadable,
  serialize,
  convertByteSize,
  pickDataValues,
  nullResponse,
  getReqAccept,
  render404,
};
