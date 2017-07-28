import { pick, pickAll, pathOr, isNil } from 'ramda';



export const serialize = (fields, model) => {
  if (!model) {
    return null;
  }

  if (Array.isArray(fields)) {
    return pick(fields, model);
  } else {
    return new TypeError('`serialize fields` should be an array');
  }
  
}

export const pickDataValues = (model) => {
  if (model) {
    const data = pickAll(['dataValues'])(model);
    return pathOr(null, ['dataValues'])(data);
  } 

  return null;
}

export const nullResponse = (res) => (nullable) => {
  if(process.env.NODE_ENV === 'development') {
    console.log('passing null value, return 404 by default.');
  }

  if (isNil(nullable)) {
    res.status(400).json();
  }
}

export const getReqAccept = (req) => {
  return req.accepts(['application/json', 'html']);
}

export const render404 = (req, res) => {
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

export const render500 = (res) => {

}
