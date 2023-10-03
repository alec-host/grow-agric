const admin = require('firebase-admin');

const serviceAccount = require('./config/admin.firebase.sdk.json');

module.exports.fcmService = async(deviceToken,title,subject,type) =>{
    const app = !admin.apps.length ? admin.initializeApp({credential:admin.credential.cert(serviceAccount),}) : admin.app();
    const messaging = app.messaging();
    let fcm_message = null;
    if(type == 'chat'){
        fcm_message = messagePayload_1(deviceToken,title,subject);
    }else if(type == 'normal'){
        fcm_message = messagePayload_2(deviceToken,title,subject);
    }else{
        fcm_message = messagePayload_3(deviceToken,title,subject);   
    }
    try{
        return await messaging.send(fcm_message).then((resp) =>{
            console.log('Success '+resp);
        }).catch((err) =>{
            console.log('Error '+err);
        });
    }catch(err){
        console.log(err);
    }
};

/* timeToLive: 60 * 60 * 24 */
const notification_options = {
    priority: "high",
    ttl: 3600
};

const messagePayload_1 = (deviceToken,title,subject) =>{
    if(deviceToken !='' && subject != ''){
        const message = {    
                            notification: {
                                title: title,
                                body: subject
                            },
                            data: {
                                key1: "0",
                                key2: "1",
                                key3: subject,
                                key4: "chat"
                            },
                            token: deviceToken,
                            android: notification_options
                        };
        return message;
    }else{
        return null;
    }
};

const messagePayload_2 = (deviceToken,title,subject) =>{
    if(deviceToken !='' && subject != ''){
        const message = {    
                            notification: {
                                title: title,
                                body: subject
                            },
                            data: {
                                key1: "0",
                                key2: title,
                                key3: subject,
                                key4: "normal"
                            },                            
                            token: deviceToken,
                            android: notification_options
                        };
        return message;
    }else{
        return null;
    }
};

const messagePayload_3 = (deviceToken,title,subject) =>{
    if(deviceToken !='' && subject != ''){
        const message = {    
                            notification: {
                                title: title,
                                body: subject
                            },
                            token: deviceToken,
                            android: notification_options
                        };
        return message;
    }else{
        return null;
    }
};