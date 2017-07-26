'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('users', 'social_accout', 'social_account')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('users', 'social_account', 'social_accout')
  }
};
