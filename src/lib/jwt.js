const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');
const User = require('../models').user;
const { pathOr } = require('ramda');

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, false));
});

const fromCookie = function(req) {
  return pathOr(null, ['cookies', 'jwt_token'])(req);
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([fromCookie, ExtractJwt.fromHeader('authorization')]),
  secretOrKey: process.env.SECRET_KEY
};

/* payload from JWT */
const jwtLogin = new Strategy(jwtOptions, (payload, done) =>
  User.findById(payload.sub)
    .then(user => done(null, user))
    .catch(err => done(err, false))
)

passport.use(jwtLogin);

module.exports = jwtLogin

