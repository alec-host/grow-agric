const { body, param, validationResult, query, check } = require("express-validator");

const db = require("../models");
const User = db.users;
const UserOtp = db.userotp;

module.exports.registrationValidator = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("Firstname CANNOT be empty."),
    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Lastname CANNOT be empty."),
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone number CANNOT be empty.")
        .bail()
        .custom(async(phone_number) => {
            const exists = await User.findOne({where:{phone_number}}).catch(e => { return false; });
            if(exists){
                //throw new Error("Attention: phone number is in use.");
                (req, res,) => {
                    return res.status(200).json({
                        success: false, 
                        error: true,
                        message: "Attention: phone number is in use.",
                    });
                }
            }
        }),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password CANNOT be empty.")
        .bail()
        .isLength({ min:4 })
        .withMessage("Password MUST be at least 4 characters long."),
    body("confirm_password")
        .trim()
        .notEmpty()
        .withMessage("Confirm password CANNOT be empty.")
        .bail()
        .custom(async(value,{req}) => {
            const outcome = (value === req.body.password);
            if(!outcome) {
                //throw new Error("Attention: confirm password does not match provided password.");
                (req, res, next) => {
                    return res.status(200).json({
                        success: false, 
                        error: true,
                        message: "Attention: confirm password does not match provided password.",
                    });
                }
            }
        }),
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
    },
];

module.exports.loginValidator = [
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone number CANNOT be empty."),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password CANNOT be empty.")
        .bail()
        .isLength({ min:4 })
        .withMessage("Password MUST be at least 4 characters long."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false, 
                error: true,
                validation: {errors:errors.array()},
                message: "Field[s] have to be checked",
            });
        next();
    },
];

module.exports.verifyPhoneNumberValidator = [
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone number CANNOT be empty."),
    body("otp")
        .trim()
        .notEmpty()
        .withMessage("OTP CANNOT be empty")
        .bail()
        .isLength({ min:6 })
        .withMessage("OTP MUST be at least 6 characters long.")
        .custom(async(value,{req}) => {
            const phone_number = req.body.phone_number;
            const user = await UserOtp.findOne({where:{phone_number:phone_number}}).catch(e => { return false; });
            const output = (value.toString() === user.otp.toString());
            if(!user) {
                //throw new Error("No OTP has been set.");
                (req, res, next) => {
                    return res.status(200).json({
                        success: false, 
                        error: true,
                        message: "No OTP has been set.",
                    });
                }
            }
            if(output == false) {
                //throw new Error("The OTP provided is Invalid.");
                (req, res, next) => {
                    return res.status(200).json({
                        success: false, 
                        error: true,
                        message: "The OTP provided is Invalid.",
                    });
                }
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false, 
                error: true,
                validation: {errors:errors.array()},
                message: "Field[s] have to be checked",
            });
        next();
    },
];

module.exports.changePasswordValidator = [
    body("user_uuid")
        .trim()
        .notEmpty()
        .withMessage("User uuid CANNOT be empty."),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password CANNOT be empty.")
        .bail()
        .isLength({ min:4 })
        .withMessage("Password MUST be at least 4 characters long."),
    body("confirm_password")
        .trim()
        .notEmpty()
        .withMessage("Confirm password CANNOT be empty.")
        .bail()
        .custom(async(value,{req}) => {
            const outcome = (value === req.body.password);
            if(!outcome) {
                //throw new Error("Attention: confirm password does not match provided password.");
                (req, res, next) => {
                    return res.status(200).json({
                        success: false, 
                        error: true,
                        message: "Attention: confirm password does not match provided password.",
                    });
                }
            }
        }),
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

module.exports.tokeValidator = [
    body("user_uuid")
        .trim()
        .notEmpty()
        .withMessage("User uuid CANNOT be empty."),
    body("channel")
        .trim()
        .notEmpty()
        .withMessage("Channel MUST be provided."),
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

module.exports.newOTPValidator = [
    param('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Param CANNOT be empty.'),
    param('phoneNumber')    
        .isInt()
        .withMessage('Param MUST be an integer.'),       
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false,
                error: true,
                validation:{errors:errors.array()},
                message: "Param MUST be provided.",
            });
        next();
    }          
];

module.exports.accountVerificationValidator = [
    param('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Param CANNOT be empty.'),
    param('phoneNumber')    
        .isInt()
        .withMessage('Param MUST be an integer.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false,
                error: true,
                validation:{errors:errors.array()},
                message: "Param MUST be provided.",
            });
        next();
    }
];