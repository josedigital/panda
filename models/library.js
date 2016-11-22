'use strict';
module.exports = function(sequelize, DataTypes) {
  var library = sequelize.define('library', {
    resource: DataTypes.STRING
  },
  // {
  //     timestamps: false
  //   },
  {
    classMethods: {
      associate: function(models) {
        library.belongsToMany(models.technology, {through: 'techLibrary'});
        library.belongsToMany(models.resource_type, {through: 'resourceLibrary'});
      }
    }
  });
  return library;
};