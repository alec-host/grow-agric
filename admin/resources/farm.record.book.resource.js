const AdminBro = require('admin-bro');

const db = require("../../app/models");

const FarmRecordBook = db.farmrecordbooks;

const farmRecordsNavigation = {
    name: 'Farm Records',
    icon: 'Building',
};

const FarmRecordBooksResource = {
    resource: FarmRecordBook,
    options: {
        parent: farmRecordsNavigation,
        listProperties: ['full_name','cr','dr','running_balance','description','record_type','entry_date'],
        filterProperties: ['full_name','record_type'],
        editProperties: [],
        showProperties: ['full_name','cr','dr','running_balance','description','record_type','entry_date'],
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

module.exports = FarmRecordBooksResource;