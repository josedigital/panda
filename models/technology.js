'use strict';
module.exports = function(sequelize, DataTypes) {
  var technology = sequelize.define('technology', {
    tech: DataTypes.STRING,
    description: DataTypes.STRING
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
  return technology;
};