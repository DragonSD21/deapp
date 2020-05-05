const connection = require('../database/connection');

module.exports = {

    async getAll(request, response) {

        const calls = await connection('calls')
            .select('day', 'time')
            .groupBy('day', 'time');

        var callsFormat = [];
        var i = -1;
        var currentDay = "";
        calls.forEach((element) => {

            if(currentDay === element.day) {
                callsFormat[i].time.push(element.time);
            }
            else {
                var splitDay = element.day.split('-');
                callsFormat.push({
                    day: splitDay[2] + '/' + splitDay[1] + '/' + splitDay[0],
                    time: [
                        element.time
                    ]
                });
                currentDay = element.day;
                i++;
            }

        });

        return response.json(callsFormat);
        
    },

    async getSpecific(request, response) {
        const { day, time } = request.query;

        const call = await connection('calls')
            .where({
                'day': day,
                'time': time
                })
            .select('user', 'absences', 'justification');

        

        return response.json(call);
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