const amqp = require('amqplib/callback_api')
require('dotenv').config()

async function consumer(queueName) {
    return new Promise((resolve, reject) => {
        amqp.connect({
            host: process.env.RABBIT_HOST,
            port: process.env.RABBIT_PORT,
            username: process.env.RABBIT_USER,
            password: process.env.RABBIT_PASSWORD
        }, function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.createChannel(function (error, channel) {
                    if (error) {
                        reject(error);
                    } else {
                        channel.assertQueue(queueName, {
                            durable: true,
                        });
                        channel.consume(queueName, function (msg) {
                            if (msg) {
                                const msgContent = msg.content.toString();
                                channel.ack(msg);
                                resolve(msgContent);
                                setTimeout(() => {
                                    channel.close();
                                    connection.close();
                                }, 500);
                            }
                        }, {
                            noAck: false
                        });
                    }
                });
            }
        });
    });
}

module.exports = consumer;