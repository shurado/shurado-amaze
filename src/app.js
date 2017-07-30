import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import graphqlHTTP from 'express-graphql';

import { map, flatten } from 'ramda';
import routes from './routes';
import schema from './models/schemas';
import * as auth from './lib/auth';


const app = express();
app.disable('x-powered-by'); /* hide powerby to prevent secure issue. */

/* View engine setup */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

/* Middlewares */

if (process.env.NODE_ENV === 'development') {
  // const webpack = require('webpack');
  // const webpackConfig = require('../webpack.config.js')({ target: 'development' });
  // const entries = webpackConfig.entry;

  // const devClient = 'webpack-hot-middleware/client?http://' + 'localhost' + ':8080';
  
  
  // let injectedHMREntries = {};
  // Object
  //   .keys(entries)
  //   .forEach(key => {
  //     injectedHMREntries[key] = flatten(['react-hot-loader/patch', devClient, entries[key]])
  //   });

  // webpackConfig.entry = injectedHMREntries;

  // const compiler = webpack(webpackConfig);
  
  // app.use(require('webpack-dev-middleware')(compiler, {
  //   quiet: true,
  //   noInfo: true,
  //   publicPath: webpackConfig.output.publicPath
  // }));

  // app.use(require('webpack-hot-middleware')(compiler, {
  //   log: () => {}
  // }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'mysecret', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', routes);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


auth.init(app);
auth.registerRoutes(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  
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



export default app;
