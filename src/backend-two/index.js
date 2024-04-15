/**
 * Backend dois. Esse servidor está consumindo informações do RabbitMQ, mais especificamente, da
 * fila número um. A ideia é que ele tenha um comportamento diferente do backend dois em relação
 * as mensagens consumidass
 */

const express = require("express");
const app = express();

// Supondo que a função 'consumer' foi ajustada para iniciar o consumo continuamente
const consumer = require('./consumer');

app.listen(8070, async e => {
    if(e) console.log("Error to inicialize serve");
    else {
        console.log("Server inicializated")
        try {
            await consumer()
        } catch (error) {
            console.error('Error to connect with rabbit')
        }
    };
})
