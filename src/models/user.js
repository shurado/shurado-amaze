'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    website: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    avatar_url: DataTypes.HSTORE,
    social_account: DataTypes.HSTORE
  });

  user.associate = function(models) {
    user.hasMany(models.feed, { foreignKey: 'user_id' });
    user.hasMany(models.feed, { foreignKey: 'user_id' });

  }
  


  return user;
};
