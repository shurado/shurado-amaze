import S3Uploader from '../services/S3Uploader';
import BufferStream from '../services/S3Uploader/BufferStream';
import v1 from 'uuid/v1';


const upload = (key, body, mimetype) => {
  switch (mimetype) {
    case 'image/jpeg':
      mimetype = '.jpg'
      break;
    default:
      mimetype = '.jpg'
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

export default upload;
