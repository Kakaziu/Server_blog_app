const express = require('express');
const routes = express.Router();
const tokenController = require('../controllers/tokenController');

routes.post('/', tokenController.create);

module.exports = routes;
