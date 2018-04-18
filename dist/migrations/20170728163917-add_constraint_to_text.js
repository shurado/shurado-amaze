'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};
//# sourceMappingURL=20170728163917-add_constraint_to_text.js.map