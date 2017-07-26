'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'social_accout', {
      type: Sequelize.HSTORE
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'social_accout');
  }
};
