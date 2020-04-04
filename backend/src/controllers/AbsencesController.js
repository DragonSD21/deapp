const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { day, time } = request.query;

        const absences = await connection('calls')
            .where({
                'day': day,
                'time': time
                })
            .select('justification', 'servant_id');

        return response.json(absences);
    },

}
