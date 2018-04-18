'use strict';

var Router = require('express').Router;
var User = require('../models').user;
var passport = require('passport');

var _require = require('../utils'),
    serialize = _require.serialize,
    toHumanReadable = _require.toHumanReadable;

var _require2 = require('../utils/responseHelper'),
    return404 = _require2.return404,
    return401 = _require2.return401;

var _require3 = require('ramda'),
    pick = _require3.pick;

var jwtAuthenticate = passport.authenticate('jwt', { session: false });

var route = new Router();

route.post('/sign_out', function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (user) {
      res.clearCookie('jwt_token');

      return req.accepts('json') ? res.status(200).json({ success: true }) : res.redirect(200, req.params.redirect || '/');
    }

    return return401(res, 'you\'ve sign out already.');
  })(req, res, next);
});

/* [TODO] user upload avatar logic */
route.route('/:id/avatar').post(jwtAuthenticate, function (req, res, next) {
  res.json({
    message: 'not yet implement.'
  });
});
route.route('/:id/profile').get(function (req, res) {
  User.findById(req.params.id).then(function (user) {
    if (!user) {
      return return404(res, 'user doesn\'t exist');
    }

    return res.json({
      profile: serialize(user.serializeFields, user)
    });
  });
}).post(jwtAuthenticate, function (req, res, next) {
  if (req.user.id.toString() !== req.params.id) {
    return res.status(401).json();
  }

  var allowedParams = pick(req.user.serializeFields)(req.body);

  User.update(allowedParams, { where: { id: req.params.id }, returning: true }).then(function (results) {
    var user = results[1] !== undefined ? results[1][0] : null;
    return user && serialize(user.serializeFields, user);
  }).then(function (value) {
    res.json({ profile: value });
  }).catch(function (err) {
    res.status(400).json({
      errors: toHumanReadable(err.message.replace('Validation error:', ''))
    });
  });
});

module.exports = route;
//# sourceMappingURL=user_controller.js.map