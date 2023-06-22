const AdminBro = require('admin-bro');
const db = require("../../app/models");

const Finance = db.finances;

const financesNavigation = {
    name: 'Finance Applications',
    icon: 'Finance',
};

const FinanceFinalizingResource = {
    resource: Finance,
    options:{
        id:'FinanceFilteredByFinalizingStatus',
        href: ({ h, resource }) => {
            return h.resourceActionUrl({
                resourceId: resource.decorate().id(),
                actionName: 'list?filters.application_status=FINALIZING&step=2',
            })
        },        
        listProperties: ['applicant_name','phone_number','loan_amount','projected_sales','financial_sponsor','application_status','date_required'],
        filterProperties: ['applicant_name','phone_number','loan_amount','financial_sponsor','application_status','date_required'],
        editProperties: [],
        showProperties: ['applicant_name','phone_number','loan_amount','projected_sales','financial_sponsor','application_status','date_required'],
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
            Review: {
                actionType: 'record',
                icon: 'Money',
                handler: async(request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: await record.toJSON(record),
                        msg: 'Hello world',
                    }
                    console.log("xiz "+currentAdmin+"   "+request);
                },
                component: AdminBro.bundle("../components/finance-review-component.tsx"),
            },                                
        },
    },
    sort:{
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=FinanceFinalizingResource;