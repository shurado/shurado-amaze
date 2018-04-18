'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.renameColumn('users', 'social_accout', 'social_account');
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.renameColumn('users', 'social_account', 'social_accout');
  }
};
//# sourceMappingURL=20170726023952-rename_social_account_column.js.map