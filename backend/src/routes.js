const express = require('express');

const ServantsController = require('./controllers/ServantsController');
const CallsController = require('./controllers/CallsController');
const AbsencesController = require('./controllers/AbsencesController');

const routes = express.Router();

routes.get('/servants', ServantsController.index);
routes.post('/servants', ServantsController.create);
routes.put('/servants/:id', ServantsController.change);
routes.delete('/servants/:id', ServantsController.delete);

routes.get('/calls', CallsController.index);
routes.post('/calls', CallsController.create);
routes.delete('/calls', CallsController.delete);

routes.get('/absences', AbsencesController.index); //Query Params

module.exports = routes;