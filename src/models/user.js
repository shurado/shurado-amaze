'use strict';
const jwt = require('jwt-simple');

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
    user.hasMany(models.comment, { foreignKey: 'user_id' });
  }
  
  user.prototype.tokenForUser = function(secret) {
    const timestamp = new Date().getTime
    return jwt.encode({ sub: this.id, iat: timestamp }, secret);
  }
  
  return user;
};
