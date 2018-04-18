'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: false
    });
  }
};
//# sourceMappingURL=20170730060030-add_unique_email_to_user.js.map