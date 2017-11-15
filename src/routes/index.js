
const { Router } = require('express');
const passport = require('passport');

const WebParser = require('../services/WebParser');
const feedController = require('../controllers/feed_controller');
const userController = require('../controllers/user_controller');
const uploadController = require('../controllers/upload_controller');
const profileController = require('../controllers/profile_controller');

const route = new Router();

route.get('/', (req, res) => {
  res.render('index', { html: 123 })
});

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

// route.get('/user/login', jwtAuthenticate, (req, res) => res.redirect(301, '/'));

route.post('/api/parse', jwtAuthenticate, (req, res) => {  
  if (req.body.url) {
    WebParser.parseWeb(req.body.url)
      .then(result => res.json(result))
      .catch(error => {
        res.status(400);
        res.json({ message: error.message });
      })  
  } else {
    res.status(400).json({ message: 'missing fields `url`' })  
  }
});

route
  .use('/upload', uploadController)
  .use('/profile', profileController)
  .use('/api/feeds', feedController)
  .use('/api/user', userController)


module.exports = route;

