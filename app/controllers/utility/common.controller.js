const db = require("../../models");

const User = db.users;
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