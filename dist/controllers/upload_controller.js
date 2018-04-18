'use strict';

var _require = require('express'),
    Router = _require.Router;

var multer = require('multer');
var v1 = require('uuid/v1');

var BufferStream = require('../services/S3Uploader/BufferStream');
var S3Uploader = require('../services/S3Uploader');

var route = new Router();
var uploader = multer();

route.post('/upload', uploader.single('avatar'), function (req, res, next) {
  var bufferStream = new BufferStream(req.file.buffer);
  var uploader = new S3Uploader({
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
//# sourceMappingURL=upload_controller.js.map