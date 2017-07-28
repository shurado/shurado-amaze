'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('comments', 'status', {
      type: Sequelize.ENUM('deleted', 'edited', 'published'),
      defaultValue: 'published',
      allowNull: false
    }).then(() => {
      queryInterface.addIndex('comments', ['status', 'text']);
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   
    queryInterface.removeColumn('comments', 'status').then(() => {
      queryInterface.removeIndex('comments', ['status', 'text']);
    });
  }
};
