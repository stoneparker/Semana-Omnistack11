const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development) // config de desenvolvimento

module.exports = connection;