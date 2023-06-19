const express = require("express");
const AdminBro = require('admin-bro');
const AdminBroSequelize = require("@admin-bro/sequelize");
const AdminBroExpress = require("@admin-bro/express");
const app = express();

app.use(express.json());

const db = require("../models");
const { AdminBroOptions } = require("../../admin/resources");
const { DASHBORD_SERVER_PORT, COOKIE_SECRET } = require("../constants/constants");

const PORT = DASHBORD_SERVER_PORT;

//-.register AdminBro.
AdminBro.registerAdapter(AdminBroSequelize);
//-.load options.
const adminBro = new AdminBro(AdminBroOptions);

//temp login details
const ADMIN = {
    email: 'admin@admin.com',
    password: 'admin',
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN
      }
      return null
    },
    cookieName: 'adminbro',
    cookiePassword: 'somepassword',
    session: {
        secret: COOKIE_SECRET,
        resave: true,
        saveInitialized: true
    }
  });

  const router2 = AdminBroExpress.buildRouter(adminBro);

  app.use(express.static("./public"));
  app.use(adminBro.options.rootPath,router);

  module.exports = {
    app,
    db,
    PORT
};