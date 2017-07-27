'use strict';
module.exports = function(sequelize, DataTypes) {
  var feed = sequelize.define('feed', {
    caption: DataTypes.TEXT,
    image_url: DataTypes.HSTORE
  })

  feed.associate = function(models) {
    feed.belongsTo(models.user, { foreignKey: 'user_id' })
    feed.belongsToMany(models.spot, { through: 'spots_feeds', foreignKey: 'feed_id' })
  }

  feed.prototype.edit = function({ caption }) {
    this.caption = caption;
    return this.save();
  }

  feed.prototype.serializeFields = ['caption', 'image_url', 'user'];


  return feed;
};
