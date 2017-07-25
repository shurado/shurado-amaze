'use strict';
const Sequelize = require('Sequelize');
console.log(Sequelize.GEOMETRY)
const primaryID = (Sequelize) => ({
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
});

const timestamp = (Sequelize) => ({
  type: Sequelize.DATE,
  defaultValue: Sequelize.NOW
})

module.exports = {
  up: function (queryInterface, Sequelize) {
    /* create user */
    queryInterface.createTable(
      'users',
      {
        id: primaryID(Sequelize),
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
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

    queryInterface.createTable('comments', {
      id: primaryID(Sequelize),
      text: {
        type: Sequelize.TEXT,
      },
      comment_type: {
        type: Sequelize.ENUM('suggestion', 'comment')
      },
      created_at: timestamp(Sequelize),
      updated_at: timestamp(Sequelize)
    }).then(() => queryInterface.addIndex('comments', ['text']));

    queryInterface.createTable('feeds', {
      id: primaryID(Sequelize),
      caption: {
        type: Sequelize.TEXT,
        image_url: {
          type: Sequelize.HSTORE,
          defaultValue: {
            hd: '',
            normal: ''
          }
        }
      },
      created_at: timestamp(Sequelize),
      updated_at: timestamp(Sequelize)
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

    queryInterface.createTable('feeds', {
      id: primaryID(Sequelize),
      caption: {
        type: Sequelize.TEXT,
      },
      image_url: {
        type: Sequelize.HSTORE
      },
      created_at: timestamp(Sequelize),
      updated_at: timestamp(Sequelize),
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users')
    queryInterface.dropTable('feeds')
    queryInterface.dropTable('comments')
    queryInterface.dropTable('spots')
  }
};
