const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        // const data = request.body; // Captura o corpo da requisição

        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({ // Await serve pra mandar experar concluir essa intrução antes de executar a próxima.
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};