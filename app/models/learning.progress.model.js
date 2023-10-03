
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const LearnProgress = sequelize.define("learning_progress", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        course_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false,
            unique:'course_uuid'
        }, 
        course_name:{
            type: DataTypes.STRING(85),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },        
        name:{
            type: DataTypes.STRING(85),
            allowNull: false,
            Comment: "Unormalize: column added to avoid use of joins."     
        },        
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: false
        },         
        total_pages:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0              
        },
        current_page:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0        
        }, 
        start_time:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now         
        },
        end_time:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now         
        },
        is_archived:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        indexes: [{
            name: 'idx_progress',
            unique: false,
            fields : ['course_uuid','farmer_uuid','is_archived'] 
        }]
    });

    return LearnProgress;
};