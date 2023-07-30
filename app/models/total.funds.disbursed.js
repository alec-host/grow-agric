
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const TotalFundsDisbursed = sequelize.define("total_funds_disbursed", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        total_amount: {
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },
        createdAt:{
            field:'date_created',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW            
        },
        is_archived:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0            
        }           
    },
    {
        indexes: [{
            name: 'idx_funds',
            unique: false,
            fields : ['is_archived','date_created'] 
        }]
    });

    return TotalFundsDisbursed;
};