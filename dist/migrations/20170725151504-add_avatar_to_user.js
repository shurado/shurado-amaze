'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'avatar_url', Sequelize.HSTORE
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    );
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'avatar_url');
  }
};
//# sourceMappingURL=20170725151504-add_avatar_to_user.js.map