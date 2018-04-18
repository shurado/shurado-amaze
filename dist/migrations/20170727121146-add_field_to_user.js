'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'birthday', {
      type: Sequelize.DATE
    }).then(function () {
      queryInterface.addIndex('users', ['birthday']);
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'birthday', {
      type: Sequelize.DATE
    });
  }
};
//# sourceMappingURL=20170727121146-add_field_to_user.js.map