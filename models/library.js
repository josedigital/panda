'use strict';
module.exports = function(sequelize, DataTypes) {
  var library = sequelize.define('library', {
    resource: DataTypes.STRING
  },{
      timestamps: false
    },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return library;
};