'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.changeColumn(
      'spots',
      'name',
      {
        type: Sequelize.STRING,
        unique: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    // queryInterface.changeColumn(
    //   'spots',
    //   'name',
    //   {
    //     unique: false
    //   }
    // )
  }
};
