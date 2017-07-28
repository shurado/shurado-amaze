import { Router } from 'express';
import React from 'react';
import Hello from '../../client/components/Hello';
import ReactDOMServer from 'react-dom/server';
import { ifElse, isNil, pick } from 'ramda';
import passport from 'passport';

import jwtLogin from '../lib/jwt';
import ability from '../middlewares/ability';

import { feed as Feed, user as User } from '../models';
import { serialize, pickDataValues, nullResponse } from '../utils';


const route = new Router();

route.get('/', (req, res) => {
  res.render('index', { html: ReactDOMServer.renderToString(<Hello />) ,title: 'Hello World' })
});

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

route.get('/profile', jwtAuthenticate,
(req, res) => {
  res.json({
    user: serialize(req.user.serializeFields)(req.user)
  })
});


route.post('/user/sign_out', jwtAuthenticate, (req, res) => {
  res.clearCookie('jwt_token');
  if (req.accepts('json')) {
    res.status(200).json({
      success: true
    });
  } else if (req.accepts('html')) {
    res.redirect(200, req.params.redirect || '/');
  }
});

route
  .route('/user/:id/profile')
  .get((req, res) => {
    User
      .findById(req.params.id)
      .then((user) => serialize(user.serializeFields, user))
      .then((values) => {
        res.json({ user: values })      
      })
  })
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
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
  });

route.get('/feeds/:id', (req, res, next) => {
  Feed
    .findById(req.params.id, { include: ['user'] })
    .then((feed) => {
      if (feed) {
        res.json({
          feed: serialize(feed.serializeFields, feed)
        })
      }
      next('route');
    });
});

route.post('/feeds', passport.authenticate('jwt', { session: false }), (req, res) => {
  const allowedParams = ['caption', 'image_url'];
  
  req.user
    .createFeed(pick(allowedParams)(req.body))
    .then(pickDataValues)
    .then(values => {
      res.json({ feed: values })
    })
    .catch(error => {
      const message = error.message
        .replace("null value in column \"caption\" violates not-null constraint", '貼文內容不可為空白')
        .replace('Validation error:', '');

      res.status(400).json({ error: message });
    })
});



export default route;
