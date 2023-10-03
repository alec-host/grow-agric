const { accessToken, refreshToken } = require("../services/JWT");

const common = require("./utility/common.controller");
const http = require("./utility/http.handle");
const db = require("../models");

const FarmRecordBook = db.farmrecordbooks;
const Op = db.Sequelize.Op;
const {fn, col } = db.Sequelize;

const getPagination = require("./utility/pagination");
const getPagingData = require("./utility/page.data");

module.exports.AddFarmRecordBook = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {farm_uuid,farmer_uuid,cr,dr,running_balance,description,record_type,notes,entry_date} = req.body;
        const user = await common.findUserByUUID(farmer_uuid);
        if(user){
            const createPayload = 
                    {
                        farm_uuid:farm_uuid,
                        farmer_uuid:farmer_uuid,
                        full_name:user.first_name +" "+user.last_name,
                        cr:cr,
                        dr:dr,
                        running_balance:running_balance,
                        description:description,
                        record_type:record_type,
                        notes:notes,                        
                        entry_date:entry_date
                    };
            const newFarmRecord = await createFarmRecord(createPayload);
            if(newFarmRecord[0]){
                return res.status(201).json({
                    success: true,
                    error: false,
                    message: newFarmRecord[1]
                });                 
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: newFarmRecord[1]
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

const createFarmRecord = async(payload) => {
    const newFarmRecord = await FarmRecordBook.create(payload);
    if(!newFarmRecord) {
        return [false,"Attention: add farm has failed"];
    }
    return [true,newFarmRecord];
};