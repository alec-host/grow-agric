
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Invites = sequelize.define("invite", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        invitee_name:{
            type: DataTypes.STRING(65),
            allowNull: false
        },  
        invitee_phone_number:{
            type: DataTypes.STRING(15),
            allowNull: false
        },            
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false
        },         
        farmer_name:{
            type: DataTypes.STRING(65),
            allowNull: false
        }, 
        farmer_phone_number:{
            type: DataTypes.STRING(15),
            allowNull: false
        },  
        invite_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now 
        },
        is_call_made:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "0"         
        },
    },
    {
        indexes: [{
            name: 'idx_progress',
            unique: false,
            fields : ['farmer_uuid','farmer_phone_number','is_call_made'] 
        }]
    });

    return Invites;
};