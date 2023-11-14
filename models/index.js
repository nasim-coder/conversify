'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./user')(sequelize, Sequelize);
db.Message = require('./message')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);
db.GroupMembers = require('./groupMember')(sequelize, Sequelize);


db.Users.hasMany(db.Message, {as: 'sentMessage', foreignKey: 'sender_id'} );
db.Users.hasMany(db.Message, {as: 'recievedMessage', foreignKey: 'reciever_id'});

db.Message.belongsTo(db.Users, {as: 'sender', foreignKey: 'sender_id'});
db.Message.belongsTo(db.Users, {as: 'reciever', foreignKey: 'reciever_id'})

db.GroupMembers.belongsTo(db.Users, {foreignKey: 'user_id'});

db.Group.hasMany(db.GroupMembers, {foreignKey: 'group_id'})
db.GroupMembers.belongsTo(db.Group, {foreignKey: 'group_id'});


db.Group.hasMany(db.Message, { as: 'messages', foreignKey: 'group_id' });
db.Message.belongsTo(db.Group, {foreignKey: 'group_id'})

module.exports = db;
