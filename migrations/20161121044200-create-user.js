'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
      display_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      git_link: {
        type: Sequelize.STRING
      },
      technologies: {
        type: Sequelize.STRING
      },
      main_text: {
        type: Sequelize.TEXT
      },
      git_repo1: {
        type: Sequelize.STRING
      },
      git_text1: {
        type: Sequelize.STRING
      },
      git_repo2: {
        type: Sequelize.STRING
      },
      git_text2: {
        type: Sequelize.STRING
      },
      git_repo3: {
        type: Sequelize.STRING
      },
      git_text3: {
        type: Sequelize.STRING
      },
      avitar_link: {
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
    return queryInterface.dropTable('users');
  }
};