import { Router } from 'express';
import React from 'react';
import Hello from '../../client/components/Hello';
import ReactDOMServer from 'react-dom/server';

import passport from 'passport';

import jwtLogin from '../lib/jwt';
import * as auth from '../lib/auth';
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

// Catch 404 and forward to error handler
route.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
route.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  
  switch(req.accepts(['application/json', 'html'])) {
    case 'application/json':
      return res.status(err.status || 500).json({
        error: err,
        message: err.message
      });
    case 'html':
      return res
        .status(err.status || 500)
        .render('error', {
          error: err,
          message: err.message
        });
  }
  
});


auth.init(route);
auth.registerRoutes(route);


export default route;
