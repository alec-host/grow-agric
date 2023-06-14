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
  
  db.users = require("./user.model")(sequelize, Sequelize);
  db.usersextra = require("./user.extra.model")(sequelize, Sequelize);

  //db.users.hasOne(db.usersextra,{foreignKey:'farmer_id'});

  db.users.hasOne(db.usersextra,{foreignKey:"farmer_id",sourceKey:"_id"});
  db.usersextra.belongsTo(db.users,{foreignKey:"farmer_id",sourceKey:"_id"});

  db.farms = require("./farm.model")(sequelize, Sequelize);
  db.farmchallenges = require("./farm.challenges.model")(sequelize, Sequelize);
  //db.users.hasMany(db.farms,{foreignKey:"farmer_id"});
  db.users.hasMany(db.farms,{foreignKey:"farmer_id",sourceKey:"_id"});
  //db.farms.belongsTo(db.users,{primaryKey: '_id'});
  db.farms.belongsTo(db.users,{foreignKey:"farmer_id",sourceKey:"_id"});

  //db.farms.hasOne(db.farmchallenges,{foreignKey:"farm_id"});
  db.farms.hasOne(db.farmchallenges,{foreignKey:"farm_id",sourceKey:"_id"});
  db.farmchallenges.belongsTo(db.farms,{foreignKey:"farm_id",sourceKey:"_id"});

  db.userotp = require("./user.otp.model")(sequelize, Sequelize);

  module.exports = db;
