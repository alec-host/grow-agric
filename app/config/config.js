const express = require("express");
const fs = require("fs");
const app = express();
const db = require("../models");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json")
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

const {SERVER_PORT} = require("../constants/constants");

const PORT = SERVER_PORT;

app.use(express.json());

//-.api documentation.
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument,{customCss}));

//-.routes.
require("../routes/user.routes") (app);

module.exports = {
    app,
    db,
    PORT
};
