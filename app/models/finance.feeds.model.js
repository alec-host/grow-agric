
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const FinanceFeeds = sequelize.define("finance_application_feeds", {
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
        chick_supplier:{
            type: DataTypes.STRING(35),
            allowNull: false           
        },
        feed_supplier:{
            type: DataTypes.STRING(35),
            allowNull: false           
        },
        other_chick_supplier:{
            type: DataTypes.STRING(35),
            allowNull: false           
        },  
        other_feed_supplier:{
            type: DataTypes.STRING(35),
            allowNull: false           
        }
    },
    {
        indexes: [{
            name: 'idx_fin_feed',
            unique: false,
            fields : ['application_id','application_uuid'] 
        }]
    });

    return FinanceFeeds;
};