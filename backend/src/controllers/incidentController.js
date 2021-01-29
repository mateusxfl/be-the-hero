const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();

        /**
         * Busca parametros na URL depois do ?, caso não exista, o valor
         * padrão será 1.
         * 
         * Count retorna um vetor, a razão dele ter colchetes é que count
         * retorna um vetor, e os colchetes servem para pegar a posição 0
         * o mesmo serviria se usasse count[0]
         */

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)

        // .select('*'); Se fosse assim o ID da ong iria sobrepor o do caso.
        
        .select('incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id).select('ong_id').first();

        console.log(incident.ong_id);
        console.log(ong_id);

        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permited.'}); // Não autorizado
        }

        await connection('incidents')
        .where('id', id)
        .delete();

        return response.status(204).send();

        /**
         * Status 204 - Retornar resposta para o front end que não tem
         * conteudo, o send serve apenas para enviar a resposta sem corpo 
         * nenhum (vazia)
         */
    }
};