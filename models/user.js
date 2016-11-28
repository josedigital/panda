// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    git_link: DataTypes.STRING,
    main_text: DataTypes.TEXT,
    avitar_link: DataTypes.STRING
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