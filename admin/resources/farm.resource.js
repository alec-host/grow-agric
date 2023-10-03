const AdminBro = require('admin-bro');

const db = require("../../app/models");

const Farm = db.farms;

const farmsNavigation = {
    name: 'Farm Info',
    icon: 'Building',
};

const FarmResource = {
    resource: Farm,
    options: {
        parent: farmsNavigation,
        listProperties: ['farm_uuid','county','sub_county','item_farmed','number_of_employees','bird_house_capacity','mortality_rate','is_insured','createdAt'],
        filterProperties: ['county','sub_county','item_farmed','is_insured','createdAt'],
        editProperties: [],
        showProperties: ['farm_uuid','county','sub_county','item_farmed','number_of_employees','bird_house_capacity','mortality_rate','is_insured','createdAt'],
        actions: {
            PDF: {
                actionsType: 'resource',
                icon: 'GeneratePdf',
                handler: (request,response,context) =>  {
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        url: pdfgenerator(record.toJSON()),
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
            }              
        },                    
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports = FarmResource;