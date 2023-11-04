const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
module.exports = (sequelize, DataTypes) =>{
class GroupMembers extends Model {}

GroupMembers.init({
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  
}, {
  sequelize, 
  modelName: 'GroupMembers' 
});
return GroupMembers;
}