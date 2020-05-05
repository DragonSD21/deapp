const express = require('express');

const ServantsController = require('./controllers/ServantsController');
const CallsController = require('./controllers/CallsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/servants', ServantsController.index);
routes.post('/servants', ServantsController.create);
routes.put('/servants/:user', ServantsController.change);
routes.delete('/servants/:user', ServantsController.delete);

routes.get('/calls', CallsController.getAll);
routes.get('/specificcall', CallsController.getSpecific); //Query Params
routes.get('/lastcall', CallsController.getLast); //Query Params
routes.post('/calls', CallsController.create);
routes.delete('/calls', CallsController.delete);

routes.get('/profile/:user', ProfileController.getProfile);
routes.put('/profile/:user', ProfileController.changePassword);

routes.post('/sessions', SessionController.create);

module.exports = routes;