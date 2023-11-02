'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize')
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

db.user = require('./user')(sequelize, Sequelize);

module.exports = db;
