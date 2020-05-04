const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const calls = await connection('calls').select('day', 'time');

        return response.json(calls);
    },

    async create(request, response) {
        const { day, time, servants } = request.body;

        await servants.forEach(async function (servant) {

            const { user, absences, justification } = servant;
            
            await connection('calls').insert({
                day,
                time,
                user,
                absences, 
                justification
            });

            // Atualizar falta no banco de dados do servo
            await connection('servants')
                .where('user', user)
                .update('absences', absences);

        });

        return response.json({
            day,
            time,
            servants
        });

    },

    async delete(request, response) {
        await connection('calls').select('*').delete();

        // Zerar faltas de todos os servos no banco de dados
        await connection('servants').update('absences', 0);

        return response.status(204).send();
    }
    
};