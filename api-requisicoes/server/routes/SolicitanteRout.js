const express = require('express');
const routes = express.Router();
const controle = require('../controller/SolicitanteController');

// todos os endpoints de solicitante
routes.route('/solicitantes').get(controle.listar);
routes.route('/solicitantes').post(controle.incluir);
routes.route('/solicitantes').put(controle.alterar);
routes.route('/solicitantes/:id').delete(controle.excluir);
routes.route('/solicitantes/:id').get(controle.obterPeloId);
routes.route('/solicitantes/filtro/:filtro').get(controle.filtrar);

module.exports = routes;