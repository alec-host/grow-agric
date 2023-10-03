const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const LearnCourses = sequelize.define("learning_courses", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        course_uuid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        }, 
        module_id:{
            type: DataTypes.INTEGER,
            foreignKey: true 
        },
        module_uuid:{
            type: DataTypes.STRING(65),
            allowNull: true,
            comment: 'Unormalize: column added to avoid use of joins.',
        }, 
        course_name:{
            type: DataTypes.STRING(50),
            allowNull: false           
        },
        description:{
            type: DataTypes.STRING(150),
            allowNull: false           
        },
        filename:{
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: 'uniqueTag' 
        },
        path:{
            type: DataTypes.STRING(100),
            allowNull: true           
        },         
        is_deleted:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0          
        }
    },
    {
        indexes: [{
            name: 'idx_courses',
            unique: false,
            fields : ['course_uuid','is_deleted'] 
        }]
    });

    return LearnCourses;
};