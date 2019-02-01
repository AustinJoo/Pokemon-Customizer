const pg = require('pg');
const connection = 'postgres://localhost:5432/pokemonCustomizer';

let pgClient = new pg.Client(connection);
pgClient.connect();

module.exports = pgClient;