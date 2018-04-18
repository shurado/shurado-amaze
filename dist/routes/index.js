'use strict';

var _require = require('express'),
    Router = _require.Router;

var passport = require('passport');

var WebParser = require('../services/WebParser');
var feedController = require('../controllers/feed_controller');
var userController = require('../controllers/user_controller');
var uploadController = require('../controllers/upload_controller');
var profileController = require('../controllers/profile_controller');

var route = new Router();

route.get('/', function (req, res) {
  res.render('index', { html: 123 });
});

var jwtAuthenticate = passport.authenticate('jwt', { session: false });

// route.get('/user/login', jwtAuthenticate, (req, res) => res.redirect(301, '/'));

route.post('/api/parse', jwtAuthenticate, function (req, res) {
  if (req.body.url) {
    WebParser.parseWeb(req.body.url).then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      res.status(400);
      res.json({ message: error.message });
    });
  } else {
    res.status(400).json({ message: 'missing fields `url`' });
  }
});

route.use('/upload', uploadController).use('/profile', profileController).use('/api/feeds', feedController).use('/api/user', userController);

module.exports = route;
//# sourceMappingURL=index.js.map