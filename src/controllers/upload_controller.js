const { Router } = require('express');
const multer = require('multer');
const v1 = require('uuid/v1');

const BufferStream = require('../services/S3Uploader/BufferStream');
const S3Uploader = require('../services/S3Uploader');


const route = new Router();
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
});

module.exports = route;
