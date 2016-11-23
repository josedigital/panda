// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var resource_type = sequelize.define('resource_type', {
    type: DataTypes.STRING
    //  createdAt: {
    //   type: DataTypes.DATE,
    //   field: 'createdAt',
    //   defaultValue: sequelize.literal('NOW()')
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   field: 'updatedAt',
    //   defaultValue: sequelize.literal('NOW()')
    // }
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