const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../models/index');
module.exports = (sequelize, DataTypes) =>{
class User extends Model {}

User.init({
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  sequelize, 
  modelName: 'Message' 
});
return User;
}