import { Router } from 'express';
import React from 'react';
import Hello from '../../client/components/Hello';
import ReactDOMServer from 'react-dom/server';
import { ifElse, isNil, pick } from 'ramda';
import passport from 'passport';

import jwtLogin from '../lib/jwt';

import { feed as Feed, user as User } from '../models';
import { serialize, pickDataValues, nullResponse, toHumanReadable } from '../utils';
import { return404, return400, return401 } from '../utils/responseHelper';

import { avatarUploader } from '../services/uploader';

import feedController from '../controllers/feed_controller';
import userController from '../controllers/user_controller';


const route = new Router();

route.get('/', (req, res) => {
  res.render('index', { html: ReactDOMServer.renderToString(<Hello />) ,title: 'Hello World' })
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


route.use('/feeds', feedController)
route.use('/user', userController)


export default route;
