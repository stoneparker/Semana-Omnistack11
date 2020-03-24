const express = require('express');

const app = express();

app.use(express.json());

app.post('/users', (request, response) => {
     const params = request.body;

     console.log(params);

     return response.json({
          evento: 'Semana Omnistack 11.0',
          aluno: 'Vitoria Lopes'
     });
});

app.listen(3333);
