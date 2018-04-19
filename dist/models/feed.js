'use strict';

var _require = require('../utils'),
    serialize = _require.serialize;

module.exports = function (sequelize, DataTypes) {
  var feed = sequelize.define('feed', {
    caption: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: '貼文內容不可為空白！'
        }
      }
    },
    image_url: {
      type: DataTypes.HSTORE,
      validate: {
        validValue: function validValue(value) {
          var URL_REG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

          if (!Object.keys(value).every(function (key) {
            return URL_REG.test(value[key]);
          })) {
            throw Error('必須為正確的 URL 格式');
          }
        }
      }
    }
  });

  feed.FEEDS_LIMIT = 15;

  feed.associate = function (models) {
    feed.belongsTo(models.user, { foreignKey: 'user_id' });
    feed.hasMany(models.comment, { foreignKey: 'feed_id' });
    feed.belongsToMany(models.spot, { through: 'spots_feeds', foreignKey: 'feed_id', timestamps: false });
  };

  feed.prototype.edit = function (_ref) {
    var caption = _ref.caption;

    this.caption = caption;
    return this.save();
  };

  feed.prototype.updateImage = function (image_url) {
    this.image_url = Object.assign(this.image_url || {}, image_url);
    return this.save();
  };

  feed.getImageURLByField = function (image_url) {
    return feed.findOne({ where: {
        image_url: { $contains: image_url }
      } }).then(function (feed) {
      return feed.dataValues;
    });
  };

  feed.prototype.getNextPageFeeds = function (nextPageFeed) {
    return feed.findAll({
      include: [{
        model: sequelize.models.comment,
        where: { status: { $not: 'deleted' } },
        limit: 20,
        order: [['createdAt', 'DESC']]
      }],
      where: {
        createdAt: { $gt: nextPageFeed.createdAt },
        id: { $gt: nextPageFeed.id }
      },
      limit: feed.FEEDS_LIMIT,
      order: [['createdAt', 'DESC']]
    });
  };

  feed.prototype.addFeedSpot = function (_ref2) {
    var _this = this;

    var name = _ref2.name,
        x = _ref2.x,
        y = _ref2.y;

    var self = this;
    return new Promise(function (resolve) {
      sequelize.models.spot.findOne({ where: { name: name } }).then(function (result) {
        if (result) {
          resolve(_this.addSpot(result).then(function () {
            return self;
          }));
        } else {
          resolve(_this.createSpot({
            name: name,
            location: {
              type: 'POINT',
              coordinates: [x, y]
            }
          }));
        }
      });
    });
  };

  feed.prototype.querySpot = function (_ref3) {
    var x = _ref3.x,
        y = _ref3.y;

    return new Promise(function (resolve) {
      sequelize.query('SELECT * FROM spots WHERE location ~= \'(' + x + ', ' + y + ')\'::point').spread(function (results) {
        resolve(results);
      });
    });
  };

  feed.prototype.addCommentToFeed = function (_ref4) {
    var text = _ref4.text,
        comment_type = _ref4.comment_type,
        user_id = _ref4.user_id;

    return this.createComment({
      text: text,
      comment_type: comment_type,
      user_id: user_id
    });
  };

  feed.prototype.getActiveComments = function () {
    return this.getComments({
      include: ['user'],
      scope: 'active',
      order: [['createdAt', 'DESC']]
    }).then(function (comments) {
      return comments.map(function (comment) {
        return serialize(comment.serializeFields, comment);
      });
    });
  };

  feed.prototype.serializeFields = ['caption', 'image_url', 'user'];

  return feed;
};
//# sourceMappingURL=feed.js.map