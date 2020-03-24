
exports.up = function(knex) { // rsponsável pela criação da tabela - o que acontece quando executar a migration
     return knex.schema.createTable('ongs', function(table) {
       table.string('id').primary();
       table.string('name').notNullable();
       table.string('email').notNullable();
       table.string('whatsapp').notNullable();
       table.string('cidade').notNullable();
       table.string('estado').notNullable();
       table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) { // o que fazer caso algo dê errado no up, quiser voltar atrás
     return knex.schema.dropTable('ongs');
};
