const authValidators = require("./auth-validators");
const userValidators = require("./user-validators");
const farmValidators = require("./farm-validators");

module.exports = {
    ...authValidators,
    ...userValidators,
    ...farmValidators
};