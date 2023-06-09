const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');
const loginRequired = require('../middlewares/loginRequired');

// routes.get('/', userController.index);
routes.get('/:id', userController.show);
routes.post('/', userController.create);
routes.put('/', loginRequired, userController.update);
routes.delete('/', loginRequired, userController.delete);

module.exports = routes;
