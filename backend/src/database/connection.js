const knex = require('knex');
const configuration = require('../../knexfile'); // Configuração do banco de dados

const connection = knex(configuration.development); // Pàssando a configuração de desenvolvimento

module.exports = connection;