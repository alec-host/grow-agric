const {DATABASE_NAME,DATABASE_USER,DATABASE_HOST,DATABASE_PASS} = require("../constants/constants");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
    {
      host: DATABASE_HOST,
      dialect: 'mysql',
      pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
         }
    }
  );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, Sequelize);

module.exports = db;