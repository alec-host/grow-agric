const { fcmService } = require("../services/FCM");
const { findUserByUUID } = require("./utility/common.controller");

module.exports.sendFirebaseMessage = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {user_uuid,device_token,title,subject,type} = req.body;
        const user = await findUserByUUID(user_uuid);
        if(user){ 
            await fcmService(device_token,title,subject,type);
            return res.status(200).json({
                success: true,
                error: false,
                message: "Dispatch successful." 
            });
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