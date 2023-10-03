const AdminBro = require('admin-bro');

const db = require("../../app/models");

const ChatRoom = db.chatrooms;

const chatNavigation = {
    name: 'Chat',
    icon: 'Chat',
};

const ChatRoomResource = {
    resource: ChatRoom,
    options: {
        parent: chatNavigation,
        listProperties: ['full_name'],
        filterProperties: ['full_name'],
        actions: {
            delete:{
                isAccessible: false,
                isVisible: false,                        
            },
            new:{
                isAccessible: false,
                isVisible: false, 
            },
            show:{
                isAccessible: false,
                isVisible: false, 
            },
            edit:{
                isAccessible: false,
                isVisible: false, 
            },
            bulkDelete:{
                isAccessible: false,
                isVisible: false,                        
            },
            list:{
                component: AdminBro.bundle("../components/custom-chat-view-component.tsx"),
            },          
            reply:{
                actionType: 'record',
                icon: 'Chat',
                handler: async(request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: await record.toJSON(record),
                        msg: 'Hello world',
                    }
                },
            }
        },                    
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports = ChatRoomResource;