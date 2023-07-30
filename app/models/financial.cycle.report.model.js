
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const FinancialCycleReport = sequelize.define("finance_cycle_report", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        applicant_name:{
            type: DataTypes.STRING(85),
            allowNull: false,   
        },
        phone_number:{
            type: DataTypes.STRING(15),
            allowNull: true,
        },       
        cycle_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        financial_sponsor:{
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        is_archived:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0            
        }           
    },
    {
        indexes: [{
            name: 'idx_fin_cycle',
            unique: false,
            fields : ['phone_number','is_archived'] 
        }]
    });

    return FinancialCycleReport;
};