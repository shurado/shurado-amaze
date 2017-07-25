'use strict';
module.exports = function(sequelize, DataTypes) {
  var feed = sequelize.define('feed', {
    caption: DataTypes.TEXT,
    image_url: DataTypes.HSTORE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return feed;
};