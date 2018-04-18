'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('comments', 'status', {
      type: Sequelize.ENUM('deleted', 'edited', 'published'),
      defaultValue: 'published',
      allowNull: false
    }).then(function () {
      queryInterface.addIndex('comments', ['status', 'text']);
    });
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */

    queryInterface.removeColumn('comments', 'status').then(function () {
      queryInterface.removeIndex('comments', ['status', 'text']);
    });
  }
};
//# sourceMappingURL=20170728162108-add_state_to_comment.js.map