const AdminBro = require('admin-bro');
const db = require("../../app/models");

const Finance = db.finances;

const financesNavigation = {
    name: 'Finance Applications',
    icon: 'Finance',
};

const FinanceFarmingToStartResource = {
    resource: Finance,
    options:{
        id:'FinanceFilteredByFarmsToStartStatus',
        href: ({ h, resource }) => {
            return h.resourceActionUrl({
                resourceId: resource.decorate().id(),
                actionName: 'list?filters.application_status=FARMING TO START&step=5',
            })
        },        
        listProperties: ['applicant_name','phone_number','loan_amount','projected_sales_price_per_chick','financial_sponsor','application_status','date_required'],
        filterProperties: ['applicant_name','phone_number','loan_amount','financial_sponsor','application_status','date_required'],
        editProperties: [],
        showProperties: ['applicant_name','phone_number','loan_amount','projected_sales_price_per_chick','financial_sponsor','application_status','date_required'],
        parent: financesNavigation,
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
            list: {
                isAccessible: true,
                isVisible: true,               
            },                      
        },
    },
    sort:{
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=FinanceFarmingToStartResource;