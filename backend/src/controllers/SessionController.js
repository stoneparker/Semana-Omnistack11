// Login
const connection = require('../database/connection');

module.exports = {
     async create(request, response) {
         const { id } = request.body;

         const ong = await connection('ongs')
          .where('id', id)
          .select('name')
          .first(); // não retorna array, apenas 1 resultado

          if (!ong) {
               return response.status(400).json({ error: 'No ONG found with this ID '}) // bad request
          }

          return response.json(ong);
     }
}