
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Farm = sequelize.define("farms", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        farm_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
        },
        county:{
            type: DataTypes.STRING(45),
            allowNull: false            
        },
        sub_county:{
            type: DataTypes.STRING(45),
            allowNull: false            
        },
        ward:{
            type: DataTypes.STRING(45),
            allowNull: false            
        },        
        number_of_employees:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        },
        farmer_id: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        item_farmed:{
            type: DataTypes.STRING(25),
            allowNull: false           
        },
        is_insured:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        },
        insurer:{
            type: DataTypes.STRING(30),
            allowNull: false,            
        },
        createdAt:{
            field:'date_created',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW            
        },
        updatedAt:{
            field:'date_modified',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW            
        },
        is_deleted:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        }           
    },
    {
        indexes: [{
            name: 'idx_farm',
            unique: false,
            fields : ['farm_uuid','county','farmer_id','is_insured','is_deleted'] 
        }]
    });

    return Farm;
};