const { accessToken, refreshToken } = require("../services/JWT");

const common = require("./utility/common.controller");
const db = require("../models");

const User = db.users;
const Farm = db.farms;
const Op = db.Sequelize.Op;

const getPagination = require("./utility/pagination");
const getPagingData = require("./utility/page.data");

module.exports.AddFarm = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {farm_uuid,county,sub_county,ward,number_of_employees,farmer_uuid,item_farmed,is_insured,insurer} = req.body;
        const user = await common.findUserByUUID(farmer_uuid);
        if(user){
            const createPayload = {farm_uuid,county,sub_county,ward,number_of_employees,farmer_uuid,item_farmed,is_insured,insurer};
            const newFarm = await createFarm(createPayload);
            if(newFarm[0]){
                return res.status(201).json({
                    success: true,
                    error: false,
                    message: newFarm[1]
                });                 
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: newFarm[1]
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

const createFarm = async(payload) => {
    const newFarm = await Farm.create(payload);
    if(!newFarm) {
        return [false,"Attention: add farm has failed"];
    }
    return [true,newFarm];
};