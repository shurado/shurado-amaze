'use strict';

var S3Uploader = require('../services/S3Uploader');
var BufferStream = require('../services/S3Uploader/BufferStream');

var upload = function upload(key, body, mimetype) {
  switch (mimetype) {
    case 'image/jpeg':
      mimetype = '.jpg'; // eslint-disable-line
      break;
    default:
      mimetype = '.jpg'; // eslint-disable-line
      break;
  }

  var bufferStream = new BufferStream(body);
  var uploader = new S3Uploader({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET,
    region: 'us-west-2'
  });

  uploader.upload([{
    key: key + mimetype,
    body: bufferStream
  }]);

  return uploader;
};

module.exports = upload;
//# sourceMappingURL=upload.js.map