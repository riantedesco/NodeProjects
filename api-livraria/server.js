console.log("Server rodando...");

const express = require('express');
const app = express();
app.use(express.json());

//require("dotenv").config();
const port = process.env.API_PORT || 5000;

app.listen(port, () => {
    return console.log('API executando na porta ' + port);
})

require("./server/banco/mongo");
const routes = require('./server/routes/index');
app.use(routes);

// Liberar origens para requisições
var cors = require('cors');
routes.use(cors({origin: '*'}));