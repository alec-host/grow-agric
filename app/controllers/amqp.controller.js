const { QUEUE_NAME_NOTIFICATION } = require("../constants/constants");
const { publisherAMQP, consumerAMQP } = require("../services/AMQ");

exports.cloudAmqPublisher = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {user_uuid,device_token,title,subject} = req.body;
        const response = await publisherAMQP(JSON.stringify(req.body),QUEUE_NAME_NOTIFICATION);
        if(response[0]){
            res.status(200).json({
                success: true,
                error: false,
                message: response[1]
            }); 
        }else{
            res.status(500).json({
                success: false,
                error: true,
                message: response[1]
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

exports.cloudAmqConsumer = async(req,res) => {
    const { channel_name } = req.query;
    console.log(channel_name);
    //const channel_name = req.params ? req.params.channel_name : "";
    if(channel_name.length !== 0){
        const response = await consumerAMQP(channel_name);
        if(response[0]){
            res.status(200).json({
                success: true,
                error: false,
                message: response[1]
            });             
        }else{
            res.status(500).json({
                success: false,
                error: true,
                message: response[1]
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