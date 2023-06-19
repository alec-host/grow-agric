const AdminBro = require('admin-bro');
const db = require("../../app/models");

const Farm = db.farms;

const farmsNavigation = {
    name: 'Farm Information',
    icon: 'Building',
};


const FarmResource = {
    resource: Farm,
    options: {
        parent: farmsNavigation,
        actions: {
            PDF: {
                actionsType: 'resource',
                icon: 'GeneratePdf',
                handler: (request,response,context) =>  {
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        url: pdfgenerator(record.toJSON(currentAdmin)),
                        msg: "help me",
                    }
                },
                component: false,
            },
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
        },                    
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports = FarmResource;