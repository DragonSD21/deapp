const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const servants = await connection('servants').select('*');
        // const servants = await connection('servants').select('id', 'user', 'name', 'type', 'absences');
    
        return response.json(servants);
    },

    async create(request, response) {
        const { user, password, name, type, ministry } = request.body;
        const passwordTemporary = true;
        const absences = 0;

        await connection('servants').insert({
            user,
            password,
            passwordTemporary,
            name,
            type,
            ministry,
            absences,
        });

        return response.json({
            user,
            password,
            passwordTemporary,
            name,
            type,
            ministry,
            absences,
        });
    },

    async change(request, response) {
        {/*
            Colocar um Query Param para identificar qual será o tipo de alteração (typeChange):
                passwordTemporary: alteração de senha devido ao primeiro acesso
                password: alteração de senha pelo usuário
                total: alteração de dados pelo servo superior
        */}
        const { id } = request.params;
        const { user, password, passwordTemporary, name, type, absences } = request.body;

        await connection('servants')
            .where('id', id)
            .update({
                user,
                password,
                passwordTemporary,
                name,
                type,
                absences,
            });

        return response.json({
            user,
            password,
            passwordTemporary,
            name,
            type,
            absences,
        });
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('servants').where('id', id).delete();

        return response.status(204).send();
    }
    
};