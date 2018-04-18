'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('comments', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }).then(function () {
      queryInterface.addIndex('comments', ['user_id']);
    });

    queryInterface.addColumn('comments', 'feed_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'feeds',
        key: 'id'
      }
    }).then(function () {
      queryInterface.addIndex('comments', ['feed_id']);
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('comments', 'user_id');
    queryInterface.removeColumn('comments', 'feed_id');
  }
};
//# sourceMappingURL=20170726031524-add_foreign_key_to_comment.js.map