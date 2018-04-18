'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.changeColumn('feeds', 'caption', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.changeColumn('feeds', 'caption', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};
//# sourceMappingURL=20170728044622-change_not_null_column.js.map