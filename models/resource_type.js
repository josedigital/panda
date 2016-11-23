// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var resource_type = sequelize.define('resource_type', {
    type: DataTypes.STRING
  },
  // {
  //     timestamps: false
  //   }, 
  {
    classMethods: {
      associate: function(models) {
        resource_type.belongsToMany(models.library, {through: 'resourceLibrary'});
      }
    }
  });
  return resource_type;
};