const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const ChatRoomMessage = sequelize.define("chat_room_messages", {
        _id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        chat_uuid:{
            type: DataTypes.STRING(65),
            allowNull: true,
            comment: 'Unormalize: column added to avoid use of joins.',
        }, 
        farmer_uuid:{
            type: DataTypes.STRING(65),
            allowNull: true,
            comment: 'Unormalize: column added to avoid use of joins.',
        },
        message:{
            type: DataTypes.STRING(160),
            allowNull: false           
        },
        message_origin:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '0 - farmer, 1 - admin',        
        },       
        is_deleted:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0          
        }
    },
    {
        indexes: [{
            name: 'idx_chat',
            unique: false,
            fields : ['chat_uuid','farmer_uuid','is_deleted'] 
        }]
    });

    return ChatRoomMessage;
};