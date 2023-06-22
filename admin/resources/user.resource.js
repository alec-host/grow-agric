const db = require("../../app/models");

const User = db.users;

const usersNavigation = {
    name: 'Farmer Info',
    icon: 'User',
};

const UserResource = {
    resource: User,
    options: {
        listProperties: ['first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience','financial_sponsor','createdAt'],
        filterProperties: ['first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience','financial_sponsor'],
        editProperties: [],
        showProperties: ['first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience','financial_sponsor','createdAt'],
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