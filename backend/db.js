const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'greatjack',
    host: 'localhost',
    database: 'asylumheroes',
    password: 'asylumheroes',
    port: 5432,
}) 

module.exports = pool;