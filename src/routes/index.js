import { Router } from 'express';
import React from 'react';
import Hello from '../../client/components/Hello';
import ReactDOMServer from 'react-dom/server';

import passport from 'passport';

import jwtLogin from '../lib/jwt';
import ability from '../middlewares/ability';

import { feed as Feed } from '../models';
import { serialize } from '../utils';


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

export default route;
