
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
        approved_by:{
            type: DataTypes.STRING(65),
            allowNull: false           
        },          
        reason:{
            type: DataTypes.TEXT,
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
            fields : ['application_id','application_uuid','is_seen'] 
        }]
    });

    return FinanceExtra;
};