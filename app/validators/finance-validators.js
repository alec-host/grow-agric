const { body, param, validationResult } = require("express-validator");

const db = require("../models");

const User = db.users;

module.exports.financeValidator = [
    body("applicant_name")
        .trim()
        .notEmpty()
        .withMessage("Namr CANNOT be empty"),
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone CANNOT be empty."),            
    body("farmer_uuid")
        .trim()
        .notEmpty()
        .withMessage("User uuid CANNOT be empty.")
        .bail()
        .custom(async(value,{req}) => {
            const user = await User.findOne({where:{farmer_uuid:req.body.farmer_uuid}}).catch(e => { return false; });
            if(!user){
                throw new Error("User id NOT found.");
            }
        }),
    body("loan_amount")
        .trim()
        .notEmpty()
        .withMessage("Amount CANNOT be empty"),
    body("number_of_chicks_raised_now")
        .trim()
        .notEmpty()
        .withMessage("Chick production CANNOT be empty"),
    body("chick_cost")
        .trim()
        .notEmpty()
        .withMessage("Chicks cost CANNOT be empty."),
    body("feed_cost")
        .trim()
        .notEmpty()
        .withMessage("Feeds cost CANNOT be empty."),
    body("brooding_cost")
        .trim()
        .notEmpty()
        .withMessage("Brooding CANNOT be empty."),
    body("projected_sales_price_per_chick")
        .trim()
        .notEmpty()
        .withMessage("Project sale CANNOT be empty."),
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