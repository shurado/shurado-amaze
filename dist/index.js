'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === undefined ? 8080 : _process$env$PORT;

_app2.default.listen(PORT, function () {
  return console.log('Listening on port ' + PORT);
}); // eslint-disable-line no-console
//# sourceMappingURL=index.js.map