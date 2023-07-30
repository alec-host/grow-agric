const _ = require("lodash");

const common = require("./utility/common.controller");
const db = require("../models");

const HearAboutUs = db.hearaboutus;
const Op = db.Sequelize.Op;

module.exports.hearAboutUs = async(req,res) =>{
    if(Object.keys(req.body).length !== 0){
        const {farmer_uuid,full_name,phone_number,media_channel} = req.body;
        const user = await common.findUserByUUID(farmer_uuid);
        if(user){
            const payload = {farmer_uuid,full_name,phone_number,media_channel};
            const resp = await create(payload);
            if(resp){
                return res.status(201).json({
                    success: true,
                    error: false,
                    message: payload
                }); 
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: resp[1]
                });                
            }
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "User with id: "+ farmer_uuid +" not found."
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

const create = async(payload) => {
    const newEntry = await HearAboutUs.create(payload);
    if(!newEntry) {
        return [false,"Attention: adding an entry has failed"];
    }
    return [true,newEntry];
};