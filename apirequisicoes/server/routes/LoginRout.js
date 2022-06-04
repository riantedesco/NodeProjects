const express = require('express');
const routes = express.Router();
const controle = require('../controller/LoginController');

routes.route('/login').post(controle.login);
routes.route('/logout').post(controle.logout);
module.exports = routes;