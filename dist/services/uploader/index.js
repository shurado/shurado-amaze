'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.avatarUploader = exports.feedUploader = undefined;

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

_awsSdk2.default.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

/* 1. 使用者上傳圖片時，根據使用者 id 建立資料夾
 * 2. 分為 feed 跟 avatar 
 * 3. handle progress
 * feed_timestamp
 * avatar_timestamp
*/

var s3 = new _awsSdk2.default.S3({ params: { Bucket: 'yaoya' } });
var s3Config = (0, _multerS2.default)({
  s3: s3,
  bucket: 'yaoya',
  acl: 'public-read',
  key: function key(req, file, cb) {
    cb(null, 'user/' + file.originalname);
  }
});

var feedUploader = exports.feedUploader = (0, _multer2.default)({
  limit: 1024 * 1024 * 1024,
  storage: s3Config
});

var avatarUploader = exports.avatarUploader = (0, _multer2.default)({
  limit: 1024 * 1024 * 2,
  storage: s3Config
});
//# sourceMappingURL=index.js.map