'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    text: DataTypes.TEXT,
    comment_type: DataTypes.ENUM('comment', 'suggestion')
  });
  
  comment.associate = function(models) {
    comment.belongsTo(models.user, { foreignKey: 'user_id' });
    comment.belongsTo(models.feed, { foreignKey: 'feed_id' });
  }

  return comment;
};
