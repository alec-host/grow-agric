const common = require("./utility/common.controller");
const http = require("./utility/http.handle");
const db = require("../models");
const { sendSMS } = require("../services/SMS");

const { FINANCIAL_APPLICATION_MESSAGE_1, FINANCIAL_NOTIFICATION_TITLE } = require("../constants/message.template");

const Finance = db.finances;

exports.AddFinance = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {applicant_name,phone_number,farmer_uuid,loan_amount,number_of_chicks_raised_now,mortality_rate,vaccine_medicine_cost,chick_cost,feed_cost,brooding_cost,projected_sales_price_per_chick,chick_supplier,feed_supplier} = req.body;
        const user = await common.findUserByPhoneNumber(phone_number);
        if(user){
            //-.TODO logic to bar someone from taking a loan until 3month have elapsed.
            const financePayload = 
                    {
                        applicant_name:applicant_name,
                        phone_number:phone_number,
                        farmer_id:user._id,
                        farmer_uuid:farmer_uuid,
                        loan_amount:loan_amount,
                        number_of_chicks_raised_now:number_of_chicks_raised_now,
                        mortality_rate:mortality_rate,
                        vaccine_medicine_cost:vaccine_medicine_cost,
                        chick_cost:chick_cost,
                        feed_cost:feed_cost,
                        brooding_cost:brooding_cost,
                        projected_sales_price_per_chick:projected_sales_price_per_chick
                    };
            const farmSuppliesPayload = {farmer_uuid:farmer_uuid,full_name:user.first_name+' '+user.last_name,phone_number:phone_number,chick_supplier:chick_supplier,feed_supplier:feed_supplier};
            const newFinance = await createFinanceApplication(financePayload);        
            if(newFinance[0]){
                await http.postJsonData("http://localhost:8585/api/v1/users/AddFarmSupplies",farmSuppliesPayload);
                await common.modifyFarmByFarmerUUID(farmer_uuid,{mortality_rate});
                //-.sms.
                //const {status,message} = await sendSMS(phone_number,custom_message); 
                //-fcm.
                console.log('token '+user.push_notification_token);
                const fcmPayload = {
                    user_uuid:farmer_uuid,
                    device_token:user.push_notification_token,
                    title:FINANCIAL_NOTIFICATION_TITLE,
                    subject:FINANCIAL_APPLICATION_MESSAGE_1.replace('{0}',applicant_name)
                };
                //await sendPushNotification(user.push_notification_token,'Financial Application Status',FINANCIAL_APPLICATION_MESSAGE_1.replace('{0}',applicant_name));
                await http.postJsonData("http://localhost:8585/api/v1/users/fcmService",fcmPayload);
                return res.status(201).json({
                    success: true,
                    error: false,
                    message: newFinance[1]
                });            
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: newFinance[1]
                }); 
            }
        }else{
            res.status(404).json({
                success: false,
                error: true,
                message: "User does not exist."
            });              
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        });         
    }
};

const createFinanceApplication = async(payload) => {
    const newFinance = await Finance.create(payload);
    if(!newFinance) {
        return [false,"Attention: add finance has failed"];
    }
    return [true,newFinance];
};