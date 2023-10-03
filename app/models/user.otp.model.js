
const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const UserOTP = sequelize.define("user_otps", {  
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        phone_number:{
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true          
        },      
        farmer_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
        },
        otp:{
            type: DataTypes.STRING(7),
            allowNull: false,
            defaultValue: 0
        },
        createdAt:{
            field:'start_date',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW            
        },
        updatedAt:{
            field:'expiry_date',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW            
        },        
        is_deleted:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        }           
    },
    {
        indexes: [{
            name: 'idx_farmer',
            unique: false,
            fields : ['phone_number','farmer_uuid','is_deleted'] 
        }]
    });

    return UserOTP;
};