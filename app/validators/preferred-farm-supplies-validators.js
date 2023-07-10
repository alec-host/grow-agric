const { body, param, validationResult } = require("express-validator");

const db = require("../models");

const User = db.users;

module.exports.preferredFarmValidator = [
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("County CANNOT be empty.")
        .bail()
        .custom(async(value,{req}) => {
            const user = await User.findOne({where:{phone_number:req.body.phone_number}}).catch(e => { return false; });
            if(!user){
                throw new Error("User id NOT found.");
            }
        }),
    body("chick_supplier")
        .trim()
        .notEmpty()
        .withMessage("Chick supplier CANNOT be empty"),
    body("feed_supplier")
        .trim()
        .notEmpty()
        .withMessage("Feed supplier CANNOT be empty"),
    body("other_chick_supplier")
        .trim()
        .notEmpty()
        .withMessage("Other chick supplier CANNOT be empty"),
    body("other_feed_supplier")
        .trim()
        .notEmpty()
        .withMessage("Other feed supplier CANNOT be empty"),                
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false,
                error: true,
                validation:{errors:errors.array()},
                message: "Field[s] have to be checked",
            });
        next(); 
    }   
];