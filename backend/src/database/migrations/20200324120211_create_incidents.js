
exports.up = function(knex) { // rsponsável pela criação da tabela - o que acontece quando executar a migration
     return knex.schema.createTable('incidents', function(table) {
       table.increments(); // chave primária auto_increment
       table.string('title').notNullable();
       table.string('description').notNullable();
       table.decimal('value').notNullable();

       table.string('ong_id').notNullable();
       table.foreign('ong_id').references('id').inTable('ongs'); // criação de chave estrangeira

  })
};

exports.down = function(knex) { // o que fazer caso algo dê errado no up, quiser voltar atrás
     return knex.schema.dropTable('incidents');
};
