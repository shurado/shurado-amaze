'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.renameColumn('followers', 'follwer_id', 'follower_id');
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.renameColumn('followers', 'follower_id', 'follwer_id');
  }
};
//# sourceMappingURL=20170728085854-rename_follower_table.js.map