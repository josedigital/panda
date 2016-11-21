'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    git_link: DataTypes.STRING,
    technologies: DataTypes.STRING,
    main_text: DataTypes.TEXT,
    git_repo1: DataTypes.STRING,
    git_text1: DataTypes.STRING,
    git_repo2: DataTypes.STRING,
    git_text2: DataTypes.STRING,
    git_repo3: DataTypes.STRING,
    git_text3: DataTypes.STRING,
    avitar_link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};