
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const User = require('../models/').user;
const { pathOr } = require('ramda');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, false));
});

/* not good idea to pass app. */
function init(app) {
  passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_TOKEN,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email', 'birthday', 'gender']
  }, (accessToken, refreshToken, profile, done) => {
    User.find({
      where: { social_account: { facebook: profile.id } }
    })
      .then(user => {
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
              facebook: profile.id,
            },
            avatar_url: {
              facebook: profile.photos[0].value
            }
          }).then((user) => done(null, user));
        }
      })
      .catch(error => {
        done(error, false);
      })
  }));
}

function registerRoutes(app) {
  app.get('/auth/facebook', (req, res, next) => {
    passport.authenticate('facebook', {
      callbackURL: '/auth/facebook/callback'
    })(req, res, next);
  });

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/fail'}), (req, res) => {
    const authUserId = pathOr(null, ['passport', 'user'])(req.session);

    if (authUserId) {
      User.findById(authUserId).then(user => {
        const jwt_token = user.tokenForUser(process.env.SECRET_KEY);
        res.cookie('jwt_token', jwt_token, {
          expires: moment().add(2, 'months').toDate()
        });

        res.cookie('uid', user.id ,{
          expires: moment().add(2, 'months').toDate()
        })

        res.redirect(303, req.param.redirect || '/');
      })
    }
  })
}

module.exports = {
  init,
  registerRoutes,
};
