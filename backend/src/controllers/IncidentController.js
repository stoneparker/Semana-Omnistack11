const connection = require('../database/connection');

module.exports = {
     async index(request, response) {
          const incidents = await connection('incidents').select('*');

          return response.json(incidents)
     },

     async create(request, response) {
          const { title, description, value } = request.body;
          const ong_id = request.headers.authorization; // autenticação, localização do usuário (idioma) - contexto da requisição

          const [ id ] = await connection('incidents').insert({
               // id é auto_incremment
               title,
               description,
               value,
               ong_id // qual ong está autenticada
          })

          return response.json({ id })
     },

     async delete(request, response) {
          const { id } = request.params;
          const ong_id = request.headers.authorization;

          const incident = await connection('incidents')
               .where('id', id)
               .select('ong_id')
               .first();

          if (incident.ong_id != ong_id) {
               return response.status(401).json({ error: 'Operation not permited.' }) // não autorizado
          }

          await connection('incidents').where('id', id).delete();

          return response.status(204).send(); // resposta que deu sucesso mas n tem conteúdo nenhum para retornar

     }
}