const AdminBro = require('admin-bro');

const db = require("../../app/models");

const LearnCourse = db.learncourses;

const learnNavigation = {
    name: 'Leaning Center',
    icon: 'Education',
};

const LearnCourseResource = {
    resource: LearnCourse,
    options: {
        parent: learnNavigation,
        listProperties: ['course_uuid','course_name','description','createdAt'],
        filterProperties: ['course_name'],
        editProperties: ['course_uuid','course_name','description'],
        showProperties: ['course_uuid','course_name','description','createdAt'],
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
                isAccessible: true,
                component: AdminBro.bundle("../components/edit-learn-course-component.tsx"),
            },
            new: {
                component: AdminBro.bundle("../components/create-learn-course-component.tsx"),
            }              
        },                    
    },
    sort: {
        sortBy: 'updatedAt',
        direction: 'desc',
    },
};

module.exports = LearnCourseResource;