'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'email');
  }
};
//# sourceMappingURL=20170727120242-add_email_to_user.js.map