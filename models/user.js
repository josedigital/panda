// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_title: DataTypes.STRING,
    email: DataTypes.STRING,
    git_link: DataTypes.STRING,
    main_text: DataTypes.TEXT,
    avitar_link: DataTypes.STRING,
    camp_name:  {
      type: DataTypes.STRING,
      defaultValue: 'The Coding Boot Camp at UT Austin'
    }
  },
  {
    classMethods: {
      associate: function(models) {
        user.belongsToMany(models.technology, {through: 'userTech'});
      }
    }
  });
  return user;
};