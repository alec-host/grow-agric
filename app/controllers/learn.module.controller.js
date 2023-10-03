const { findUserByPhoneNumber } = require("./utility/common.controller");

const db = require("../models");

const LearnModules = db.learnmodules;
const Op = db.Sequelize.Op;
const {fn, col } = db.Sequelize;

exports.GetLearnModules = async(req,res) => {
    const phoneNumber = req.params ? req.params.phoneNumber : null;
    if(phoneNumber){
        const user = await findUserByPhoneNumber(phoneNumber);
        if(user){
            const data = await getModules();
            console.log(data);
            if(data){
                res.status(200).json({
                    success: true,
                    error: false,
                    data: data,
                    message: "Learning Module[s] List"
                });
            }else{
                res.status(500).json({
                    success: false,
                    error: true,
                    message: err.message +" "+"Something wrong happened while retrieving users info."                  
                });
            }
        }else{
            res.status(404).json({
                success: false,
                error: true,
                message: "User with id: "+ phoneNumber +" not found."
            });             
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request params not provided."
        });          
    }
};

const getModules = async() => {
    const module = LearnModules.findAll({
        where:{is_deleted:0},
        attributes: ['module_uuid','topic','description','is_deleted'],
    }).catch(err =>{
       return false;      
    });

    if(!module){
        return false;
    }else{
        return module;
    }
}; 