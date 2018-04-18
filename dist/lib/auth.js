'use strict';

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/').user;

var _require = require('ramda'),
    pathOr = _require.pathOr;

var moment = require('moment');
var dotenv = require('dotenv');

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

/* not good idea to pass app. */
function init(app) {
  passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_TOKEN,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email', 'birthday', 'gender']
  }, function (accessToken, refreshToken, profile, done) {
    User.find({
      where: { social_account: { facebook: profile.id } }
    }).then(function (user) {
      /**
       * if user did exist, return that user.
       * if user doesn't exist, create user by `profile.id`
       * 
       * make sure there is no chance to create two identical user.
       */
      if (user) {
        done(null, user);
      } else {
        User.create({
          nickname: profile.displayName,
          gender: profile.gender,
          social_account: {
            facebook: profile.id
          },
          avatar_url: {
            facebook: profile.photos[0].value
          }
        }).then(function (user) {
          return done(null, user);
        });
      }
    }).catch(function (error) {
      done(error, false);
    });
  }));
}

function registerRoutes(app) {
  app.get('/auth/facebook', function (req, res, next) {
    passport.authenticate('facebook', {
      callbackURL: '/auth/facebook/callback'
    })(req, res, next);
  });

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/fail' }), function (req, res) {
    var authUserId = pathOr(null, ['passport', 'user'])(req.session);

    if (authUserId) {
      User.findById(authUserId).then(function (user) {
        var jwt_token = user.tokenForUser(process.env.SECRET_KEY);
        res.cookie('jwt_token', jwt_token, {
          expires: moment().add(2, 'months').toDate()
        });

        res.cookie('uid', user.id, {
          expires: moment().add(2, 'months').toDate()
        });

        res.redirect(303, req.param.redirect || '/');
      });
    }
  });
}

module.exports = {
  init: init,
  registerRoutes: registerRoutes
};
//# sourceMappingURL=auth.js.map