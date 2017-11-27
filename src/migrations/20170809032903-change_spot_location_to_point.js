module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.removeColumn('spots', 'location').then(() => {
      queryInterface.addColumn('spots', 'location', {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      })
    });    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface
      .removeColumn('spots', 'location')
      .then(() => {
        queryInterface.addColumn('spots', 'location', {
          type: 'Point',
        })  
      })
  }
};
