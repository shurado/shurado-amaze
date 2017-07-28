'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   
    queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    })

    queryInterface.changeColumn('spots', 'location', {
      type: 'Point',
      allowNull: false
    })    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   
    queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    })

    queryInterface.changeColumn('spots', 'location', {
      type: 'Point',
      allowNull: true
    })    
  }
};
