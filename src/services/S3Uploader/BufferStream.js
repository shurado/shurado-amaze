const { Readable } = require('stream');
const { inherits } = require('util');


function BufferStream(source) {
  if (!Buffer.isBuffer(source)) {
    throw new TypeError('source must be a Buffer!');
  }

  this._source = source;
  this._offset = 0;
  this._length = source.length;

  this.on('end', this._destroy);
  Readable.call(this);
}

inherits(BufferStream, Readable);

BufferStream.prototype._read = function(size = (1024 * 5)) {
  
  if (this._offset < this._length) {
    this.push(this._source.slice(this._offset, this._offset + size));
    this._offset += size;
  }


  if (this._offset > this._length) {
    this.push(null);
  }
}

BufferStream.prototype._destroy = function() {
  this._source = null;
  this._offset = null;
  this._length = null;
}

module.exports = BufferStream;
