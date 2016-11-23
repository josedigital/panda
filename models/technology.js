// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var technology = sequelize.define('technology', {
    tech: DataTypes.STRING,
    description: DataTypes.STRING
  
}, {
  timestamps: true,
  },
  
  {
    classMethods: {
      associate: function(models) {
        technology.belongsToMany(models.library, {through: 'techLibrary'});
        technology.belongsToMany(models.user, {through: 'userTech'});
      }
    }
  });
  return technology;
};