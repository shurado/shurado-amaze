'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'email')
  }
};
