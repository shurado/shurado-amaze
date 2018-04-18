'use strict';

function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message;
  return this;
}

ArgumentError.prototype = Error.prototype;

function AWSResponseError(message) {
  this.name = 'AWSResponseError';
  this.message = message;
  return this;
}

AWSResponseError.prototype = Error.prototype;

function TimeoutError(message) {
  this.name = 'TimeoutError';
  this.message = message;
  return this;
}

TimeoutError.prototype = Error.prototype;

function NotyetImplmentError(message) {
  this.name = 'NotyetImplmentError';
  this.message = message || 'sorry, but this method is not yet implmented.';
  return this;
}

NotyetImplmentError.prototype = Error.prototype;

module.exports = {
  ArgumentError: ArgumentError,
  AWSResponseError: AWSResponseError,
  TimeoutError: TimeoutError,
  NotyetImplmentError: NotyetImplmentError

};
//# sourceMappingURL=index.js.map