'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app.js');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('test root path', function () {
  it('should response the GET method', function (done) {
    (0, _supertest2.default)(_app2.default).get('/').then(function (res) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});

describe('test facebook login', function () {
  it('should redirect facebook', function (done) {
    (0, _supertest2.default)(_app2.default).get('/auth/facebook').then(function (res) {

      expect(res.statusCode).toBe(302);
      expect(res.headers.location).toMatch(/https\:\/\/www.facebook.com\/dialog\/oauth/);
      done();
    });
  });
});

describe('Get next page feed', function () {
  // beforeAll(() => {
  //   var comments = [];
  //   for (var i = 0; i < 10; i++) {
  //     var comment = db.comment.build({
  //       text: '你的建議很棒' + i,
  //       user_id: ''
  //     })
  //   }

  //   return db.feed.
  // })
});

describe('test feed functionality', function () {
  beforeAll(function () {
    return _models2.default.feed.create({ caption: '這邊好好玩', image_url: { normal: 'https://www.image.url' } });
  });

  afterAll(function () {
    return _models2.default.feed.destroy({ where: { caption: '這邊好好玩' } });
  });

  it('should add spot if feed spot is new', function (done) {
    _models2.default.feed.findOne().then(function (feed) {
      return feed.addFeedSpot({ name: '藍瓶咖啡廳', x: 20, y: 25.456 });
    }).then(function (spots) {
      var spot = spots[0];
      var expected = {
        location: { x: 20, y: 25.456 },
        name: '藍瓶咖啡廳'
      };

      var location = spot.location,
          name = spot.name;

      expect({
        location: location,
        name: name
      }).toEqual(expected);
    }).then(done);
  });

  it('can return correct value if spot did exist.', function (done) {
    _models2.default.feed.findOne().then(function (feed) {
      return feed.querySpot({ x: 10.25, y: 25.100000000000001 }).then(function (results) {
        console.log(results);
        expect(results[0].name).toBe('藍瓶咖啡聽');
        expect(results[0].location).toEqual({
          x: 10.25,
          y: 25.1
        });

        done();
      }).catch(done);
    });
  });

  it('can add feed spot', function (done) {
    _models2.default.feed.findOne().then(function (feed) {
      return feed.addFeedSpot({ name: '123', x: 2, y: 3 });
    }).then(function (result) {
      expect(result.length).toBeGreaterThan(0);
      done();
    });
  });
});
//# sourceMappingURL=index.js.map