
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Finance = sequelize.define("finance_applications", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        application_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
        },
        application_status:{
            type: DataTypes.ENUM("APPROVED","DECLINED","PENDING"),
            defaultValue: "PENDING"  
        },
        farmer_id:{
            type: DataTypes.INTEGER,
            foreignKey: true 
        },      
        applicant_name:{
            type: DataTypes.STRING(85),
            allowNull: false            
        },
        phone_number:{
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        loan_amount: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        bird_capacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },       
        current_production:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        },
        mortality_rate:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        },
        vaccine_medicine_cost:{
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'           
        },
        chick_cost:{
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'            
        },
        feed_cost:{
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'            
        },  
        broad_cost:{
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'            
        },  
        projected_sales:{
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'            
        },
        date_required:{
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
            name: 'idx_fin',
            unique: false,
            fields : ['application_uuid','phone_number','is_archived'] 
        }]
    });

    return Finance;
};