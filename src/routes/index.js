import { Router } from 'express';
import React from 'react';
import Hello from '../../client/components/Hello';
import ReactDOMServer from 'react-dom/server';
const route = new Router();

route.get('/', (req, res) => {

  res.render('index', { html: ReactDOMServer.renderToString(<Hello />) ,title: 'Hello World' })
});


export default route;
