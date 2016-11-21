'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('job_searches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      api_name: {
        type: Sequelize.STRING
      },
      api_uri: {
        type: Sequelize.STRING
      },
      search_params: {
        type: Sequelize.STRING
      },
      default_city: {
        type: Sequelize.STRING
      },
      key_word: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('job_searches');
  }
};