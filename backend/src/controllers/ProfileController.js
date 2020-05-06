const connection = require('../database/connection');

module.exports = {

    async changePassword(request, response) {

        const { user } = request.params;
        const { oldPassword, newPassword } = request.body;

        const servant = await connection('servants')
            .where('user', user)
            .select('password', 'passwordTemporary')
            .first();

        if(oldPassword !== servant.password) {
            return response.status(400).json({ error: 'Old password incorrect' });
        }

        if(servant.passwordTemporary) { 
            await connection('servants')
                .where('user', user)
                .update({
                    password: newPassword,
                    passwordTemporary: false,
                });
        }
        else {
            await connection('servants')
                .where('user', user)
                .update({
                    password: newPassword,
                });
        }

        return response.status(204).send();

    },

    async getProfile(request, response) {
        
        const { user } = request.params;

        const data = await connection('servants')
            .where('user', user)
            .select('user', 'name', 'type', 'ministry', 'absences')
            .first();

        if(!data) {
            return response.status(400).json({ error: 'Profile not found' });
        }

        return response.json(data);

    }
    
}
