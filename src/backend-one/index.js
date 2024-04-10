require('dotenv').config();

const express = require("express");
const app = express();

app.use(express.json());

const publisher = require('./rabbit-interaction/publisher');
// Supondo que a função 'consumer' foi ajustada para iniciar o consumo continuamente
const consumer = require('./rabbit-interaction/consumer');

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

// Inicie o consumidor antes do servidor começar a escutar
async function init() {
    try {
        await consumer(process.env.QUEUE_ONE, (message) => {
            // Processa a mensagem recebida da QUEUE_ONE
            console.log(`Mensagem recebida da ${process.env.QUEUE_ONE}:`, message);
        });

        await consumer(process.env.QUEUE_TWO, (message) => {
            // Processa a mensagem recebida da QUEUE_TWO
            console.log(`Mensagem recebida da ${process.env.QUEUE_TWO}:`, message);
        });

        app.listen(8080, () => console.log("Servidor iniciado com sucesso na porta 8080"));
    } catch (error) {
        console.error("Erro ao iniciar o servidor ou o consumidor", error);
    }
}

init();
