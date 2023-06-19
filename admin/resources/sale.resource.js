const AdminBro = require('admin-bro');
const db = require("../../app/models");

const Sale = db.sales;

const salessNavigation = {
    name: 'Sales Information',
    icon: 'Market',
};

const SaleResource = {
    resource: Sale,
    options:{
        /*
        id:'PendingApplications',
        href: ({ h, resource }) => {
            return h.resourceActionUrl({
                resourceId: resource.decorate().id(),
                actionName: 'list?filters.application_status=PENDING',
            })
        },
        */
        listProperties: ['names','avearage_weight','createdAt','number_of_animals','date_available','purchase_price','quantity','updatedAt','county','sub_county','ward'],
        filterProperties: ['date_available','purchase_price','quantity','updatedAt','county','sub_county','ward'],
        editProperties: [],
        showProperties: ['sales_uuid','avearage_weight','createdAt','number_of_animals','date_available','purchase_price','quantity','updatedAt','county','sub_county','ward'],
        parent: salessNavigation,
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
            SalesUpdate: {
                actionType: 'record',
                icon: 'Coin',
                handler: async(request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: await record.toJSON(record),
                        msg: 'Hello world',
                    }
                },
                component: AdminBro.bundle("../components/sale-update-component.tsx"),
            },           
        },
    },
    sort:{
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports=SaleResource;