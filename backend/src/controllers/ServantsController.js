const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        // const servants = await connection('servants').select('*');
        const servants = await connection('servants').select('user', 'name', 'absences');
    
        return response.json(servants);
    },

    async create(request, response) {
        const { user, password, name, type, ministry } = request.body;
        const passwordTemporary = true;
        const absences = 0;

        const servant = await connection('servants')
            .where('user', user)
            .select('user')
            .first();

        if(servant) {
            return response.status(400).json({
                erroCode: 1,
                errorDescription: 'User already exists'
            });
        }

        await connection('servants').insert({
            user,
            password,
            passwordTemporary,
            name,
            type,
            ministry,
            absences,
        });

        // return response.json({
        //     user,
        //     password,
        //     passwordTemporary,
        //     name,
        //     type,
        //     ministry,
        //     absences,
        // });

        return response.status(204).send();

    },

    async change(request, response) {

        const { user } = request.params;
        const { name, type, ministry, absences } = request.body;

        await connection('servants')
            .where('user', user)
            .update({
                name,
                type,
                ministry,
                absences
            });

        // return response.json({
        //     user,
        //     name,
        //     type,
        //     ministry,
        //     absences
        // });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { user } = request.params;

        await connection('servants').where('user', user).delete();

        return response.status(204).send();
    }
    
};