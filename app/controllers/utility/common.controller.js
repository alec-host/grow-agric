const db = require("../../models");

const User = db.users;
const Farm = db.farms;
const AdminUser = db.portalusers;
const HearAboutUs = db.hearaboutus;
const FinanceManifest = db.financemanifest;

const Op = db.Sequelize.Op;

module.exports.findUserByUUID = async(userUUID) => {
    const user = await User.findOne({where:{farmer_uuid:userUUID}}).catch(e => { return false; });
    if(!user) {
        return false;
    }
    return user;
};

module.exports.findUserByPhoneNumber = async(phoneNumber) => {
    const user = await User.findOne({where:{phone_number:phoneNumber}}).catch(e => { return false; });
    if(!user) {
        return false;
    }
    return user;
};

module.exports.findUserByEmail = async(email) => {
    const user = await AdminUser.findOne({where:{email:email}}).catch(e => { return false; });
    if(!user) {
        return false;
    }
    return user;
};

module.exports.getAccountVerifiedCountByPhoneNumber = async(phoneNumber) => {
    const count = await User.count({where:{phone_number:phoneNumber,is_verified:1}});
    return count;  
};

module.exports.modifyUserDataByFarmerUUID = async(userUUID,payload) => {
    const isUpdated = await User.update(payload,{ where:{farmer_uuid:userUUID}}).catch(e => { return false; });
    if(!isUpdated){
        return false;
    }
    return true;
};

module.exports.modifyFarmByFarmerUUID = async(userUUID,payload) => {
    const isUpdated = await Farm.update(payload,{ where:{farmer_uuid:userUUID}}).catch(e => { return false; });
    if(!isUpdated){
        return false;
    }
    return true;
};

module.exports.hearAboutPlatform = async(farmer_uuid) => {
    let hearAbout = {};
    hearAbout = await HearAboutUs.findOne({where:{farmer_uuid:farmer_uuid},attributes: ['platform'],}).catch(e => {return false;});
    console.log("ssssssssssss "+hearAbout.platform);
    if(!hearAbout.platform){
        return 'Unspecified';
    }
    return hearAbout.platform;
};


module.exports.logFinanceRequest = async(payload) => {
    const newLog = await FinanceManifest.create(payload);
};


module.exports.hasExistingLoan = async(farmer_uuid) => {
    const exist = await FinanceManifest.findOne({where:{farmer_uuid:farmer_uuid}}).catch(e => {return [false,null];});
    if(!exist){
        return [false,null];
    }
    return [true,exist];
};

/*

const createFarm = async(payload) => {
    const newFarm = await Farm.create(payload);
    if(!newFarm) {
        return [false,"Attention: add farm has failed"];
    }
    return [true,newFarm];
};
*/