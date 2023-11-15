const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../models/index');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model { }

  Message.init({
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    sequelize,
    modelName: 'Message'
  });
  return Message;
}