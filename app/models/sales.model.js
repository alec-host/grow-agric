
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Sales = sequelize.define("sales", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        sales_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
        },
        farmer_id: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        names: {
            type: DataTypes.STRING(85),
            allowNull: true,
            Comment: 'Unnormalize added column - avoid table join',
        },
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: true,
            Comment: 'Unnormalize added column - avoid table join',        
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
        number_of_animals:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        },
        avearage_weight:{
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'            
        },        
        purchase_price:{
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'            
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        },        
        date_available:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW            
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
            name: 'idx_sales',
            unique: false,
            fields : ['county','farmer_id','farmer_uuid','is_archived'] 
        }]
    });

    return Sales;
};