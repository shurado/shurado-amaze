'use strict';

var Sequelize = require('Sequelize');

var primaryID = function primaryID(Sequelize) {
  return {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  };
};

var timestamp = function timestamp(Sequelize) {
  return {
    allowNull: false,
    type: Sequelize.DATE
  };
};

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /* create user */
    queryInterface.createTable('users', {
      id: primaryID(Sequelize),
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      encrypted_password: {
        type: Sequelize.STRING
      },
      introduction: {
        type: Sequelize.TEXT
      },
      auth_token: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      genger: {
        type: Sequelize.ENUM('male', 'female')
      }
    }).then(function () {
      return queryInterface.addIndex('users', ['nickname', 'username']);
    });

    queryInterface.createTable('spots', {
      id: primaryID(Sequelize),
      location: {
        type: 'Point'
      },
      name: {
        type: Sequelize.STRING
      }
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.dropTable('users');
    queryInterface.dropTable('feeds');
    queryInterface.dropTable('comments');
    queryInterface.dropTable('spots');
  }
};
//# sourceMappingURL=20170725131014-init_all_table.js.map