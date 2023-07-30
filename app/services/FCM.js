const admin = require('firebase-admin');

const serviceAccount = require('./config/admin.firebase.sdk.json');

module.exports.pushFCM = async(deviceToken,title,body) =>{
    
    const app = !admin.apps.length ? admin.initializeApp({credential:admin.credential.cert(serviceAccount),}) : admin.app();

    const fcm_message = await messagePayload(deviceToken,title,body);
    admin.messaging().send(fcm_message).then((resp) =>{
        console.log('Success '+resp);
    }).catch((err) =>{
        console.log('Error '+err);
    });
    console.log(fcm_message);
};

const messagePayload = async(deviceToken,title,body) =>{
    if(deviceToken !='' && body != ''){
        const message =
            {
                notification:{
                    title: title,
                    body: body
                },
                token: deviceToken,
            };
        return message;
    }else{
        return null;
    }
};