'use strict';
module.exports = function(sequelize, DataTypes) {
  var resource_type = sequelize.define('resource_type', {
    type: DataTypes.STRING
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
  return resource_type;
};