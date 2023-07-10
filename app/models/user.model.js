
const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const User = sequelize.define("farmers", { 
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },       
        farmer_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true 
        },
        first_name:{
            type: DataTypes.STRING(65),
            allowNull: false
        },        
        last_name:{
            type: DataTypes.STRING(65),
            allowNull: false           
        },
        gender:{
            type: DataTypes.ENUM("Unspecified","Female","Male"),
            defaultValue: "Unspecified"            
        }, 
        id_number: {
            type: DataTypes.STRING(10),
            allowNull: true,
            unique: true  
        },               
        phone_number:{
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true          
        },        
        email:{
            type: DataTypes.STRING(65),
            allowNull: true,
            unique: true 
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0            
        },
        level_of_education:{
            type: DataTypes.ENUM("Unspecified","Primary","Secondary","College","University","Post graduate"),
            defaultValue: "Unspecified"            
        },
        is_married:{
            type: DataTypes.ENUM("Unspecified","Married","Single"),
            defaultValue: "Unspecified"          
        },
        year_of_experience:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            defaultValue: 0           
        },
        home_county:{
            type: DataTypes.STRING(40),
            defaultValue: "Unspecified"         
        },
        financial_sponsor:{
            type: DataTypes.STRING(30),
            allowNull: true,
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
        is_verified:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0            
        },        
        is_active:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1            
        },
        is_deleted:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        }           
    },
    {
        hooks:{
            afterCreate:function(farmers,option){
            }
        },
    },
    {
        indexes: [{
            name: 'idx_farmer',
            unique: false,
            fields : ['farmer_uuid','is_verified','is_active','is_deleted','email','phone_number'] 
        }]
    });

    return User;
};