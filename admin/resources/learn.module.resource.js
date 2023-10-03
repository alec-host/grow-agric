const AdminBro = require('admin-bro');

const fileUploadAction = require('./utils/file-upload.action');

const db = require("../../app/models");

const LearnModule = db.learnmodules;

const learnNavigation = {
    name: 'Leaning Center',
    icon: 'Education',
};

const LearnModuleResource = {
    resource: LearnModule,
    options: {
        parent: learnNavigation,
        listProperties: ['topic','description','createdAt'],
        filterProperties: ['topic'],
        editProperties: ['topic','description'],
        showProperties: ['topic','description','createdAt'],
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
                isAccessible: true,
                isVisible: true,
                fileUpload: {
                    action: fileUploadAction,
                    isAccessible: true
                }
            },              
        },                    
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports = LearnModuleResource;