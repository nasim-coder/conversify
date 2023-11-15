const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
module.exports = (sequelize, DataTypes) => {
  class GroupMembers extends Model { }

  GroupMembers.init(
    {
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },

    {
      sequelize,
      modelName: 'GroupMembers',
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'group_id'],
          name: 'unique_user_group',
        },
      ],
    }

  );
  return GroupMembers;
}