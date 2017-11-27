const Router = require('express').Router;
const { serialize } = require('../utils');

const route = new Router();
const passport = require('passport');

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

route.get('/profile', jwtAuthenticate, (req, res, next) => {
  if (req.user === null) {
    next('user doesn\'t exist or you have no ability to read it.');
  }

  return res.json({
    user: serialize(req.user.serializeFields)(req.user)
  })
});

module.exports = route;
