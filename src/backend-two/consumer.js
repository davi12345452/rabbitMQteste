const amqp = require('amqplib/callback_api')
require('dotenv').config({path: '../../.env'})

async function consumer() {
    amqp.connect({
        host: process.env.RABBIT_HOST,
        port: process.env.RABBIT_PORT,
        username: process.env.RABBIT_USER,
        password: process.env.RABBIT_PASSWORD
      }, (err, connection)=> {
        if(err) {
            console.error(err);
            throw new Error()
        }
        else {
            connection.createChannel((error, channel) => {
                if(error){
                    console.error(error);
                    throw new Error()
                }
                else 
                {
                    channel.assertQueue(process.env.QUEUE_ONE, {
                        durable: true,
                    })
                    channel.consume(process.env.QUEUE_ONE, (msg) => {
                        data = msg.content.toString()
                        console.log(`Dados recebidos fila UM: \n ${data}`)
                    })
                }
            })
    }})
}

module.exports = consumer;