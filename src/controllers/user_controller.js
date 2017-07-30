import { Router } from 'express';
import { user as User } from '../models';
import passport from 'passport';

import { serialize, pickDataValues, nullResponse, toHumanReadable } from '../utils';
import { return404, return400, return401 } from '../utils/responseHelper';

import jwtLogin from '../lib/jwt';

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

const route = new Router();

route.post('/sign_out', jwtAuthenticate, (req, res) => {
  res.clearCookie('jwt_token');
  if (req.accepts('json')) {
    res.status(200).json({
      success: true
    });
  } else if (req.accepts('html')) {
    res.redirect(200, req.params.redirect || '/');
  }
});

/* [TODO] user upload avatar logic */
route
  .route('/:id/avatar')
  .post(jwtAuthenticate, (req, res, next) => {

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

    User.findById(req.params.id).then(nullResponse(res));
    
    const allowedParams = pick(req.user.serializeFields)(req.body);

    User.update(allowedParams, { where: { id: req.params.id }, returning: true })
      .then(results => {
        const user = results[1] !== undefined ? results[1][0] : null;
        return user && serialize(user.serializeFields, user)
      })
      .then(value => {
        res.json({ user: value });
      })
      .catch(err => {
        res.json({
          errors: toHumanReadable(err.message.replace('Validation error:', ''))
        })
      })
  });

export default route;
