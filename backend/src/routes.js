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
routes.post('/calls', CallsController.create);
routes.delete('/calls', CallsController.delete);

routes.get('/profile/:user', ProfileController.getProfile);
routes.put('/profile/:user', ProfileController.changePassword);

routes.post('/sessions', SessionController.create);

module.exports = routes;

{/*

CallHistory
    Lista de todas as chamadas já feitas - CallsController
        () => return (lista de dias e horários das chamadas já realizas)

CallHistoryDetail
    Listar como foi a chamada de um dia e horário específico - CallsController
        (dia, horário) => return (nome, faltas, justificativa de todos os servos neste dia e horário)

Call
    Listar dados de acordo com última chamada realizada no mesmo dia - CallsController
        (dia) => {
            return (nome, faltas, justificativa de todos os servos neste dia e horário)
            Se não houver chamada anterior no mesmo dia, retornar uma chamada "falsa" como se todos os servos tivessem levado falta inteira
        }
*/}