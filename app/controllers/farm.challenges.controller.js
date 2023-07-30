const db = require("../models");
const common = require("./utility/common.controller");

const FarmChallenge = db.farmchallenges;

exports.AddFarmChallenge = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {farmer_uuid,phone_number,challenges_faced,other_challenges} = req.body;
        const user = await common.findUserByPhoneNumber(phone_number);
        if(user){
            const farmChallengePayload = 
                {
                    farm_id:user._id,
                    farmer_uuid:farmer_uuid,
                    phone_number:phone_number,
                    challenges_faced:challenges_faced,
                    other_challenges:other_challenges
                };
            const newChallenge = await createFarmChallenge(farmChallengePayload);
            if(newChallenge[0]){
                return res.status(201).json({
                    success: true,
                    error: false,
                    message: newChallenge[1]
                }); 
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: newChallenge[1]
                }); 
            }
        }else{
            res.status(404).json({
                success: false,
                error: true,
                message: "User does not exist."
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

const createFarmChallenge = async(payload) => {
    const newChallenge = await FarmChallenge.create(payload);
    if(!newChallenge) {
        return [false,"Attention: add farm challenge has failed"];
    }
    return [true,newChallenge];
};