const express = require('express');
const routes = express.Router();
const controle = require('../controller/TipoRequisicaoController');

// todos os endpoints de colaborador
routes.route('/tiposRequisicao').get(controle.listar);
routes.route('/tiposRequisicao').post(controle.incluir);
routes.route('/tiposRequisicao').put(controle.alterar);
routes.route('/tiposRequisicao/:id').delete(controle.excluir);
routes.route('/tiposRequisicao/:id').get(controle.obterPeloId);
routes.route('/tiposRequisicao/filtro/:filtro').get(controle.filtrar);

module.exports = routes;