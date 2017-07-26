import { user as User }  from '../models/';
import passport from 'passport';
import { Strategy } from 'passport-facebook';

import dotenv from 'dotenv';
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user.id))
    .catch((err) => done(err, null));
})

export function init() {
  passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_TOKEN,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);

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
    }).then((err, user) => {
      done(err, user);
    });

  }));
}


export function registerRoutes(app) {
  app.get('/auth/facebook', (res, req, next) => {
    passport.authenticate('facebook', {
      callbackURL: '/auth/facebook/callback'
    })(res, req, next);
  });

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/fail'
  }), (res, req) => {
    res.redirect(303, req.param('redirect') || '/');
  })

}
