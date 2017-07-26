'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('comments', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
    }).then(() => {
      queryInterface.addIndex('comments', ['user_id']);
    });

    queryInterface.addColumn('comments', 'feed_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'feeds',
        key: 'id'
      }
    }).then(() => {
      queryInterface.addIndex('comments', ['feed_id'])
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('comments', 'user_id');
    queryInterface.removeColumn('comments', 'feed_id');
  }
};
