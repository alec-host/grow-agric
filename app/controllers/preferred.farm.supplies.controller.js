const db = require("../models");

const PreferredFarmSupplies = db.preferredfarmsupplies;

exports.AddFarmSupplies = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {phone_number,chick_supplier,feed_supplier,other_chick_supplier,other_feed_supplier} = req.body;
        const user = await common.findUserByPhoneNumber(phone_number);
        if(user){
            const farmSuppliesPayload = 
                    {
                        farmer_id:user._id,
                        farmer_uuid:user.farmer_uuid,
                        chick_supplier:chick_supplier,
                        feed_supplier:feed_supplier,
                        other_chick_supplier:other_chick_supplier,
                        other_feed_supplier:other_feed_supplier
                    };
            const newFarmSupplies = await createFarmPreferredSupplies(farmSuppliesPayload);
            if(newFarmSupplies[0]){
                return res.status(201).json({
                    success: true,
                    error: false,
                    message: newFarmSupplies[1]
                });     
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: newFarmSupplies[1]
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

const createFarmPreferredSupplies = async(payload) => {
    const newFarmSupplies = await PreferredFarmSupplies.create(payload);
    if(!newFarmSupplies) {
        return [false,"Attention: add finance has failed"];
    }
    return [true,newFarmSupplies];
};