const authValidators = require("./auth-validators");
const userValidators = require("./user-validators");
const farmValidators = require("./farm-validators");
const financeValidators = require("./finance-validators");
const farmChallengeValidators = require("./farm-challenge-validators");
const preferredFarmSuppliesValidators = require("./preferred-farm-supplies-validators");

module.exports = {
    ...authValidators,
    ...userValidators,
    ...farmValidators,
    ...financeValidators,
    ...farmChallengeValidators,
    ...preferredFarmSuppliesValidators
};