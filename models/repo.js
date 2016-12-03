// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var repo = sequelize.define('repos', {
    username: DataTypes.STRING,
    repo_name: DataTypes.STRING,
    repo_url: DataTypes.STRING,
    repo_description:  {
    type: DataTypes.STRING
    // defaultValue: 'This area is reserved for a custom description of this project. You can replace this using the blue button on the top left of your screen.'
    },
  });
  return repo;
};