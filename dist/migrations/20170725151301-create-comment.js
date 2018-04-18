'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT
      },
      comment_type: {
        type: Sequelize.ENUM('comment', 'suggestion')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function () {
      return queryInterface.addIndex('comments', ['text']);
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};
//# sourceMappingURL=20170725151301-create-comment.js.map