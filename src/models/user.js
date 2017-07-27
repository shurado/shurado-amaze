'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    website: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    avatar_url: DataTypes.HSTORE,
    social_account: DataTypes.HSTORE,
    gender: DataTypes.ENUM(['female', 'male']),
    birthday: {
      type: DataTypes.DATE,
      validate: {
        isGreaterThanTen: function(value) {
          return value < moment().subtract(12, 'years').toDate();
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      }
    }
  });

  user.prototype.serializeFields = ['username', 'nickname', 'website', 'introduction', 'avatar_url', 'birthday', 'email'];
  
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
