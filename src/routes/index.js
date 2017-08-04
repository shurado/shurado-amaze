import { Router } from 'express';
import { ifElse, isNil, pick } from 'ramda';
import passport from 'passport';

import jwtLogin from '../lib/jwt';

import { feed as Feed, user as User } from '../models';
import { serialize, pickDataValues, nullResponse, toHumanReadable } from '../utils';
import { return404, return400, return401 } from '../utils/responseHelper';

import { avatarUploader } from '../services/uploader';

import feedController from '../controllers/feed_controller';
import userController from '../controllers/user_controller';

import WebParser from '../services/WebParser';


const route = new Router();

route.get('/', (req, res) => {
  res.render('index', { html: 123 })
});

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

route.get('/profile', jwtAuthenticate,
  (req, res, next) => {
    if (req.user === null) {
      next('user doesn\'t exist or you have no ability to read it.');
    }

    return res.json({
      user: serialize(req.user.serializeFields)(req.user)
    })
  });

route.get('/user/login', jwtAuthenticate, (req, res) => res.redirect(301, '/'));

route.post('/api/parse', jwtAuthenticate, (req, res) => {
  
  if (req.body.url) {
    WebParser.parseWeb(req.body.url)
      .then(({ response }) => res.json(response))
      .catch(error => {
        res.status(400);
        res.json(error.message);
      })  
  } else {
    res.status(400).json({ message: 'missing fields `url`' })  
  }
});


route.use('/api/feeds', feedController)
route.use('/api/user', userController)


export default route;
