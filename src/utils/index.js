import { pick, pickAll } from 'ramda';

export const serialize = (fields, model) => {
  if (Array.isArray(fields)) {
    return pick(fields, model);

  } else {
    return new TypeError('`fields` should be an array');
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
