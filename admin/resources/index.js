const AdminBro = require('admin-bro');
const db = require("../../app/models");

const FarmResource = require('./farm.resource');
const UserResource = require('./user.resource');
const FinancePendingReviewResource = require('./finance.pendingreview.resource');
const FinanceFinalizingResource = require('./finance.finalizing.resource');
const FinanceInReviewResource = require('./finance.inreview.resource');
const FinancePurchaseOrderCompletedResource = require('./finance.pocompleted.resource');
const FinanceApprovedResource = require('./finance.approved.resource');
const FinanceFarmingToStartResource = require('./finance.farmtostart.resource');
const FinanceFarmingStartsResource = require('./finance.farmstarts.resource');
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
        {resource: FinancePendingReviewResource.resource,options:FinancePendingReviewResource.options,sort:FinancePendingReviewResource.sort},
        {resource: FinanceInReviewResource.resource,options:FinanceInReviewResource.options,sort:FinanceInReviewResource.sort},
        {resource: FinanceFinalizingResource.resource,options:FinanceFinalizingResource.options,sort:FinanceFinalizingResource.sort},
        {resource: FinancePurchaseOrderCompletedResource.resource,options:FinancePurchaseOrderCompletedResource.options,sort:FinancePurchaseOrderCompletedResource.sort},
        {resource: FinanceApprovedResource.resource,options:FinanceApprovedResource.options,sort:FinanceApprovedResource.sort},
        {resource: FinanceFarmingToStartResource.resource,options:FinanceFarmingToStartResource.options,sort:FinanceFarmingToStartResource.sort},
        {resource: FinanceFarmingStartsResource.resource,options:FinanceFarmingStartsResource.options,sort:FinanceFarmingStartsResource.sort},
        {resource: UserResource.resource,options:UserResource.options,sort:UserResource.sort},
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
                    FinanceFilteredByPendingReviewStatus:{
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
                    FinanceFilteredByInReviewStatus:{
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
                    FinanceFilteredByFinalizingStatus:{
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
                    FinanceFilteredByPurchaseOrderCompletionStatus:{
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
                    FinanceFilteredByApproveStatus:{
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
                    FinanceFilteredByFarmsToStartStatus:{
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
                    FinanceFilteredByFarmingStartsStatus:{
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
            labels: {
                sales: 'Chicks for Sale',
                FinanceFilteredByPendingReviewStatus: 'Stage 1. Pending Review',
                FinanceFilteredByInReviewStatus: 'Stage 2. In Review',
                FinanceFilteredByFinalizingStatus: 'Stage 3. Finalizing',
                FinanceFilteredByPurchaseOrderCompletionStatus: 'Stage 4. PO Completed',
                FinanceFilteredByApproveStatus: 'Stage 5. Loans Approved',
                FinanceFilteredByFarmsToStartStatus: 'Stage 6. Farming To Start',
                FinanceFilteredByFarmingStartsStatus: 'Stage 7. Farming Starts'
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