import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

/* 1. 使用者上傳圖片時，根據使用者 id md5 建立資料夾
 * 2. 分為 feed 跟 avatar 
 * feed_timestamp
 * avatar_timestamp
*/

const s3 = new AWS.S3({ params: { Bucket: 'yaoya' }});
const s3Config = multerS3({
  s3: s3,
  bucket: 'yaoya',
  acl: 'public-read',
  key: function(req, file, cb) {
    cb(null, 'user/' + file.originalname);
  }
});


export const feedUploader = multer({
  limit: 1024 * 1024 * 1024,
  storage: s3Config,
})

export const avatarUploader = multer({
  limit: 1024 * 1024 * 2,
  storage: s3Config
});
