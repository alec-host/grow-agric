const db = require("../../app/models");

const User = db.users;

const usersNavigation = {
    name: 'Farmer Information',
    icon: 'User',
};

const UserResource = {
    resource: User,
    options: {
        listProperties: ['farmer_uuid','first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience','createdAt'],
        filterProperties: ['first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience'],
        editProperties: [],
        showProperties: ['farmer_uuid','first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience','createdAt'],
        parent: usersNavigation,
        actions: {
            delete:{
                isAccessible: false,
                isVisible: false,                        
            },
            edit: {
                isAccessible: false,
                isVisible: false,
            },
            new: {
                isAccessible: false,
                isVisible: false,
            },
            bulkDelete:{
                isAccessible: false,
                isVisible: false,                        
            }, 
        }, 
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=UserResource;