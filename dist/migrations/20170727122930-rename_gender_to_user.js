'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.renameColumn('users', 'genger', 'gender');
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.renameColumn('users', 'gender', 'genger');
  }
};
//# sourceMappingURL=20170727122930-rename_gender_to_user.js.map