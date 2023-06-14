const { body, param, validationResult } = require("express-validator");

const db = require("../models");
const Farm = db.farms;
const User = db.users;

module.exports.farmValidator = [
    body("county")
        .trim()
        .notEmpty()
        .withMessage("County CANNOT be empty."),
    body("sub_county")
        .trim()
        .notEmpty()
        .withMessage("Sub county CANNOT be empty"),
    body("ward")
        .trim()
        .notEmpty()
        .withMessage("Ward CANNOT be empty"),
    body("number_of_employees")
        .trim()
        .notEmpty()
        .withMessage("Number of employees CANNOT be empty"),
    body("farmer_uuid")
        .trim()
        .notEmpty()
        .withMessage("User uuid CANNOT be empty.")
        .custom(async(value,{req}) => {
            const user = await User.findOne({where:{farmer_uuid:req.body.farmer_uuid}}).catch(e => { return false; });
            if(!user){
                throw new Error("User id NOT found.");
            }
        }),
    body("item_farmed")
        .trim()
        .notEmpty()
        .withMessage("Farmed item CANNOT be empty."),
    body("is_insured")
        .trim()
        .notEmpty()
        .withMessage("Is insured CANNOT be empty."),
    body("insurer")
        .trim()
        .notEmpty()
        .withMessage("Insurer CANNOT be empty."),
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