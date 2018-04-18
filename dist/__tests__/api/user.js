'use strict';

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('User profile function', function () {
  beforeAll(function () {
    return _models2.default.user.create({
      email: 'test@gmail.com'
    });
  });

  it('should get user profile if user did exist', function (done) {
    _models2.default.user.findOne().then(function (user) {
      return user.id;
    }).then(function (userId) {
      (0, _supertest2.default)(_app2.default).get('/user/' + userId + '/profile').then(function (res) {
        expect(res.body.hasOwnProperty('profile')).toBeTruthy();
        done();
      });
    });
  });

  it('should return 404 if user didn\'t exist', function (done) {
    (0, _supertest2.default)(_app2.default).get('/user/798765412/profile').then(function (res) {
      var expected = {
        message: 'user doesn\'t exist'
      };

      expect(res.body).toEqual(expected);
      done();
    });
  });

  it('can edit profile if owner', function (done) {
    _models2.default.user.findOne().then(function (user) {
      return {
        userId: user.id,
        token: user.tokenForUser("ji3g4284gj94ek")
      };
    }).then(function (_ref) {
      var userId = _ref.userId,
          token = _ref.token;

      (0, _supertest2.default)(_app2.default).post('/user/' + userId + '/profile').send({ nickname: 'kalan' }).set('Cookie', 'jwt_token=' + token).end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body.user.nickname).toBe('kalan');

        done();
      });
    });
  });

  it('can show error if user input wrong params', function (done) {
    _models2.default.user.findOne().then(function (user) {
      return {
        userId: user.id,
        token: user.tokenForUser("ji3g4284gj94ek")
      };
    }).then(function (_ref2) {
      var userId = _ref2.userId,
          token = _ref2.token;

      (0, _supertest2.default)(_app2.default).post('/user/' + userId + '/profile').send({ nickname: '', website: '   ' }).set('Cookie', 'jwt_token=' + token).end(function (err, res) {

        var expected = Array.isArray(res.body.errors);

        expect(expected).toBeTruthy();
        done();
      });
    });
  });

  it('can not edit user profile if not owner', function (done) {
    _models2.default.user.findOne().then(function (user) {
      return user.id;
    }).then(function (userId) {
      (0, _supertest2.default)(_app2.default).post('/user/' + userId + '/profile').then(function (res) {
        expect(res.status).toBe(401);
        done();
      });
    });
  });

  afterAll(function () {
    return _models2.default.user.destroy({ where: { email: 'test@gmail.com' } });
  });
});
//# sourceMappingURL=user.js.map