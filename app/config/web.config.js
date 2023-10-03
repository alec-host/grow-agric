const express = require("express");
const AdminBro = require('admin-bro');
const AdminBroSequelize = require("@admin-bro/sequelize");
const AdminBroExpress = require("@admin-bro/express");
const app = express();

const db = require("../models");

const { AdminBroOptions } = require("../../admin/resources");
const { DASHBORD_SERVER_PORT, COOKIE_SECRET, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASS, SUPER_ADMIN_ROLE, COOKIE_NAME, COOKIE_PASSWORD } = require("../constants/constants");
const { findUserByEmail } = require("../controllers/utility/common.controller");
const { authenticateWebPortalUser } = require("../controllers/web.admin.controller");

const PORT = DASHBORD_SERVER_PORT;

//-.register AdminBro.
AdminBro.registerAdapter(AdminBroSequelize);

db.sequelize.sync()
  .then(() => {
  console.log("Synced db.");
})
  .catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

//temp login details
const SUPER_ADMIN = {
    email: SUPER_ADMIN_EMAIL,
    password: SUPER_ADMIN_PASS,
    role: SUPER_ADMIN_ROLE
};

//-.load options.
const adminBro = new AdminBro(AdminBroOptions);

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email,password) => {
      const user = await findUserByEmail(email);
      if(user){
        const result = await authenticateWebPortalUser(email,password);
        return result;
      }else if(SUPER_ADMIN.password === password && SUPER_ADMIN.email === email){
        return SUPER_ADMIN;
      }else{
        return null;
      }
    },
    cookieName: COOKIE_NAME,
    cookiePassword: COOKIE_PASSWORD,
    session: {
        secret: COOKIE_SECRET,
        resave: true,
        saveInitialized: true
    }
  });

  const router2 = AdminBroExpress.buildRouter(adminBro);

  app.use(express.static('./public'));
  app.use(adminBro.options.rootPath,router);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  module.exports = {
    app,
    db,
    PORT
};