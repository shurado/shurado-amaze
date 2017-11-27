
const basicPolicy = (model) => (req, res, next) => {
  const modelType = model.constructor.name;

  /* can only read */
  if (req.method.toLowerCase() !== 'get') {
    return res.status(401).json(null);
  }

  if (!modelType) {
    return next();
  }

  switch (modelType) {
    case 'feed':
      return next();
    case 'user':
      return next();
    case 'comment':
      return next();
    case 'spot':
      return next();
    default:
      return res.status(401).json(null);
  }
}

const ownerOnly = (model) => (req, res, next) => {
  const user = req.user;
  const modelType = model.constructor.name;

  if (req !== 'get') {
    switch (modelType) {
      case 'feed':
      case 'comment':
        return model.user_id === user.id ? next() : res.status(401).json(null);
      case 'user':
        return user.id === model.id ? next() : res.status(401).json(null);
      default:
        return res.status(401).json(null);
    }
  }
  
  res.status(401).json(null);
}


export default function ability(model) {

  return function(req, res, next) {
    basicPolicy(model)(req, res, next);
  };  
}
