const EventEmitter = require('events').EventEmitter;
const aws = require('aws-sdk');
const { NotyetImplmentError, ArgumentError, AWSResponseError, TimeoutError } = require('./errors');
const { Readable } = require('stream');
const { inherits } = require('util');

const DEFAULT_TIMEOUT = 30 * 1000; // seconds


function S3Uploader(options = {}) {
  const { accessKeyId, secretAccessKey, region } = options;
  

  if (!accessKeyId || !secretAccessKey || !region) {
    const validParams = ['`accessKeyId`', '`secretAccessKey`', '`region`'];
    throw new ArgumentError(`options ${validParams.join(', ')} is required.`);
  }

  this._accessKeyId     = accessKeyId;
  this._secretAccessKey = secretAccessKey;
  this._bucket          = options.bucket || null;
  this._isUploading     = false;
  this._timeout = options.timeout || DEFAULT_TIMEOUT;

  this._init();
  this._onFileUpload();

  EventEmitter.call(this);
  return this;
}

inherits(S3Uploader, EventEmitter);

S3Uploader.prototype._init = function() {
  return this._s3 = new aws.S3({
    params: {
      Bucket: this._bucket,
      ACL: 'public-read'
    },
    accessKeyId: this._accessKeyId,
    secretAccessKey: this._secretAccessKey,
  });
}

S3Uploader.prototype.upload = function(uploadObj) {
  const isMultiUpload = Array.isArray(uploadObj);
  const isReadableStream = (obj) => obj instanceof Readable;

  if (isMultiUpload) {
    const isValidUploadArr = uploadObj.every(obj => obj.body && isReadableStream(obj.body));

    if (!isValidUploadArr) {
      throw TypeError('upload Array must contain Readable Stream');      
    }

    this._isMultiUpload = true;
    this._uploadObjects = uploadObj;
  } else if (uploadObj.body && isReadableStream(uploadObj)) {
    this._isMultiUpload = false;
    this._uploadObject = uploadObj;
  } else {
    throw TypeError('You need to provide Stream!');
  }

  this.emit('upload', uploadObj);
}


S3Uploader.prototype._handleUpload = function(upload) {
  throw new NotyetImplmentError();
}

S3Uploader.prototype._onFileUpload = function() {
  const s3 = this._s3;
  const self = this;

  this.on('upload', uploadObj => {
    if (this._isMultiUpload) {
      uploadObj.forEach(object => {
        const uploader = s3.upload({
          Bucket: this._bucket,
          Key: object.key || object.file,
          Body: object.body
        });

        uploader.send((err, data) => {
          if (err) {
            self.emit('error', AWSResponseError(err));
            return;
          }

          self.emit('complete', data);
          clearTimeout(this._timeout);
        })

        uploader.on('httpUploadProgress', (ev) => this.emit('progress', ev));
      })
    } else {
      // [TODO] copy paste.
      const uploader = s3.upload({
        Bucket: this._bucket,
        Key: uploadObj.key || uploadObj.file,
        Body: uploadObj.body
      });

      uploader.send((err, data) => {
        if (err) {
          self.emit('error', AWSResponseError(err));
          return;
        }

        self.emit('complete', data);
        clearTimeout(this._timeout);
      })

      uploader.on('httpUploadProgress', (ev) => this.emit('progress', ev));
    }
  })
}

S3Uploader.prototype._onUploadTimeout = function() {
  this.emit('timeout', new TimeoutError('upload timeout, upload aborted.'))
}

module.exports = S3Uploader;
