
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const FarmRecordBook = sequelize.define("farm_record_books", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        transaction_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
        },
        farm_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false,
        },
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },    
        full_name:{
            type: DataTypes.STRING(85),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },
        cr: {
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },
        dr: {
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },
        running_balance: {
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },        
        description:{
            type: DataTypes.STRING(200),
            allowNull: true,
        },    
        record_type:{
            type: DataTypes.STRING(20),
            allowNull: true,
        }, 
        notes:{
            type: DataTypes.STRING(160),
            allowNull: true,
        },   
        entry_date:{
            type: DataTypes.STRING(160),
            allowNull: true,
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
            name: 'idx_book',
            unique: false,
            fields : ['farm_uuid','record_type','farmer_uuid','is_deleted'] 
        }]
    });

    return FarmRecordBook;
};