const AdminBro = require('admin-bro');
const db = require("../../app/models");

const Finance = db.finances;

const financesNavigation = {
    name: 'Finance Applications',
    icon: 'Finance',
};

const FinanceResource = {
    resource: Finance,
    options:{
        id:'PendingApplications',
        href: ({ h, resource }) => {
            return h.resourceActionUrl({
                resourceId: resource.decorate().id(),
                actionName: 'list?filters.application_status=PENDING',
            })
        },
        listProperties: ['application_uuid','applicant_name','phone_number','loan_amount','bird_capacity','projected_sales','application_status','date_required'],
        filterProperties: ['applicant_name','phone_number','loan_amount','bird_capacity','projected_sales','application_status','date_required'],
        editProperties: [],
        showProperties: ['application_uuid','applicant_name','phone_number','loan_amount','bird_capacity','projected_sales','application_status','date_required'],
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
            ApplicantReview: {
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
        },
    },
    sort:{
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=FinanceResource;