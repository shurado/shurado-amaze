'use strict';
const Sequelize = require('Sequelize');

const primaryID = (Sequelize) => ({
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
});

const timestamp = (Sequelize) => ({
  allowNull: false,
  type: Sequelize.DATE,
});

module.exports = {
  up: function (queryInterface, Sequelize) {
    /* create user */
     // queryInterface.sequelize.query('CREATE EXTENSION postgis;')
     queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS hstore;')
     // queryInterface.sequelize.query('CREATE EXTENSION postgis;')
    queryInterface.createTable(
      'users',
      {
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
          type: Sequelize.STRING,
        },
        genger: {
          type: Sequelize.ENUM('male', 'female')
        }
      }
    ).then(() => queryInterface.addIndex('users', ['nickname', 'username']));



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

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users')
    queryInterface.dropTable('feeds')
    queryInterface.dropTable('comments')
    queryInterface.dropTable('spots')
  }
};
