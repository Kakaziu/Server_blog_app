const express = require('express');
const routes = express.Router();
const postController = require('../controllers/postController');
const loginRequired = require('../middlewares/loginRequired');
const photoTreatment = require('../middlewares/photoTreatment');

routes.get('/', postController.index);
routes.get('/:id', postController.show);
routes.post('/', loginRequired, photoTreatment, postController.create);
routes.put('/:id', loginRequired, photoTreatment, postController.update);
routes.delete('/:id', loginRequired, postController.delete);

module.exports = routes;
