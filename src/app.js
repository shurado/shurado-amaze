import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import graphqlHTTP from 'express-graphql';

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
  app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  })
}

app.use(express.static('public'))
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
  if (err.status === 404) {
    return res.render('index');
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.warn(err.stack); // eslint-disable-line no-console
  console.log(err.message); // eslint-disable-line no-console

  switch (req.accepts(['application/json', 'html'])) {
    case 'application/json':
      return res.status(err.status || 500).json({
        error: err,
        message: err.message,
        name: err.name,
      });
    case 'html':
      return res
        .status(err.status || 500)
        .render('error', {
          error: err,
          name: err.name,
          message: err.message
        });
  } 
});

app.get('*', (req, res) => {
  if (req.accepts(['application/json'])) {
    res.status(404);
    res.text('Not Found');
  }

  return res.render('index');
})

export default app;
