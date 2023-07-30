const AdminBro = require('admin-bro');
const db = require("../../app/models");

const FinanceExtra = db.financeextras;

const financesNavigation = {
    name: 'Finance Request(s)',
    icon: 'Finance',
};

const FinanceExtraResource = {
    resource: FinanceExtra,
    options:{
        id:'Logs',
        /*   
        href: ({ h, resource }) => {
            return h.resourceActionUrl({
                resourceId: resource.decorate().id(),
                search: '?filters.application_status=PENDING REVIEW&step=0',
            })
        },
        */
        listProperties: ['application_uuid','loan_amount','applicant_name','phone_number','reason','approved_by','createdAt'],
        filterProperties: ['applicant_name','phone_number','approved_by'],
        editProperties: [],
        showProperties: ['application_uuid','loan_amount','applicant_name','phone_number','reason','approved_by','createdAt'],
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
                isAccessible: true,
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

module.exports=FinanceExtraResource;