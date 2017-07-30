'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    text: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: { msg: '留言內容不可為空白' },
      }
    },
    status: {
      type: DataTypes.ENUM('deleted', 'edited', 'published')
    },
    comment_type: {
      type: DataTypes.ENUM('comment', 'suggestion'),
      defaultValue: 'comment'
    }
  }, {
    scopes: {
      active: {
        where: { status: { $ne: 'deleted' } }
      }
    }
  });
  
  comment.associate = function(models) {
    comment.belongsTo(models.user, { foreignKey: 'user_id' });
    comment.belongsTo(models.feed, { foreignKey: 'feed_id' });
  }

  comment.prototype.serializeFields = ['text', 'comment_type', 'createdAt', 'updatedAt', 'user'];

  return comment;
};
