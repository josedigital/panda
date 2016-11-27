'use strict';
module.exports = function(sequelize, DataTypes) {
  var job_search = sequelize.define('job_search', {
    api_name: DataTypes.STRING,
    api_uri: DataTypes.STRING,
    search_params: DataTypes.STRING
  },

  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return job_search;
};