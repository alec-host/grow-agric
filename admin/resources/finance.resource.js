const AdminBro = require('admin-bro');
const db = require("../../app/models");

const Finance = db.finances;

const financesNavigation = {
    name: 'Finance Request(s)',
    icon: 'Finance',
};

const FinanceResource = {
    resource: Finance,
    options:{
        /*id:'AllRequests', */
        /*      
        href: ({ h, resource }) => {
            return h.resourceActionUrl({
                resourceId: resource.decorate().id(),
                search: '?filters.application_status=PENDING REVIEW&step=0',
            })
        },
        */
        listProperties: ['applicant_name','phone_number','loan_amount','chick_cost','feed_cost','brooding_cost','vaccine_medicine_cost','financial_sponsor','application_status','date_required','createdAt'],
        filterProperties: ['applicant_name','phone_number','financial_sponsor','application_status','date_required','createdAt'],
        editProperties: [],
        showProperties: ['applicant_name','phone_number','loan_amount','chick_cost','feed_cost','brooding_cost','vaccine_medicine_cost','financial_sponsor','application_status','date_required','createdAt'],
        parent: financesNavigation,
        actions:{
            delete:{
                isAccessible: false,
                isVisible: false,                        
            },
            edit:{
                isAccessible: true,
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
            /*             
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
            */          
        },
    },
    sort:{
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=FinanceResource;