console.log("Server rodando...");

// usar o express
const express = require('express');
const app = express();
app.use(express.json()); // para tratar json

// definir porta para a API de serviço
//const port = process.env.PORT || 3000;

require("dotenv").config();
const port = process.env.API_PORT || 5000;

app.listen(port, () => {
    return console.log('API executando na porta ' + port);
})

// usar o mongo
require("./server/banco/mongo");
// usar as rotas
const routes = require('./server/routes/index');
app.use(routes);

// usando variáveis de ambiente no projeto

