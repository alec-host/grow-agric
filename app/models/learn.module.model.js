
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const LearnModules = sequelize.define("learning_modules", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        module_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
        }, 
        topic:{
            type: DataTypes.STRING(35),
            allowNull: false           
        },
        description:{
            type: DataTypes.STRING(35),
            allowNull: false           
        }, 
        is_deleted:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0          
        }
    },
    {
        indexes: [{
            name: 'idx_modules',
            unique: false,
            fields : ['module_uuid','is_deleted'] 
        }]
    });

    return LearnModules;
};