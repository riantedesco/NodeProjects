const express = require('express');
const routes = express.Router();
const controle = require('../controller/LivroController');

routes.route('/livros').get(controle.listar);
routes.route('/livros').post(controle.incluir);
routes.route('/livros').put(controle.alterar);
routes.route('/livros/:id').delete(controle.excluir);
routes.route('/livros/:id').get(controle.obterPeloId);
routes.route('/livros/filtro/:filtro').get(controle.filtrar);

module.exports = routes;