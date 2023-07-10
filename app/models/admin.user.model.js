
const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const PortalUser = sequelize.define("portal_users", { 
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        user_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true 
        },
        first_name:{
            type: DataTypes.STRING(50),
            allowNull: false
        },        
        last_name:{
            type: DataTypes.STRING(50),
            allowNull: false           
        },    
        role:{
            type: DataTypes.STRING(30),
            allowNull: false           
        },                    
        email:{
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true          
        },              
        password:{
            type: DataTypes.STRING(65),
            allowNull: true
        },
        token:{
            type: DataTypes.STRING(350),
            allowNull: true
        },
        createdAt:{
            field:'date_created',
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updatedAt:{
            field:'date_modified',
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW    
        },        
        is_suspended:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1            
        }          
    },
    {
        indexes: [{
            name: 'idx_portalUsers',
            unique: false,
            fields : ['user_uuid','role','is_suspended'] 
        }]
    });

    return PortalUser;
};