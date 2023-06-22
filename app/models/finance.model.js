
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
            type: DataTypes.ENUM("PENDING REVIEW","IN REVIEW","FINALIZING","PO COMPLETED","LOAN APPROVED","FARMING ABOUT TO START","FARMING STARTS"),
            defaultValue: "PENDING REVIEW"  
        },
        farmer_id:{
            type: DataTypes.INTEGER,
            foreignKey: true 
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
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },        
        loan_amount: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        financial_sponsor:{
            type: DataTypes.STRING(30),
            allowNull: true,
            Comment: "Unormalize: column added to avoid use of joins." 
        },      
        current_production:{
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
            fields : ['application_uuid','phone_number','farmer_uuid','is_archived'] 
        }]
    });

    return Finance;
};