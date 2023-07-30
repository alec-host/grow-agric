
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const PreferredFeeds = sequelize.define("preferred_farm_supplies", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        farmer_id:{
            type: DataTypes.INTEGER,
            foreignKey: true 
        },
        farmer_uuid:{
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
            allowNull: true           
        },  
        other_feed_supplier:{
            type: DataTypes.STRING(35),
            allowNull: true           
        }
    },
    {
        indexes: [{
            name: 'idx_preferred_supplies',
            unique: false,
            fields : ['farmer_id','farmer_uuid'] 
        }]
    });

    return PreferredFeeds;
};