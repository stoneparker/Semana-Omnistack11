const connection = require('../database/connection');

module.exports = {
     
     // COM PAGINAÇÃO
     async index(request, response) {
          const { page = 1 } = request.query; // se page não existir, é criada com o valor 1

          const [count] = await connection('incidents').count(); // quantidade de registros

          const incidents = await connection('incidents')
          .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
          .limit(5) // limitar os registros retornados
          .offset((page - 1) * 5) // a partir de qual registro ele começará a buscar. na primeira pág, a partir do 0, na segunda a partir do 5...
          .select([
               'incidents.*', 
               'ongs.name', 
               'ongs.email', 
               'ongs.whatsapp', 
               'ongs.city', 
               'ongs.uf'
          ]);

          response.header('X-Total-Count', count['count(*)']); // resposta no header - usado na paginação
          return response.json(incidents);
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