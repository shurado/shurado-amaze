import { Router } from 'express';
import React from 'react';
import Hello from '../../client/components/Hello';
import ReactDOMServer from 'react-dom/server';

import * as auth from '../lib/auth';
import jwtLogin from '../lib/jwt';

const route = new Router();

route.get('/', (req, res) => {
  res.render('index', { html: ReactDOMServer.renderToString(<Hello />) ,title: 'Hello World' })
});

auth.init(route);
auth.registerRoutes(route);


export default route;
