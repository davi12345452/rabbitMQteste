const amqp = require('amqplib/callback_api')

amqp.connect({
    host: 'localhost',
    port: 5672,
    username: 'admin',
    password: 123456
  }, (err, connection)=> {
    if(err) {
        console.log(err);
    }
    else {
        connection.createChannel((error, channel) => {
            if(error){
                console.log(error)
            }
            else 
            {
                let queueName = 'filaTeste2';
                let message  = 'Ola Mundo 2'
                channel.assertQueue(queueName, {
                    durable: true,
                })
                channel.sendToQueue(queueName, Buffer.from(message))
                setTimeout(() => {
                    connection.close
                }, 1000)
            }
        })
    }})