import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';
import v1 from 'uuid/v1';

import jwtLogin from '../lib/jwt';

import { serialize } from '../utils';
import WebParser from '../services/WebParser';
import S3Uploader from '../services/S3Uploader';
import BufferStream from '../services/S3Uploader/BufferStream';

import feedController from '../controllers/feed_controller';
import userController from '../controllers/user_controller';


const route = new Router();

route.get('/', (req, res) => {
  res.render('index', { html: 123 })
});

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

const uploader = multer();

route.post('/upload', uploader.single('avatar'), (req, res, next) => {
  const bufferStream = new BufferStream(req.file.buffer);
  const uploader     = new S3Uploader({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET,
    region: 'us-west-2'
  });

  uploader.upload([{
    key: v1() + '.jpg',
    body: bufferStream
  }]);

  res.json({});
})

route.get('/profile', jwtAuthenticate,
  (req, res, next) => {
    if (req.user === null) {
      next('user doesn\'t exist or you have no ability to read it.');
    }

    return res.json({
      user: serialize(req.user.serializeFields)(req.user)
    })
  });

// route.get('/user/login', jwtAuthenticate, (req, res) => res.redirect(301, '/'));

route.post('/api/parse', jwtAuthenticate, (req, res) => {
  
  if (req.body.url) {
    WebParser.parseWeb(req.body.url)
      .then(({ response }) => res.json(response))
      .catch(error => {
        res.status(400);
        res.json(error.message);
      })  
  } else {
    res.status(400).json({ message: 'missing fields `url`' })  
  }
});

route.get('/test', (req, res) => {
  res.render('test');
})

route.use('/api/feeds', feedController)
route.use('/api/user', userController)


export default route;
