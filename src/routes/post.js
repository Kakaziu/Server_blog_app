const express = require('express');
const routes = express.Router();
const postController = require('../controllers/postController');
const loginRequired = require('../middlewares/loginRequired');

routes.get('/', postController.index);
routes.get('/:id', postController.show);
routes.post('/', loginRequired, postController.create);
routes.put('/:id', loginRequired, postController.update);
routes.delete('/:id', loginRequired, postController.delete);

module.exports = routes;
