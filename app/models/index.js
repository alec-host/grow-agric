const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'grow-agric',
   'root',
   '',
    {
      host: '127.0.0.1',
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
  
  //-.init migration.
  db.users = require("./user.model")(sequelize,Sequelize);
  db.usersextra = require("./user.extra.model")(sequelize,Sequelize);
  db.farms = require("./farm.model")(sequelize, Sequelize);
  db.farmchallenges = require("./farm.challenges.model")(sequelize,Sequelize);
  db.userotp = require("./user.otp.model")(sequelize, Sequelize);
  db.finances = require("./finance.model")(sequelize,Sequelize);
  db.financeextras = require("./finance.extra.model")(sequelize,Sequelize);
  db.financefeeds = require("./finance.feeds.model")(sequelize,Sequelize);
  db.sales = require("./sales.model")(sequelize,Sequelize);

  //-.relationship btwn users & extras.
  db.users.hasOne(db.usersextra,{foreignKey:"farmer_id",sourceKey:"_id"});
  db.usersextra.belongsTo(db.users,{foreignKey:"farmer_id",sourceKey:"_id"});
  //-.relation btwn users & farms.
  db.users.hasMany(db.farms,{foreignKey:"farmer_id",sourceKey:"_id"});
  db.farms.belongsTo(db.users,{foreignKey:"farmer_id",sourceKey:"_id"});
  //-.relationship btwn farm & challenges.
  db.farms.hasOne(db.farmchallenges,{foreignKey:"farm_id",sourceKey:"_id"});
  db.farmchallenges.belongsTo(db.farms,{foreignKey:"farm_id",sourceKey:"_id"});
  //-.relationship btwn users & finances.
  db.users.hasMany(db.finances,{foreignKey:"farmer_id",sourceKey:"_id"});
  db.finances.belongsTo(db.users,{foreignKey:"farmer_id",sourceKey:"_id"});
  //-.relationship btwn finances & extras.
  db.finances.hasOne(db.financeextras,{foreignKey:"application_id",sourceKey:"_id"});
  db.financeextras.belongsTo(db.finances,{foreignKey:"application_id",sourceKey:"_id"});
  //-.relationship btwn finance & feeds.
  db.finances.hasOne(db.financefeeds,{foreignKey:"application_id",sourceKey:"_id"});
  db.financefeeds.belongsTo(db.finances,{foreignKey:"application_id",sourceKey:"_id"});
  //-.relationship btwn users & sales.
  db.users.hasMany(db.sales,{foreignKey:"farmer_id",sourceKey:"_id"});
  db.sales.belongsTo(db.users,{foreignKey:"farmer_id",sourceKey:"_id"});

  module.exports = db;
