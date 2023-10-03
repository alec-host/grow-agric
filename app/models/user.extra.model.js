const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const UserExtra = sequelize.define("farmer_extras", {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        farmer_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }, 
        farmer_uuid: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },        
        agent_name: {
            type: DataTypes.STRING(80),
            allowNull: true,
            defaultValue: "Nil"
        },
        platform: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: "Nil"
        },
        county: {
            type: DataTypes.STRING(50),
            allowNull: true, 
            defaultValue: "Nil"       
        }, 
        constituency: {
            type: DataTypes.STRING(50),
            allowNull: true, 
            defaultValue: "Nil"       
        },
        nominated_financial_sponsor: {
            type: DataTypes.STRING(20),
            allowNull: true, 
            defaultValue: "Nil"       
        }     
    },
    { 
        createdAt: false,
        updatedAt: false,
        indexes: [{
            name: 'idx_farmer',
            unique: false,
            fields : ['farmer_uuid']
        }]    
    },
    );

    return UserExtra;
};