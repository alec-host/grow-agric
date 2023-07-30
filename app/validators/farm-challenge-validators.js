const { body, param, validationResult } = require("express-validator");

const db = require("../models");

const User = db.users;

module.exports.farmChallengeValidator = [
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone number CANNOT be empty.")
        .bail()
        .custom(async(value,{req}) => {
            const user = await User.findOne({where:{phone_number:req.body.phone_number}}).catch(e => { return false; });
            if(!user){
                throw new Error("User id NOT found.");
            }
        }),
    body("challenges_faced")
        .trim()
        .notEmpty()
        .withMessage("Challenges CANNOT be empty"),
    body("other_challenges")
        .trim()
        .notEmpty()
        .withMessage("Other challenges CANNOT be empty"),
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