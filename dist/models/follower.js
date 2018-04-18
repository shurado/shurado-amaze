'use strict';

module.exports = function (sequelize, DataTypes) {
  var follower = sequelize.define('follower', {
    follwer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  });

  follower.associate = function (models) {
    follower.belongsTo(models.user, { foreignKey: 'user_id' });
  };

  return follower;
};
//# sourceMappingURL=follower.js.map