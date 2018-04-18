'use strict';

var passport = require('passport');

var _require = require('passport-jwt'),
    Strategy = _require.Strategy,
    ExtractJwt = _require.ExtractJwt;

var dotenv = require('dotenv');
var User = require('../models').user;

var _require2 = require('ramda'),
    pathOr = _require2.pathOr;

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    return done(err, false);
  });
});

var fromCookie = function fromCookie(req) {
  return pathOr(null, ['cookies', 'jwt_token'])(req);
};

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([fromCookie, ExtractJwt.fromHeader('authorization')]),
  secretOrKey: process.env.SECRET_KEY
};

/* payload from JWT */
var jwtLogin = new Strategy(jwtOptions, function (payload, done) {
  return User.findById(payload.sub).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    return done(err, false);
  });
});

passport.use(jwtLogin);

module.exports = jwtLogin;
//# sourceMappingURL=jwt.js.map