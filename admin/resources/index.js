const AdminBro = require('admin-bro');
const db = require("../../app/models");

const FarmResource = require('./farm.resource');
const UserResource = require('./user.resource');
const FinanceResource = require('./finance.resource');
const FinanceDeclinedResource = require('./finance.d.resource');
const FinanceApprovedResource = require('./finance.a.resource');
const SaleResource = require('./sale.resource');

const User = db.users;
const Farm = db.farms;
const Finance = db.finances;
const Sale = db.sales;


const nav = {
    name: 'TEST PANEL',
    icon: 'Building',
}; 

const UserResourceTest = {
    resource: User,
    options: {
        id: 'TestResources',
        parent:nav,
        actions: {
            FinanceReview: {
                actionType: 'record',
                icon: 'Money',
                handler: async(request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: await record.toJSON(record),
                        msg: 'Hello world',
                    }
                },
                component: AdminBro.bundle("../components/finance-review-component.tsx"),
            },
            delete:{
                isAccessible: false,
                isVisible: false,                        
            },
            edit: {
                isAccessible: true,
                isVisible: false,
            },
            new: {
                isAccessible: false,
                isVisible: false,
            },
        },
        },
    };

const AdminBroOptions = {
    resources:[
        {resource: UserResource.resource,options:UserResource.options,sort:UserResource.sort},
        {resource: FinanceResource.resource,options:FinanceResource.options,sort:FinanceResource.sort},
        {resource: FinanceApprovedResource.resource,options:FinanceApprovedResource.options,sort:FinanceApprovedResource.sort},
        {resource: FinanceDeclinedResource.resource,options:FinanceDeclinedResource.options,sort:FinanceDeclinedResource.sort},
        {resource: FarmResource.resource,options:FarmResource.options,sort:FarmResource.sort},
        {resource: SaleResource.resource,options:SaleResource.options,sort:SaleResource.sort},
        {resource: UserResourceTest.resource,options:UserResourceTest.options},
        ],
    rootPath: '/admin',
    logoutPath: '/admin/signout',
    loginPath: '/admin/login',
    branding: {
        logo: '/images/growagrict.png',
        companyName: 'GrowAgric',
        softwareBrothers: false ,
        favicon: '/images/favicon.png',
    },
    locale: {
        translations: {
            messages: {
                loginWelcome: 'Admin Panel'
            },
            labels: {
                loginWelcome: 'GrowAgric',
            },
            resources: {
                Finance,
                    PendingApplications:{
                        properties:{
                            application_uuid: 'UUID',
                            application_status: 'Status',
                            applicant_name: 'Name',
                            phone_number: 'Phone Number',
                        },
                        messages:{
                            noRecordsInResource: 'No Record[s] to display.'
                        }
                    },
                    ApprovedApplications:{
                        properties:{
                            application_uuid: 'UUID',
                            application_status: 'Status',
                            applicant_name: 'Name',
                            phone_number: 'Phone Number',
                        },
                        messages:{
                            noRecordsInResource: 'No Record[s] to display.'
                        }
                    },                     
                    RejectedApplications:{
                        properties:{
                            application_uuid: 'UUID',
                            application_status: 'Status',
                            applicant_name: 'Name',
                            phone_number: 'Phone Number',
                        },
                        messages:{
                            noRecordsInResource: 'No Record[s] to display.'
                        }
                    },                                  
                User,
                    farmers:{
                        properties:{
                            farmer_uuid: 'UUID',
                            is_married: 'Married',
                            id_number: 'ID Number',
                            year_of_experience: 'Years of Experience',
                            createdAt: 'Registration Date',
                        },
                        messages:{
                            noRecordsInResource: 'No Farmer\'s data to display.'
                        }
                    },
                    TestResources:{
                        properties:{
                            farmer_uuid: 'UUID',
                            is_married: 'Married',
                            id_number: 'ID Number',
                            year_of_experience: 'Years of Experience',
                            createdAt: 'Registration Date',
                        },
                        messages:{
                            noRecordsInResource: 'No Farmer\'s data to display.'
                        }
                    },                    
                Farm,
                    farms: {
                        properties: {

                        },
                        messages: {
                            noRecordsInResource: 'No Farm\'s data to display.'
                        },
                    },
                Sale,
                    sales: {
                        properties: {
                            sales_uuid: 'UUID',
                            names: 'Farmer',
                            number_of_animals: 'No. of chicks',
                            createdAt: 'Date Created',
                            UpdatedAt: 'Purchase Date',
                        },
                        messages: {
                            noRecordsInResource: 'No Sales\'s data to display.'
                        },
                    },
            },
        },
    },
    assets: {
        styles: ['/css/sidebarcustom.css']
    },
};

module.exports = {
    AdminBroOptions
};