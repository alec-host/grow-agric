const { accessToken, refreshToken } = require("../services/JWT");

const common = require("./utility/common.controller");
const http = require("./utility/http.handle");
const db = require("../models");

const Invite = db.invites;

module.exports.AddInvite = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {invitee_name,invitee_phone_number,farmer_uuid} = req.body;
        const user = await common.findUserByUUID(farmer_uuid);
        if(user){
            const createPayload = 
                    {
                        invitee_name:invitee_name,
                        invitee_phone_number:invitee_phone_number,
                        farmer_uuid:farmer_uuid,
                        farmer_name:user.first_name +" "+user.last_name,
                        farmer_phone_number:user.phone_number
                    };
            const newInvite = await createInvite(createPayload);
            if(newInvite[0]){
                return res.status(201).json({
                    success: true,
                    error: false,
                    message: newInvite[1]
                });                 
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: newInvite[1]
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

const createInvite = async(payload) => {
    const newInvite = await Invite.create(payload);
    if(!newInvite) {
        return [false,"Attention: add farm has failed"];
    }
    return [true,newInvite];
};