const amqp = require('amqplib/callback_api')
require('dotenv').config()

async function publisher(queueName, message) {
    amqp.connect({
        host: process.env.RABBIT_HOST,
        port: process.env.RABBIT_PORT,
        username: process.env.RABBIT_USER,
        password: process.env.RABBIT_PASSWORD
      }, (err, connection)=> {
        if(err) {
            console.error(err)
            throw new Error();
        }
        else {
            connection.createChannel((error, channel) => {
                if(error){
                    console.error(error)
                    throw new Error();
                }
                else 
                {
                    channel.assertQueue(queueName, {
                        durable: true,
                    })
                    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
                    connection.close
                }
            })
        }})
}

module.exports = publisher