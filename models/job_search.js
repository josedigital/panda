'use strict';
module.exports = function(sequelize, DataTypes) {
  var job_search = sequelize.define('job_search', {
    api_name: DataTypes.STRING,
    api_uri: DataTypes.STRING,
    search_params: DataTypes.STRING,
    default_city: DataTypes.STRING,
    key_word: DataTypes.STRING
  },
  // {
  //     timestamps: false
  //   }, 
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return job_search;
};