const {Pool} = require('pg');
// const connection = 'postgres://localhost:5432/pokemonCustomizer';

// let pgClient = new pg.Client(connection);
// pgClient.connect();

const pool = new Pool({
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PW || '',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'custompokemon',
    port: process.env.PG_PORT || 5432
  });

module.exports = pool;