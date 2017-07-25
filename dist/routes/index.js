'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Hello = require('../../client/components/Hello');

var _Hello2 = _interopRequireDefault(_Hello);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = new _express.Router();

route.get('/', function (req, res) {

  res.render('index', { html: _server2.default.renderToString(_react2.default.createElement(_Hello2.default, null)), title: 'Hello World' });
});

exports.default = route;
//# sourceMappingURL=index.js.map