
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const FinanceExtra = sequelize.define("finance_application_extras", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        application_id:{
            type: DataTypes.INTEGER,
            foreignKey: true 
        },
        application_uuid:{
            type: DataTypes.STRING(65),
            allowNull: true,
        },
        applicant_name:{
            type: DataTypes.STRING(85),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },
        phone_number:{
            type: DataTypes.STRING(15),
            allowNull: true,
            Comment: "Unormalize: column added to avoid use of joins." 
        },   
        loan_amount: {
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },        
        reason:{
            type: DataTypes.TEXT,
            allowNull: false           
        },
        approved_by:{
            type: DataTypes.STRING(65),
            allowNull: false           
        },
        is_seen:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0 
        }   
    },
    {
        indexes: [{
            name: 'idx_fin_extra',
            unique: false,
            fields : ['application_id','application_uuid','is_seen','phone_number'] 
        }]
    });

    return FinanceExtra;
};