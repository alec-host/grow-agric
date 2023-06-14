
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const FarmChallenge = sequelize.define("farm_challenges", {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        farm_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        farmer_uuid: {
            type: DataTypes.STRING(45),
            allowNull: false            
        },       
        challenges_faced: {
            type: DataTypes.STRING(65),
            allowNull: false            
        },
        other_challenges: {
            type: DataTypes.STRING(45),
            allowNull: false            
        },
        is_deleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        }           
    },
    {
        createdAt: false,
        updatedAt: false,
        indexes: [{
            name: 'idx_farm_challenges',
            unique: false,
            fields : ['farm_id','is_deleted'] 
        }]
    });

    return FarmChallenge;
};