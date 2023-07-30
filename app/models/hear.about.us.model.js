
const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const HearAboutUs = sequelize.define("hear_about_us", { 
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        farmer_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true 
        },
        full_name:{
            type: DataTypes.STRING(100),
            allowNull: false
        },        
        phone_number:{
            type: DataTypes.STRING(15),
            allowNull: false           
        },    
        media_channel:{
            type: DataTypes.STRING(35),
            allowNull: false           
        },                    
        createdAt:{
            field:'date_created',
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },       
        is_archive:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1            
        }          
    },
    {
        indexes: [{
            name: 'idx_hearAboutUs',
            unique: false,
            fields : ['farmer_uuid','phone_number','is_archive'] 
        }]
    });

    return HearAboutUs;
};