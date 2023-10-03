const _ = require("lodash");
const { encrypt } = require("../services/crypto");
const { compare } = require("bcrypt");

const axios = require('axios');

const { findUserByEmail } = require("./utility/common.controller");

const db = require("../models");

const Op = db.Sequelize.Op;
const {fn, col } = db.Sequelize;

const Courses = db.learncourses;
const ChatMessages = db.chatmessages;

exports.authenticateWebPortalUser = async(email,password) => {
    if(email && password) {
        const user = await findUserByEmail(email);
        console.log(user);
        if(user && await compare(password,user.password)){
            const ADMIN = {email:user.email,password:user.password,role:user.role,names:user.first_name+' '+user.last_name};
            return ADMIN;
        }else{
            return null;
        }
    }else{
        return null;
    }
};

exports.changePassword = async(req,res) => {
if(Object.keys(req.body).length !== 0){
        const {user_uuid,password,confirm_password} = req.body;
        const user = await findUserByUUID(user_uuid);
        if(user){
            if(password == confirm_password){
                const hashedPassword = await encrypt(password);
                const user = await modifyUserDataByUUID(user_uuid,{password:hashedPassword});
                if(user){
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

exports.AddCourse = async(payload) => {
    const [_obj,created] = await Courses.upsert(payload).catch(e => {return false;});
    if(created){
        return true;
    }else{
        return false;
    }
};

exports.EditCourse = async(payload) => {
    const {record_id} = payload;
    await Courses.update(payload,{where:{_id:record_id}});
};

exports.GetChatMessage = async(uuid) => {
    const message = await ChatMessages.findAll({where:{farmer_uuid:uuid},attributes:['_id','message','message_origin','createdAt'],}).then(data =>{return data;}).catch(e => { return false; });

    if(!message) {
        return false;
    }
    return message;
};

exports.Chat = async(payload) => {
    const [_obj,created] = await ChatMessages.upsert(payload).catch(e => {return false;});
    if(created) {
        return true;
    }else{
        return false;
    }
};