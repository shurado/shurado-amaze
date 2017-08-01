import { Router } from 'express';
import { user as User } from '../models';
import passport from 'passport';

import { serialize, pickDataValues, nullResponse, toHumanReadable } from '../utils';
import { return404, return400, return401 } from '../utils/responseHelper';

import { pick } from 'ramda';

import jwtLogin from '../lib/jwt';

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

const route = new Router();

route.post('/sign_out', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    
    if (user) {
      res.clearCookie('jwt_token');

      return req.accepts('json')  
        ? res.status(200).json({ success: true })
        : res.redirect(200, req.params.redirect || '/');
    }

    return return401(res, 'you\'ve sign out already.');
  })(req, res, next);
  
  
});

/* [TODO] user upload avatar logic */
route
  .route('/:id/avatar')
  .post(jwtAuthenticate, (req, res, next) => {
    res.json({
      message: 'not yet implement.'
    })
  })
route
  .route('/:id/profile')
  .get((req, res) => {
    User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return return404(res, 'user doesn\'t exist');
        }

        return res.json({
          profile: serialize(user.serializeFields, user) 
        })
      });
  })
  .post(jwtAuthenticate, (req, res, next) => {
    if (req.user.id.toString() !== req.params.id) {
      return res.status(401).json();
    }
    
    const allowedParams = pick(req.user.serializeFields)(req.body);

    User.update(allowedParams, { where: { id: req.params.id }, returning: true })
      .then(results => {
        const user = results[1] !== undefined ? results[1][0] : null;
        return user && serialize(user.serializeFields, user)
      })
      .then(value => {
        res.json({ profile: value });
      })
      .catch(err => {
        res.status(400).json({
          errors: toHumanReadable(err.message.replace('Validation error:', ''))
        })
      })
  });

export default route;
