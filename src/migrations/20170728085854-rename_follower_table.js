'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('followers', 'follwer_id', 'follower_id');
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('followers', 'follower_id', 'follwer_id');
  }
};
