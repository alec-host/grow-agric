const AdminBro = require('admin-bro');

const db = require("../../app/models");

const FarmChallenge = db.farmchallenges;

const farmsNavigation = {
    name: 'Farm Info',
    icon: 'Building',
};

const FarmChallengeResource = {
    resource: FarmChallenge,
    options: {
        parent: farmsNavigation,
        listProperties: ['farmer_uuid','full_name','phone_number','challenges_faced','other_challenges'],
        filterProperties: ['farmer_uuid','full_name','phone_number'],
        editProperties: [],
        showProperties: ['farmer_uuid','full_name','phone_number','challenges_faced','other_challenges'],
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

module.exports = FarmChallengeResource;