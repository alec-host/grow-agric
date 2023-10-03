
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const FinanceLog = sequelize.define("finance_request_logs", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        application_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
        },
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },
        date_required:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW            
        }  
    },
    {
        indexes: [{
            name: 'idx_finance_log',
            unique: false,
            fields : ['application_uuid','farmer_uuid'] 
        }]
    });

    return FinanceLog;
};