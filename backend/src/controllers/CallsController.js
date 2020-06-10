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
                callsFormat.push({
                    day: element.day,
                    time: [
                        element.time
                    ]
                });
                currentDay = element.day;
                i++;
            }

        });

        return response.json(calls);
        
    },

    async getSpecific(request, response) {

        const { day, time } = request.query;

        const call = await connection('calls')
            .where({
                'calls.day': day,
                'calls.time': time,
                })
            .innerJoin('servants', 'calls.user', 'servants.user')
            .select('calls.user', 'servants.name', 'calls.present', 'calls.absences', 'calls.justification');

        return response.json(call);

    },

    async getLast(request, response) {

        const { day } = request.query;

        const calls = await connection('calls')
            .select('day', 'time')
            .where('id', (connection('calls').max('id')))
            .first();

        var callReturn = [];

        if(calls == null) {
            const servants = await connection('servants')
                .select('user', 'name', 'absences')

            servants.forEach((element) => {
                callReturn.push({
                    user: element.user,
                    name: element.name,
                    present: false,
                    absences: parseFloat(element.absences) + 1.0,
                    justification: "",
                })
            });

            return response.json(callReturn);
        }

        if(calls.day === day) {
            callReturn = await connection('calls')
                .where({
                    'calls.day': calls.day,
                    'calls.time': calls.time,
                    })
                .innerJoin('servants', 'calls.user', 'servants.user')
                .select('calls.user', 'servants.name', 'calls.present', 'calls.absences', 'calls.justification');
        }
        else {
            const servants = await connection('servants')
                .select('user', 'name', 'absences')

            servants.forEach((element) => {
                callReturn.push({
                    user: element.user,
                    name: element.name,
                    present: false,
                    absences: parseFloat(element.absences) + 1.0,
                    justification: "",
                })
            });
        }

        return response.json(callReturn);

    },

    async create(request, response) {
        const { day, time, servants } = request.body;

        const calls = await connection('calls')
            .select('day')
            .where('id', (connection('calls').max('id')))
            .first();

        await servants.forEach(async function (servant) {

            const { user, name, present, absences, justification } = servant;

            if(calls == null) {
                await connection('calls').insert({
                    day,
                    time,
                    user,
                    present,
                    absences, 
                    justification
                });
            }
            else {
                await connection('calls')
                    .where({
                        'day': day,
                        'user': user,
                        })
                    .update({
                    day,
                    time,
                    user,
                    present,
                    absences, 
                    justification
                });
            }

            // Atualizar falta no banco de dados do servo
            await connection('servants')
                .where('user', user)
                .update('absences', absences);

        });

        // return response.json({
        //     day,
        //     time,
        //     servants
        // });

        return response.status(204).send();

    },

    async delete(request, response) {
        await connection('calls').select('*').delete();

        // Zerar faltas de todos os servos no banco de dados
        await connection('servants').update('absences', 0);

        return response.status(204).send();
    }
    
};