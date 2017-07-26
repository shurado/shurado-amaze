import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import graphqlHTTP from 'express-graphql';


import routes from './routes';
import schema from './models/schemas';


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
app.use(cookieParser());
app.use(require('express-session')({ secret: 'mysecret', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routes);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


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
