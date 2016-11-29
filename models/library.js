// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var library = sequelize.define('library', {
    resource: DataTypes.STRING,
    resource_name: DataTypes.STRING
  },

  {
    classMethods: {
      associate: function(models) {
        library.belongsToMany(models.technology, {through: 'techLibrary'},{onDelete: "CASCADE"});
        library.belongsToMany(models.resource_type, {through: 'resourceLibrary'},{onDelete: "CASCADE"});
      }
    }
  });
  return library;
};