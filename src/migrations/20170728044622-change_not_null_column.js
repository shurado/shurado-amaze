'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('feeds', 'caption', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('feeds', 'caption', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};
