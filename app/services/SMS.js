const { EMALIFY_BULK_SMS_SENDER_ID, EMALIFY_BULK_SMS_KEY, EMALIFY_BULK_SMS_SECRET } = require("../constants/constants");
const { END_POINT_TOKEN, END_POINT_SEND_SMS } = require("../constants/endpoints");
const { postJsonData, postJsonDataWithAuthorization } = require("../controllers/utility/http.handle");

exports.sendSMS = async(phoneNumber,otp) => {
    const sms = await smsPayload(phoneNumber,otp);
    console.log(sms);
    if(sms){
        try{
            const response = await postJsonData(END_POINT_TOKEN,clientAuth);
            const {access_token} = response.data;
            if(access_token){
                const  emalifyResponse = await postJsonDataWithAuthorization(END_POINT_SEND_SMS,sms,access_token);
                return emalifyResponse.data;
            }else{
                return {success:false,error:true,message:'access token not SET.'};
            }
        }catch(err){
            console.log(err);
            return {success:false,error:true,message:err};
        }
    }else{
        return {success:false,error:true,message:'sms payload not SET.'};
    }
};

const smsPayload = async(phoneNumber,otp) => {
    if(phoneNumber!='' && otp != ''){
        const text = 
            {
                messages:[
                {
                    recipient: phoneNumber,
                    message: 'Your OTP is: ' + otp,
                    messageId: (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2),
                }],
            from: EMALIFY_BULK_SMS_SENDER_ID
        };
        return text;
    }else{
        return null;
    } 
};

const clientAuth = {
    "client_id": EMALIFY_BULK_SMS_KEY,
    "client_secret": EMALIFY_BULK_SMS_SECRET,
    "grant_type": "client_credentials"
};