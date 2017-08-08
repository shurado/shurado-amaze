const { ArgumentError } = require('./errors');

function UploadFile(key, body) {
  if (!key || !body) {
    throw new ArgumentError(`params \`key\` and \`body\` is required!`);
  }

  this.key = key;
  this.body = body;

  return this;
}
