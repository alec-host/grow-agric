const _ = require("lodash");
const { encrypt } = require("../services/crypto");
const { generateOTP } = require("../services/OTP");
const { compare } = require("bcrypt");
const { accessToken, refreshToken } = require("../services/JWT");

const db = require("../models");

const Users = db.users;
const UsersExtra = db.usersextra;
const HearAboutUs = db.hearaboutus;
const UserOtp = db.userotp;
const Op = db.Sequelize.Op;
const {fn, col } = db.Sequelize;

const getPagination = require("./utility/pagination");
const getPagingData = require("./utility/page.data");
const { getAccountVerifiedCountByPhoneNumber, hearAboutPlatform } = require("./utility/common.controller");
const { sendSMS } = require("../services/SMS");
const { OTP_MESSAGE } = require("../constants/message.template");
const http = require("./utility/http.handle");

let refreshTokens = [];

exports.registerUser = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {first_name,last_name,phone_number,password,confirm_password} = req.body;
        if(password == confirm_password) {

            const user = await findUserByPhoneNumber(phone_number);

            if(user){
                return res.status(200).json({
                    success:false,
                    error:false,
                    message: "Phone number is in use"
                });
            }else{ 
                const hashedPassword = await encrypt(password);
                const otpGenerated = await generateOTP();
                const createPayload = {first_name:first_name,last_name:last_name,phone_number:phone_number,password:hashedPassword,otp:otpGenerated}; 
                const newUser = await createUser(createPayload);
                if(newUser[0]){
                    //-.record some data.
                    await createUserExtra({farmer_id:newUser[1].toJSON()._id,farmer_uuid:newUser[1].toJSON().farmer_uuid});
                    await createUserOtp(createPayload);
                    console.log('OTP '+ otpGenerated);

                    const {phone_number,farmer_uuid,first_name,last_name,id_number,email,home_county,gender,age,is_married,level_of_education} = newUser[1];

                    const hearAboutUsPayload = {farmer_uuid:farmer_uuid,full_name:first_name+" "+last_name,phone_number:phone_number,platform:'Unspecified'};

                    const resp = await http.postJsonData("http://localhost:8585/api/v1/users/hearAboutUs",hearAboutUsPayload);

                    return res.status(201).json({
                        success: true,
                        error: false,
                        message: {phone_number,farmer_uuid,first_name,last_name,id_number,email,home_county,gender,age,is_married,level_of_education}
                    });               
                }else{
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: newUser[1]
                    });                   
                }    
            }
        }else{
            res.status(500).json({
                success: false,
                error: true,
                message: "Attention: mismatching password."
            });  
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });       
    }
};

exports.loginUser = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        try{
            const {phone_number,password} = req.body;
            const user = await findUserByPhoneNumber(phone_number);
            if(user){
                if(user && (await compare(password,user.password))){
                    //-.create token.
                    const token = accessToken({"user_uuid":user.farmer_uuid,"channel":"mobile"});
                    const rToken = refreshToken({"user_uuid":user.farmer_uuid,phone_number});

                    refreshTokens.push(rToken);

                    //-.save token.
                    await modifyUserDataByPhoneNumber(phone_number,{token:token});
                    return res.status(200).json({
                        success: true,
                        error: false,
                        message: "Login successful, ACCESS TOKEN :"+ token + " REFRESH_TOKEN :" + rToken
                    }); 
                }
                return res.status(200).json({
                    success: false,
                    error: true,
                    message: "Invalid credentials."
                });           
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "Account does not exist."
                });            
            }
        }catch(er)
        {
            res.status(500).json({
                success: false,
                error: true,
                message: "Something wrong has happened."+er.message
            });            
        }         
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });        
    } 
};

exports.logoutUser = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {phone_number,token} = req.body; 
        const user = await findUserByPhoneNumber(phone_number);
        if(user){
            refreshTokens = refreshTokens.filter(t => t !==token);
            //-.mark as offline.
            await modifyUserDataByPhoneNumber(phone_number,{token:refreshTokens});
            console.log(refreshTokens);
            return res.status(200).json({
                success: true,
                error: false,
                message: "Logout successful."
            }); 
        }else{
            res.status(404).json({
                success: false,
                error: true,
                message: "User with Phone number: "+ phone_number +" not found."
            });            
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });         
    }
};

exports.verifyByPhoneNumber = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {phone_number,otp} = req.body;
        const user = await validateUserRegistration(phone_number,otp);
        console.log(user[0]);
        if(user[0]){
            await deleteOtp(phone_number);
            res.status(200).json({
                success: true,
                error: false,
                message: "Phone number has been verified successfully."
            }); 
        }else{
            console.log("xxxxxxxxxx" +user[1]);
            if(user[1].includes("OTP")){
                res.status(200).json({
                    success: false,
                    error: true,
                    message: user[1]
                }); 
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: user[1]
                });
            }
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};

exports.modifyUser = async(req,res) => {
    const user_uuid = req.params ? req.params.reference_id : "";
    if(Object.keys(req.body).length !== 0) {
        const {email} = req.body;
        const user = await findUserByUUID(user_uuid);
        const platform = await hearAboutPlatform(user.farmer_uuid);
        if(user){ 
            if(email.length > 0){
                emailValidatationStatus = await validateUserEmail(email);
            }else{
                emailValidatationStatus = true;
            }
            if(emailValidatationStatus){
                const mUser = await modifyUserDataByUUID(user_uuid,req.body);
                if(mUser){
                    //-.profile update tracking.
                    await updateUserExtra(user_uuid,{farmer_uuid:user_uuid,platform:platform,county:user.home_county});
                    Users.findOne({
                        where: {
                            farmer_uuid:user_uuid
                        },
                        attributes: ['first_name','last_name',
                                    'farmer_uuid','phone_number',
                                    'gender','id_number',
                                    'age','is_married','level_of_education',
                                    'year_of_experience','home_county','email'],
                    }).then(data => {
                        const {first_name,last_name,farmer_uuid,phone_number,gender,id_number,age,is_married,level_of_education,year_of_experience,home_county,email} = data;
                        const newPayload = {first_name,last_name,farmer_uuid,phone_number,gender,id_number,age,is_married,level_of_education,year_of_experience,home_county,email,platform};
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: newPayload
                        });
                    });
                }else{
                    res.status(500).json({
                        success: false,
                        error: true,
                        message: "Something wrong happened while searching users info."
                    });
                }
            }else{
                return res.status(500).json({
                    success: false,
                    error: false,
                    message: "Attention: Invalid email address."
                });
            }
        }else{
            return res.status(404).json({
                success: false,
                error: false,
                message: "User with id: "+ user_uuid +" not found."
            });
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });        
    }
};

exports.updateUserFCM = async(req,res) => {
    const user_uuid = req.params ? req.params.reference_id : "";
    if(Object.keys(req.body).length !== 0) {
        const user = await findUserByUUID(user_uuid);
        if(user){ 
            const mUser = await modifyUserDataByUUID(user_uuid,req.body);
            if(mUser)
            {
                Users.findOne({
                    where: {
                        farmer_uuid:user_uuid
                    },
                    attributes: ['first_name','last_name'],
                }).then(data => {
                    res.status(200).json({
                        success: true,
                        error: false,
                        message: data
                    });
                });
            }else{
                res.status(500).json({
                    success: false,
                    error: true,
                    message: "Something wrong happened while searching users info."
                });
            }
        }else{
            return res.status(404).json({
                success: false,
                error: false,
                message: "User with id: "+ user_uuid +" not found."
            });
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });        
    }
};

exports.newOTP = async(req,res) => {
    const phoneNumber = req.params ? req.params.phoneNumber : null;
    if(phoneNumber){
        const user = await findUserByPhoneNumber(phoneNumber);
        if(user){
            const otpGenerated = await generateOTP();
            const createPayload = {"phone_number":phoneNumber,"otp":otpGenerated}; 
            console.log(createPayload);
            const emalifyResp = await createUserOtp(createPayload);
            if(emalifyResp[0]){
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: OTP_MESSAGE.replace('{0}',otpGenerated)
                });
            }else{
                return res.status(200).json({
                    success: false,
                    error: true,
                    message: OTP_MESSAGE.replace('{0}',otpGenerated)
                });               
            }
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "User with phone: "+ phoneNumber +" not found."
            });             
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request params not provided."
        });        
    }
};

exports.changePassword = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {user_uuid,password,confirm_password,otp} = req.body;
        const user = await findUserByUUID(user_uuid);
        if(user){
            if(password == confirm_password){
                const hashedPassword = await encrypt(password);
                const modified_user = await modifyUserDataByUUID(user_uuid,{password:hashedPassword});
                const generated_otp = await getUserOtpGenerated(user.phone_number);
                console.log("XXXXXXXXX "+generated_otp +" input otp  "+otp+"    "+user.phone_number);
                if(generated_otp && generated_otp == otp){
                    if(modified_user){
                        return res.status(200).json({
                            success: true,
                            error: true,
                            message: "Password has been changed."
                        });                     
                    }else{
                        return res.status(404).json({
                            success: false,
                            error: true,
                            message: "User with id: "+ user_uuid +" not found."
                        });                    
                    }
                }else{
                    return res.status(200).json({
                        success: true,
                        error: true,
                        message: "The verification code provided is Invalid"
                    });                    
                }
            }else{
                res.status(500).json({
                    success: false,
                    error: true,
                    message: "Attention: mismatching password."
                });                  
            }
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "User with id: "+ user_uuid +" not found."
            });           
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });        
    }
};

exports.token = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {user_uuid,channel} = req.body;
        const user = await findUserByUUID(user_uuid);
        if(user){
            const token = accessToken({"user_uuid":user.farmer_uuid,"channel":channel});
            //-.save token.
            await modifyUserDataByUUID(user_uuid,{token:token});
            return res.status(200).json({
                success: true,
                error: false,
                message: "ACCESS TOKEN :"+ token
            });
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "User with id: "+ user_uuid +" not found."
            });            
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });
    }
};

exports.accountVerified = async(req,res) => {
    const phoneNumber = req.params ? req.params.phoneNumber : null;
    if(phoneNumber){
        const user = await findUserByPhoneNumber(phoneNumber);
        if(user){
            let count = await getAccountVerifiedCountByPhoneNumber(phoneNumber); 
            return res.status(200).json({
                success: true,
                error: false,
                message: ""+count
            });
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "User with phone: "+ phoneNumber +" not found."
            });            
        }       
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request params not provided."
        });  
    }   
};

exports.getUserProfile = async(req,res) => {
    const phoneNumber = req.params ? req.params.phoneNumber : null;
    if(phoneNumber){
        const user = await findUserByPhoneNumber(phoneNumber);
        if(user){
            const platform = await hearAboutPlatform(user.farmer_uuid);
            Users.findOne({
                where: {
                    phone_number: phoneNumber
                },
                attributes: ['first_name','last_name',
                            'farmer_uuid','phone_number',
                            'gender','id_number',
                            'age','is_married','level_of_education',
                            'year_of_experience','home_county',
                            'email'],
            }).then(data => {
                if(data != null){
                    const {first_name,last_name,farmer_uuid,phone_number,gender,id_number,age,is_married,level_of_education,year_of_experience,home_county,email} = data;
                    const profile = 
                            {
                                first_name:first_name,
                                last_name:last_name,
                                farmer_uuid:farmer_uuid,
                                phone_number:phone_number,
                                gender:gender,
                                id_number:id_number,
                                age:age,
                                is_married:is_married,
                                level_of_education:level_of_education, 
                                year_of_experience:year_of_experience,
                                home_county:home_county,
                                email:email,
                                platform:platform
                            };
                    res.status(200).json({success:true,error:false,message:profile});
                }else{
                    res.status(404).json({
                        success: false,
                        error: true,
                        message: "User with id: "+ phoneNumber +" not found."
                    }); 
                }
            });
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "User with phone: "+ phoneNumber +" not found."
            });               
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request params not provided."
        });  
    }
};

exports.getUserExtraProfileStatus = async(req,res) => {
    const phone_number = req.params ? req.params.phoneNumber : null;
    if(phone_number){
        const user = await findUserByPhoneNumber(phone_number);
        if(user){
            const platform = await getUserIndicatedHearAboutUsPlatform(user.farmer_uuid);
            if(platform == 1){
                res.status(200).json({
                    success: true,
                    error: false,
                    message: platform
                });                 
            }else{
                res.status(200).json({
                    success: false,
                    error: false,
                    message: platform
                });    
            }
        }else{
            res.status(404).json({
                success: false,
                error: true,
                message: "User with mobile: "+ phone_number +" not found."
            });             
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request params not provided."
        });         
    }
};

const getUserIndicatedHearAboutUsPlatform = async(user_uuid) => {
    const user = await HearAboutUs.findOne({where:{farmer_uuid:user_uuid}}).catch(e => { return 0; });
    if(user.platform == 'Unspecified') {
        return 0;
    }
    return 1;
};

const createUser = async(payload) => {
    const newUser = await Users.create(payload);
    if(!newUser) {
        return [false,"Attention: registration has failed"];
    }
    return [true,newUser];
};

const createUserExtra = async(payload) => {
    UsersExtra.create(payload);
};

const updateUserExtra = async(user_uuid,payload) => {
    const isUpdated = await UsersExtra.update(payload,{ where:{farmer_uuid:user_uuid}}).catch(e => { return false; });
    if(!isUpdated){
        return false;
    }
    return true;
};

const createUserOtp = async(payload) => {
    const {phone_number,otp} = payload;
    const [_obj,created] = await UserOtp.upsert(payload).catch(e => {return false;});
    if(created){
        const text_message = OTP_MESSAGE.replace('{0}',otp);
        const {status,message} = await sendSMS(phone_number,text_message);
        //const status=false;
        console.log(JSON.stringify({status,message,_obj}));
        return [true,'message'];
    }else{
        return [false];
    }
};

const validateUserRegistration = async(phoneNumber,otp) => {
    const user = await findUserByPhoneNumber(phoneNumber);
    if(!user) {
        return [false,"User with phone: "+ phoneNumber +" does not exist."];       
    }
    const userOtp = await getUserOtpGenerated(phoneNumber);
    if(!userOtp) {
        return [false,"No OTP has been set."];
    }
    if(userOtp && userOtp.toString() !== otp) {
        return [false,"The OTP provided is Invalid."];
    }
    const verifiedUser = await modifyUserDataByPhoneNumber(phoneNumber,{is_verified:1});
    return [true,verifiedUser];
};

const modifyUserDataByUUID = async(userUUID,payload) => {
    const isUpdated = await Users.update(payload,{ where:{farmer_uuid:userUUID}}).catch(e => { return false; });
    if(!isUpdated){
        return false;
    }
    return true;
};

const modifyUserDataByPhoneNumber = async(phoneNumber,payload) => {
    const isUpdated = await Users.update(payload,{ where:{phone_number:phoneNumber}}).catch(e => { return false; });
    if(!isUpdated){
        return false;
    }
    return true;
};

const findUserByPhoneNumber = async(phoneNumber) => {
    const user = await Users.findOne({where:{phone_number:phoneNumber}}).catch(e => { return false; });
    if(!user) {
        return false;
    }
    return user;
};

const findUserByUUID = async(userUUID) => {
    const user = await Users.findOne({where:{farmer_uuid:userUUID}}).catch(e => { return false; });
    if(!user) {
        return false;
    }
    return user;
};

const getUserOtpGenerated = async(phoneNumber) => {
    const user = await UserOtp.findOne({where:{phone_number:phoneNumber,is_deleted:0}}).catch(e => { return false; });
    if(!user) {
        return false;
    }
    return user.otp;
};

const deleteOtp = async(phoneNumber) => {
    const user = UserOtp.destroy({where:{phone_number:phoneNumber,is_deleted:0}}).catch(e => { return false; });
};

const validateUserEmail = async(email) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
};

//-.specific user info.
exports.getUserSpecificData = async(req,res) => {
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page,size);

    Users.findAll({
        limit,offset,
        attributes: [[fn('concat', col('first_name'), ' ', col('last_name')), "full_name"],'farmer_uuid'],
    }).then(data => {
        res.status(200).json(data);
    }).catch(err =>{
        res.status(500).json({
            success: false,
            error: true,
            message: err.message +" "+"Something wrong happened while retrieving users info."
        });      
    });
};

exports.findAll = async(req,res) => {
    const filters = {};
    const search = req.params.search;
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page,size);

    const value = {[Op.like]: "%" + search + "%"}
    const fields = Object.keys(_.omit(Users.rawAttributes,["_id","password","createdAt","updatedAt"]));

    fields.forEach((item) => (filters[item] = value));

    Users.findAll({
        where:{
            [Op.or]:filters,is_deleted:0
        },
        limit,offset,
        attributes: ['first_name','last_name',
        'gender','id_number',
        'age',['is_married','married'],
        ['level_of_education','highest_education'],
        'year_of_experience',['home_county','county'],
        'phone_number','email',
        'date_created','date_modified'],
        order:[["date_created","DESC"]],
    }).then(data => {
        res.status(200).json(data);
    }).catch(err =>{
        res.status(500).json({
            success: false,
            error: true,
            message: err.message +" "+"Something wrong happened while retrieving users info."
        });      
    });
};

exports.findAndCountAll = async(req,res) => {
    const filters = {};
    const { page, size, search } = req.query;
    const { limit, offset } = getPagination(page, size);

    const value = {[Op.like]: "%" + search + "%"}
    const fields = Object.keys(_.omit(Users.rawAttributes,["_id","password","createdAt","updatedAt"]));

    fields.forEach((item) => (filters[item] = value));

    Users.findAndCountAll({
        where: {[Op.or]:filters,is_deleted:0},limit,offset,
        attributes: [['_id','id'],
                    'first_name','last_name',
                    'gender','id_number',
                    'age',['is_married','married'],
                    ['level_of_education','highest_education'],
                    'year_of_experience',['home_county','county'],
                    'phone_number','email',
                    'date_created','date_modified'],
                    order:[["date_created","DESC"]],      
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message +" "+"Something wrong happened while retrieving users info."
        });
    });
};

exports.welcome = async(req,res) => {
    res.status(200).json({
        success: true,
        error: false,
        message: "karibu growagric"
    });
};

exports.ping = async(req,res) => {
    res.status(200).json({
        success: true,
        error: false,
        message: "heartbeat"
    });
};

exports.errorHandler = async(err,req,res,next) => {
    res.sendStatus(err.status || 500);
};
