'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('feeds', 'key', {
      type: Sequelize.STRING,
      unique: true
    }).then(function () {
      return queryInterface.addIndex('feeds', ['key']);
    });
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */

    queryInterface.removeColumn('feeds', 'key');
  }
};
//# sourceMappingURL=20170808132208-add_image_key_to_feed.js.map