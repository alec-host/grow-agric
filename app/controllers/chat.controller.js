
const _ = require("lodash");

const axios = require('axios');

const { findUserByUUID } = require("./utility/common.controller");

const db = require("../models");

const Op = db.Sequelize.Op;

const ChatMessages = db.chatmessages;
const ChatRoom = db.chatrooms;

exports.AddChatMessage = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        
        const {farmer_uuid,message,message_origin} = req.body;
        const user = await findUserByUUID(farmer_uuid);
        if(user){
            const full_name = user.first_name +' '+user.last_name; 
            const farmer_uuid = user.farmer_uuid;
            const response = await CreateChatSession({full_name,farmer_uuid});
            const [_obj,created] = await ChatMessages.upsert({farmer_uuid,message,message_origin}).catch(e => {return false;});
            if(created) {
                res.status(201).json({
                    success: true,
                    error: false,
                    message: "message received"
                });
            }else{
                res.status(400).json({
                    success: false,
                    error: false,
                    message: "something wrong has happened"
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

const CreateChatSession = async(payload) => {
    const [_obj,created] = await ChatRoom.upsert(payload).catch(e => {return false;});
    if(created){
        return true;
    }else{
        return false;
    }
}