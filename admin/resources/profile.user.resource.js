const AdminBro = require('admin-bro');
const db = require("../../app/models");
const { encrypt } = require("../../app/services/crypto")

const PortalUser = db.portalusers;

const usersNavigation = {
    name: 'Settings',
    icon: 'Settings',
};

const UserProfileResource = {
    resource: PortalUser,
    options: {
        id:'UserProfile',
        label:'ssssssssss',
        href: ({ h, resource, currentAdmin }) => {
            return h.resourceActionUrl({
                resourceId: resource.decorate().id(),
                actionName: 'list?filters.email='+currentAdmin.email,
            })
        },  
        listProperties: ['first_name','last_name','role','email','password'],
        filterProperties: ['first_name','last_name','role','email'],
        editProperties: [],
        showProperties: ['first_name','last_name','role','email'],
        newProperties: ['first_name','last_name','role','email','password'],
        parent: usersNavigation,
        actions:{
            delete:{
                isAccessible: false,
                isVisible: false,                        
            },
            edit:{
                isAccessible: true,
                isVisible: false,
                before: async(request) =>{
                    if(request.payload?.password){
                        request.payload.password = await encrypt(request.payload.password);
                    }
                    return request;
                },                 
            },
            bulkDelete:{
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
                after: async (response) => {
                    response.record.params.password = '';
                    return response;
                  },
            }, 
            list:{
                actionType: 'resource',
                isAccessible:({ currentAdmin }) => currentAdmin.role === 'admin',
                isVisible: true,              
                after: async (response) => {
                    response.records.forEach((record) => {
                        record.params.password = 'Hidden';
                      });
                      return response;
                },
                component: AdminBro.bundle("../components/profile-component.tsx"),             
            },
        }, 
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=UserProfileResource;