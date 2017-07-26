import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';

import routes from './routes';
import models from './models';



const app = express();
app.disable('x-powered-by'); /* hide powerby to prevent secure issue. */

/* View engine setup */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      error: err,
      message: err.message
    });
});

export default app;
