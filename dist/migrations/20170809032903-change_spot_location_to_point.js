'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.removeColumn('spots', 'location').then(function () {
      queryInterface.addColumn('spots', 'location', {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      });
    });
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('spots', 'location').then(function () {
      queryInterface.addColumn('spots', 'location', {
        type: 'Point'
      });
    });
  }
};
//# sourceMappingURL=20170809032903-change_spot_location_to_point.js.map