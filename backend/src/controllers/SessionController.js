const connection = require('../database/connection');

module.exports = {

    async create(request, response) {

        const { user, password } = request.body;

        const servant = await connection('servants')
            .where({
                'user': user,
            })
            .select('password', 'passwordTemporary')
            .first();

        if(!servant) {
            return response.status(400).json({ error: 'Servant not found with this user' });
        }

        if(servant.password !== password) {
            return response.status(400).json({ error: 'Password incorrect for this user' });
        }

        return response.json(servant.passwordTemporary);

    }
    
}
