'use strict';

var EventEmitter = require('events').EventEmitter;
var aws = require('aws-sdk');

var _require = require('./errors'),
    NotyetImplmentError = _require.NotyetImplmentError,
    ArgumentError = _require.ArgumentError,
    AWSResponseError = _require.AWSResponseError,
    TimeoutError = _require.TimeoutError;

var _require2 = require('stream'),
    Readable = _require2.Readable;

var _require3 = require('util'),
    inherits = _require3.inherits;

var DEFAULT_TIMEOUT = 30 * 1000; // seconds


function S3Uploader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var accessKeyId = options.accessKeyId,
      secretAccessKey = options.secretAccessKey,
      region = options.region;


  if (!accessKeyId || !secretAccessKey || !region) {
    var validParams = ['`accessKeyId`', '`secretAccessKey`', '`region`'];
    throw new ArgumentError('options ' + validParams.join(', ') + ' is required.');
  }

  this._accessKeyId = accessKeyId;
  this._secretAccessKey = secretAccessKey;
  this._bucket = options.bucket || null;
  this._isUploading = false;
  this._timeout = options.timeout || DEFAULT_TIMEOUT;

  this._init();
  this._onFileUpload();

  EventEmitter.call(this);
  return this;
}

inherits(S3Uploader, EventEmitter);

S3Uploader.prototype._init = function () {
  return this._s3 = new aws.S3({
    params: {
      Bucket: this._bucket,
      ACL: 'public-read'
    },
    accessKeyId: this._accessKeyId,
    secretAccessKey: this._secretAccessKey
  });
};

S3Uploader.prototype.upload = function (uploadObj) {
  var isMultiUpload = Array.isArray(uploadObj);
  var isReadableStream = function isReadableStream(obj) {
    return obj instanceof Readable;
  };

  if (isMultiUpload) {
    var isValidUploadArr = uploadObj.every(function (obj) {
      return obj.body && isReadableStream(obj.body);
    });

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
};

S3Uploader.prototype._handleUpload = function (upload) {
  throw new NotyetImplmentError();
};

S3Uploader.prototype._onFileUpload = function () {
  var _this = this;

  var s3 = this._s3;
  var self = this;

  this.on('upload', function (uploadObj) {
    if (_this._isMultiUpload) {
      uploadObj.forEach(function (object) {
        var uploader = s3.upload({
          Bucket: _this._bucket,
          Key: object.key || object.file,
          Body: object.body
        });

        uploader.send(function (err, data) {
          if (err) {
            self.emit('error', AWSResponseError(err));
            return;
          }

          self.emit('complete', data);
          clearTimeout(_this._timeout);
        });

        uploader.on('httpUploadProgress', function (ev) {
          return _this.emit('progress', ev);
        });
      });
    } else {
      // [TODO] copy paste.
      var uploader = s3.upload({
        Bucket: _this._bucket,
        Key: uploadObj.key || uploadObj.file,
        Body: uploadObj.body
      });

      uploader.send(function (err, data) {
        if (err) {
          self.emit('error', AWSResponseError(err));
          return;
        }

        self.emit('complete', data);
        clearTimeout(_this._timeout);
      });

      uploader.on('httpUploadProgress', function (ev) {
        return _this.emit('progress', ev);
      });
    }
  });
};

S3Uploader.prototype._onUploadTimeout = function () {
  this.emit('timeout', new TimeoutError('upload timeout, upload aborted.'));
};

module.exports = S3Uploader;
//# sourceMappingURL=index.js.map