const AdminBro = require('admin-bro');

const db = require("../../app/models");

const Invite = db.invites;

const inviteNavigation = {
    name: 'Referrals',
    icon: 'Settings',
};

const InviteResource = {
    resource: Invite,
    options: { 
        id:'Invitee', 
        listProperties: ['invitee_name','invitee_phone_number','farmer_name','farmer_phone_number','invite_date'],
        filterProperties: ['farmer_name','farmer_phone_number'],
        parent: inviteNavigation,
        actions:{
            delete:{
                isAccessible: false,
                isVisible: false,                        
            },
            edit:{
                isAccessible: false,
                isVisible: false,               
            },
            new:{
                isAccessible: false,
                isVisible: false,               
            },           
            bulkDelete:{
                isAccessible: false,
                isVisible: false,                        
            },
            list:{
                before: async (request, context) => {
                    request.query.perPage = 20;
                    return request;
                }
            }
        }, 
    },
    sort:{
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=InviteResource;