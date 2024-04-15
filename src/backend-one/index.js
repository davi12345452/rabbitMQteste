/**
 * Backend de exemplo para publicar coisas no Rabbit. A ideia é ter um backend de entrada, um publisher
 * e outros dois de consumer, simulando uma aplicação real de uso do RabbitMQ
 */
require('dotenv').config();

const express = require("express");
const app = express();

app.use(express.json());

const publisher = require('./publisher');

// Rotas POST para escrever nas duas filas diferentes
app.post('/queue/one', async (req, res) => {
    const data = req.body;
    try {
        await publisher(process.env.QUEUE_ONE, data);
        res.status(201).send('Success');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

app.post('/queue/two', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        await publisher(process.env.QUEUE_TWO, data);
        res.status(201).send('Success');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

app.listen(8080, e => {
    if(e) console.log("Erro ao iniciar o servidor");
    else console.log("Servidor iniciado com sucesso");
})
