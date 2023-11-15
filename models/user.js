const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../models/index');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    }
  }, {

    sequelize,
    modelName: 'User'
  });
  return User;
}