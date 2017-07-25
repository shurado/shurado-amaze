'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    website: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    avatar: DataTypes.HSTORE
  }, {
    classMethods: {
      associate: function(models) {
        console.log()
      }
    }
  });
  return user;
};
