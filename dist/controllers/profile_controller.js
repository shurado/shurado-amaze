'use strict';

var Router = require('express').Router;

var _require = require('../utils'),
    serialize = _require.serialize;

var route = new Router();
var passport = require('passport');

var jwtAuthenticate = passport.authenticate('jwt', { session: false });

route.get('/profile', jwtAuthenticate, function (req, res, next) {
  if (req.user === null) {
    next('user doesn\'t exist or you have no ability to read it.');
  }

  return res.json({
    user: serialize(req.user.serializeFields)(req.user)
  });
});

module.exports = route;
//# sourceMappingURL=profile_controller.js.map