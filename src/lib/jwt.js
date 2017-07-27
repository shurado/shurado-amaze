import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { user as User } from '../models';
import { pathOr } from 'ramda'
dotenv.config();

const fromCookie = function(req) {
  return pathOr(null, ['cookies', 'jwt_token'])(req);
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([fromCookie, ExtractJwt.fromHeader('authorization')]),
  secretOrKey: process.env.SECRET_KEY
};

/* payload from JWT */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => done(null, user))
    .catch(err => done(err, false));
})

passport.use(jwtLogin);

export default jwtLogin;
