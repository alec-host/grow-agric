const { param } = require("express-validator");

exports.findOneValidator = [
    param("reference_id").notEmpty().withMessage("Reference id CANNOT be empty."),
];