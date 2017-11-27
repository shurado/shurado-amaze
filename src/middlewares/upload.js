const S3Uploader = require('../services/S3Uploader');
const BufferStream = require('../services/S3Uploader/BufferStream');

const upload = (key, body, mimetype) => {
  switch (mimetype) {
    case 'image/jpeg':
      mimetype = '.jpg'; // eslint-disable-line
      break;
    default:
      mimetype = '.jpg'; // eslint-disable-line
      break;
  }

  const bufferStream = new BufferStream(body);
  const uploader = new S3Uploader({
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
