const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const FinanceManifest = sequelize.define("finance_manifests", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        application_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false,
        },
        applicant_name:{
            type: DataTypes.STRING(85),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false,
            unique: 'farmer_uuid',
            Comment: "Unormalize: column added to avoid use of joins."     
        }, 
        next_allowed_application_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date('2023-01-01')           
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
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0            
        }           
    },
    {
        indexes: [{
            name: 'idx_manifest',
            unique: false,
            fields : ['application_uuid','farmer_uuid','is_deleted'] 
        }]
    });

    return FinanceManifest;
};