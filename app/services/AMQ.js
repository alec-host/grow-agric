const amqp = require('amqplib');
const { CLOUDAMQP_URL } = require('../constants/constants');

module.exports.publisherAMQP = async(message,channel_name) => {
    try{
        const channel = await amqpConnection(CLOUDAMQP_URL,channel_name);

        if(channel[0]){
            channel[0].sendToQueue(channel_name,Buffer.from(message),{persistent: true});
            await amqpCloseConnection(channel);
            return[true,'Message published to CLOUDAMQP: ' + message];
        }else{
            await amqpCloseConnection(channel);
            return[false,'Error connect to CLOUDAMQP: ' + channel[1]];
        }
    }catch(err){
        await amqpCloseConnection(channel);
        return[false,'Error publishing message to CLOUDAMQP: ' + err];
    }
};

module.exports.consumerAMQP = async(channel_name) => {
    try{
        const channel = await amqpConnection(CLOUDAMQP_URL,channel_name);
        
        if(channel[0]){
            
            console.log('Waiting for messages from CLOUDAMQP...');

            const queueInfo = await channel[0].checkQueue(channel_name);
            if(queueInfo.messageCount > 0){
                channel[0].consume(channel_name,(message) =>{
                    if(message){
                        console.log('Received message', message.content.toString());
                        channel[0].ack(message);
                    }
                });
                await amqpCloseConnection(channel);
                return[true,'Message received successfully'];
            }else{
                await amqpCloseConnection(channel);
                return[true,'No messages queued'];
            }
        }else{
            await amqpCloseConnection(channel);
            return[false,'Error connect to CLOUDAMQP: ' + channel[1]];
        }
    }catch(err){
        return [false,'Error consuming message from CLOUDAMQP '+err];
    }
};

const amqpConnection = async(url,channel_name) => {
    try{
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(channel_name,{durable:true});
        return [channel,'success',connection];
    }catch(err){
        return [false,err,connection];
    }
};

const amqpCloseConnection = async(channel) => {
    setTimeout(async () => {
        await channel[0].close();
        await channel[2].close(); 
    },1500);   
};