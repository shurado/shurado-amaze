'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'birthday', {
      type: Sequelize.DATE,
    }).then(() => {
      queryInterface.addIndex('users', ['birthday'])
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'birthday', {
      type: Sequelize.DATE,
    });
  }
};
