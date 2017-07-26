import { user as User }  from '../models/';
import passport from 'passport';
import { Strategy } from 'passport-facebook';
import { pathOr } from 'ramda';

import dotenv from 'dotenv';
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
export function init(app) {
  passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_TOKEN,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
        where: { 
          social_account: { facebook: profile.id }
        },
        defaults: { 
          nickname: profile.displayName,
          avatar_url: {
            facebook: profile.photos[0].value
          }
        }
    }).then((users) => {
      done(null, users[0]);
    });
  }));

}

export function registerRoutes(app) {
  app.get('/auth/facebook', (req, res, next) => {
    passport.authenticate('facebook', {
      callbackURL: '/auth/facebook/callback'
    })(req, res, next);
  });

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/fail'}), (req, res) => {
    const authUserId = pathOr(null, ['passport', 'user'])(req.session);

    if(authUserId) {
      User.findById(authUserId).then(user => {
        res.cookie('jwt_token', user.tokenForUser(process.env.SECRET_KEY));
        res.redirect(303, req.param.redirect || '/');
      })
    }
  })
}
