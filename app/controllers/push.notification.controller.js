const { pushFCM } = require("../services/FCM");
const { findUserByUUID } = require("./utility/common.controller");

module.exports.sendPushNotification = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {user_uuid,device_token,title,subject} = req.body;
        const user = await findUserByUUID(user_uuid);
        if(user){ 
            await pushFCM(device_token,title,subject);
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