const AdminBro = require('admin-bro');
const db = require("../../app/models");
const { encrypt } = require("../../app/services/crypto")

const PortalUser = db.portalusers;

const usersNavigation = {
    name: 'Settings',
    icon: 'Settings',
};

const PortalUserResource = {
    resource: PortalUser,
    options: {
        id:'PortalUsers',
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
                isAccessible: ({currentAdmin}) => {
                    if(currentAdmin.role == 'admin'){return true}else{return false}},
                isVisible: false,
            },
            bulkDelete:{
                isAccessible: false,
                isVisible: false,                        
            },
            new:{
                actionType: 'resource',
                icon: 'User',
                isAccessible:({ currentAdmin }) => currentAdmin.role === 'admin',
                isVisible: true,
                before: async(request) =>{
                    if(request.payload?.password){
                        request.payload.password = await encrypt(request.payload.password);
                    }
                    return request;
                },
                component: AdminBro.bundle("../components/create-portal-user-component.tsx"),
            },
            show:{
                after: async (response) => {
                    response.record.params.password = '';
                    return response;
                  },
            },
            list:{
                after: async (response) => {
                    response.records.forEach((record) => {
                        record.params.password = 'Hidden';
                      });
                      return response;
                }
            }        
        }, 
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=PortalUserResource;