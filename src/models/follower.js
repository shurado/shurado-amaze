'use strict';
module.exports = function(sequelize, DataTypes) {
  var follower = sequelize.define('follower', {
    follwer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return follower;
};