'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'social_accout', {
      type: Sequelize.HSTORE
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'social_accout');
  }
};
//# sourceMappingURL=20170726012730-add_auth_to_user.js.map