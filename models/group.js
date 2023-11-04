const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../models/index');
module.exports = (sequelize, DataTypes) =>{
class Group extends Model {}

Group.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  sequelize, 
  modelName: 'Group' 
});
return Group;
}