'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var graphqlHTTP = require('express-graphql');
var routes = require('./routes');
var schema = require('./models/schemas');
var auth = require('./lib/auth');

var app = express();

if (app.get('env') === 'production') {
  app.disable('x-powered-by'); /* hide powerby to prevent secure issue. */
}

/* View engine setup */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, '../public'), {
  maxAge: app.get('env') === 'production' ? 60 * 60 * 24 * 365 * 1000 : 0,
  setHeaders: function setHeaders(res) {
    return res.setHeader('x-timestamp', Date.now());
  }
}));

app.use(logger('dev', {
  skip: function skip() {
    return app.get('env') === 'test';
  }
}));

/* Middlewares */

if (process.env.NODE_ENV === 'development') {
  app.use(function (res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
}

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

auth.init(app);
auth.registerRoutes(app);

// Catch 404 and forward to error handler
app.use('/', routes).use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  if (err.status === 404) {
    return res.render('index');
  }
  next(err);
}).use(function (err, req, res, next) {
  console.warn(err.stack); // eslint-disable-line no-console
  console.log(err.message); // eslint-disable-line no-console

  switch (req.accepts(['application/json', 'html'])) {
    case 'application/json':
      return res.status(err.status || 500).json({
        error: err,
        message: err.message,
        name: err.name
      });
    case 'html':
      return res.status(err.status || 500).render('error', {
        error: err,
        name: err.name,
        stack: err.stack,
        message: err.message
      });
  }
});

app.get('*', function (req, res) {
  if (req.accepts(['application/json'])) {
    res.status(404);
    res.text('Not Found');
  }

  return res.render('index');
});

module.exports = app;
//# sourceMappingURL=app.js.map