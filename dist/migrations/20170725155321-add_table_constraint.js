'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('feeds', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    queryInterface.createTable('spots_feeds', {
      spot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'spots',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      feed_id: {
        type: Sequelize.INTEGER,
        unique: false,
        references: {
          model: 'feeds',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('feeds', 'user_id');
    queryInterface.dropTable('spots_feeds');
  }
};
//# sourceMappingURL=20170725155321-add_table_constraint.js.map