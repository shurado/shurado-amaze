'use strict';
const { pickDataValues, serialize } = require('../utils');

module.exports = function(sequelize, DataTypes) {
  var feed = sequelize.define('feed', {
    caption: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: '貼文內容不可為空白！',
        }
      }
    },
    image_url: {
      type: DataTypes.HSTORE,
      validate: {
        validValue: function(value) {
          const URL_REG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

          if(!Object.keys(value).every(key => URL_REG.test(value[key]))) {
            throw Error('必須為正確的 URL 格式');
          }
        }
      }
    }
  })

  feed.FEEDS_LIMIT = 15;

  feed.associate = function(models) {
    feed.belongsTo(models.user, { foreignKey: 'user_id' })
    feed.hasMany(models.comment, { foreignKey: 'feed_id'} );
    feed.belongsToMany(models.spot, { through: 'spots_feeds', foreignKey: 'feed_id',  timestamps: false })
  }

  feed.prototype.edit = function({ caption }) {
    this.caption = caption;
    return this.save();
  }

  feed.prototype.updateImage = function(image_url) {
    this.image_url = Object.assign(this.image_url || {}, image_url);
    return this.save();
  }

  feed.getImageURLByField = function(image_url) {
    return feed.findOne({ where: {
      image_url: { $contains: image_url }
    } }).then(feed => feed.dataValues);
  }

  feed.prototype.getNextPageFeeds = function(nextPageFeed) {
    return feed.findAll({
      include: [{
        model: sequelize.models.comment,
        where: { status: { $not: 'deleted' } },
        limit: 20,
        order: [['createdAt', 'DESC']],
      }],
      where: {
        createdAt: { $gt: nextPageFeed.createdAt },
        id: { $gt: nextPageFeed.id }
      },
      limit: feed.FEEDS_LIMIT,
      order: [['createdAt', 'DESC']]
    })
  }

  feed.prototype.addFeedSpot = function({ name, x, y }) {
    const id = this.id;
    const self = this;
    
    // [TODO] 如果 spot 已經存在資料庫中，直接 return 
    return new Promise(resolve => {
      sequelize.query(`
          INSERT INTO "spots" ("id", "location", "name") VALUES
            (DEFAULT, '(${x}, ${y})'::point, '${name}')
          RETURNING *;
        `).spread((results) => {
          sequelize.query(`
            INSERT INTO "spots_feeds" ("feed_id", "spot_id") VALUES (${this.id}, ${results[0].id});
          `).spread(result => {
            resolve(self.getSpots().then((values) => values.map(pickDataValues)));
          });
      })
    });
    
  }

  feed.prototype.querySpot = function({x, y}) {
    return new Promise((resolve) => {
      sequelize.query(`SELECT * FROM spots WHERE location ~= '(${x}, ${y})'::point`)
        .spread((results) => {
          resolve(results);
        })
    })
  }

  feed.prototype.addCommentToFeed = function({ text, comment_type, user_id }) {
    return this.createComment({
      text,
      comment_type,
      user_id
    });
  }

  feed.prototype.getActiveComments = function() {
    return this
      .getComments({ 
        include: ['user'],
        scope: 'active',
        order: [['createdAt', 'DESC']] 
      })
      .then(comments => comments.map(comment => serialize(comment.serializeFields, comment)))

  }

  feed.prototype.serializeFields = ['caption', 'image_url', 'user'];


  return feed;
};
