const { Router } = require("express");
const routes = Router();

var cors = require('cors');
routes.use(cors({origin: '*'}));

const livroRout = require("./LivroRout");
routes.use("/api", livroRout);

module.exports = routes;