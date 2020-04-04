const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const calls = await connection('calls').select('day', 'time');

        return response.json(calls);
    },

    async create(request, response) {
        const { day, time, absence, justification, servant_id } = request.body;

        await connection('calls').insert({
            day,
            time,
            absence,
            justification,
            servant_id,
        });

        // Atualizar falta no banco de dados do servo
        if(absence) {
            if(justification === "") {
                await connection('servants').where('id', servant_id).increment('absences', 1);
            }
            else {
                await connection('servants').where('id', servant_id).increment('absences', 0.5);
            }
        }

        return response.json({
            day,
            time,
            absence,
            justification,
            servant_id,
        });
    },

    async delete(request, response) {
        await connection('calls').select('*').delete();

        await connection('servants').update('absences', 0);

        return response.status(204).send();
    }
    
};