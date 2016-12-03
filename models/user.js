// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_title:  {
    type: DataTypes.STRING
    // defaultValue: 'Full stack javascript developer. You can replace this using the blue button on the top left of your screen.'
    },
    email: DataTypes.STRING,
    git_link: DataTypes.STRING,
    main_text: {
    type: DataTypes.STRING
    // defaultValue: 'This area is reserved for your custom developer objective. You can replace this using the blue button on the top left of your screen.'
    },
    avitar_link: DataTypes.STRING,
    camp_name:  {
      type: DataTypes.STRING
      // defaultValue: 'The Coding Boot Camp at UT Austin'
    }
  },
  {
    classMethods: {
      associate: function(models) {
        // user.hasMany(models.repos, {onDelete: 'CASCADE'});
        user.belongsToMany(models.technology, {through: 'userTech'});
        
      }
    }
  });
  return user;
};