import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { user as User } from '../models';
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
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
