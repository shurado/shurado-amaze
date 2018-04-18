'use strict';

var app = require('./app');

var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === undefined ? 8080 : _process$env$PORT;


app.listen(PORT, function () {
  return console.log('Listening on port ' + PORT);
}); // eslint-disable-line no-console
//# sourceMappingURL=index.js.map