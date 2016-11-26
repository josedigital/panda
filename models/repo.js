// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var repo = sequelize.define('repos', {
    username: DataTypes.STRING,
    repo_name: DataTypes.STRING,
    repo_url: DataTypes.STRING,
    repo_description: DataTypes.TEXT
  });
  return repo;
};