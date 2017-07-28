'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'username 不可為空白'
        },
      }
    },
    nickname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'nickname 不可為空白'
        },
      }
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'website 必須為正確 URL (以 http:// 或 https:// 開頭)'
        },
        notEmpty: {
          msg: 'website 不可為空白',
        }
      }
    },
    introduction: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'introduction 不可為空白'
        }
      }
    },
    avatar_url: DataTypes.HSTORE,
    social_account: DataTypes.HSTORE,
    gender: DataTypes.ENUM(['female', 'male']),
    birthday: {
      type: DataTypes.DATE,
      validate: {
        isGreaterThanTen: function(value) {
          if (value > moment().subtract(12, 'years').toDate()) {
            throw new Error('生日必須小於現在日期，且年滿 12 歲以上！');
          } else if (value < moment().subtract(100, 'years').toDate()) {
            throw new Error('請輸入合法日期格式！');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email 不可為空白'
        },
        isEmail: {
          msg: '必須為正確的 email 格式'
        }
      }
    }
  });

  user.prototype.serializeFields = ['username', 'nickname', 'website', 'introduction', 'avatar_url', 'birthday', 'email'];
  
  user.associate = function(models) {
    user.hasMany(models.feed, { foreignKey: 'user_id' });
    user.hasMany(models.comment, { foreignKey: 'user_id' });
    user.belongsToMany(models.user, { as: 'UserFollowers', through: 'followers', foreignKey: 'user_id' })

  }
  
  user.prototype.tokenForUser = function(secret) {
    const timestamp = new Date().getTime
    return jwt.encode({ sub: this.id, iat: timestamp }, secret);
  }
  
  return user;
};
