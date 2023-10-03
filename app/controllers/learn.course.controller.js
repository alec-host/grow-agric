const { findUserByPhoneNumber } = require("./utility/common.controller");

const db = require("../models");

const LearnCourses = db.learncourses;

exports.GetLearnCourses = async(req,res) => {
    const phoneNumber = req.params ? req.params.phoneNumber : null;
    if(phoneNumber){
        const user = await findUserByPhoneNumber(phoneNumber);
        if(user){
            const data = await getCourses();
            if(data){
                res.status(200).json({
                    success: true,
                    error: false,
                    data: data,
                    message: "Learning Courses[s] List"
                });
            }else{
                res.status(500).json({
                    success: false,
                    error: true,
                    message: err.message +" "+"Something wrong happened while retrieving users info."                  
                });
            }
        }else{
            res.status(404).json({
                success: false,
                error: true,
                message: "User with id: "+ phoneNumber +" not found."
            });             
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request params not provided."
        });          
    }
};

const getCourses = async() => {
    const course = LearnCourses.findAll({
        where:{is_deleted:0},
        attributes: ['course_uuid','module_uuid','course_name','description','filename','path'],
    }).catch(err =>{
       return false;      
    });

    if(!course){
        return false;
    }else{
        return course;
    }
}; 