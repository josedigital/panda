// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var technology = sequelize.define('technology', {
    tech: DataTypes.STRING,
    description: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        technology.belongsToMany(models.library, {through: 'techLibrary'},{onDelete: "CASCADE"});
        technology.belongsToMany(models.user, {through: 'userTech'});
      }
    }
  });
  return technology;
};