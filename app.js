var express = require("express");
const db = require("./app/models")
const AdminBro = require('admin-bro')
const AdminBroSequelize = require("@admin-bro/sequelize")
const AdminBroExpress = require("@admin-bro/express")
var app = express();

const User = db.users;
const Farm = db.farms;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//Admin Bro
AdminBro.registerAdapter(AdminBroSequelize);


const usersNavigation = {
    name: 'Farmer Information',
    icon: 'Accessibility',
  }

  const farmsNavigation = {
    name: 'Farmer Information',
    icon: 'Accessibility',
  }  
const AdminBroOptions = {
    resources:[{
        resource: User, 
            options: {
                listProperties: ['farmer_uuid','first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience','createdAt'],
                filterProperties: ['first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience'],
                editProperties: [''],
                showProperties: ['farmer_uuid','first_name','last_name','gender','age','id_number','phone_number','email','is_married','level_of_education','year_of_experience','createdAt'],
                navigation:usersNavigation,
                actions: {
                    delete:{
                        isAccessible: false,
                        isVisible: true,                        
                    },
                    edit: {
                        isAccessible: false,
                        isVisible: true,
                    },
                    new: {
                        isAccessible: false,
                        isVisible: true,
                    },                    
                },
            },
            sort: {
                sortBy: 'updatedAt',
                direction: 'desc',
            },
        },
        {
            resource: Farm,
                options: {
                    navigation: farmsNavigation,
                    actions: {
                        delete:{
                            isAccessible: false,
                            isVisible: true,                        
                        },
                        edit: {
                            isAccessible: false,
                            isVisible: true,
                        },
                        new: {
                            isAccessible: false,
                            isVisible: true,
                        },                    
                    },                    
                },
                sort: {
                    sortBy: 'updatedAt',
                    direction: 'desc',
                },
        },
        ],
    rootPath: '/admin',
    logoutPath: '/xyz-admin/exit',
    loginPath: '/admin/login',
    branding: {
        logo: null,
        companyName: 'GrowAgric',
        softwareBrothers: false ,
    },
}
const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath,router);
//
app.listen(8000, function () {
    console.log('Listening to Port 8000');
});