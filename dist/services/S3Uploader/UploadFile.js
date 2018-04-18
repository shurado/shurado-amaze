'use strict';

var _require = require('./errors'),
    ArgumentError = _require.ArgumentError;

function UploadFile(key, body) {
  if (!key || !body) {
    throw new ArgumentError('params `key` and `body` is required!');
  }

  this.key = key;
  this.body = body;

  return this;
}
//# sourceMappingURL=UploadFile.js.map