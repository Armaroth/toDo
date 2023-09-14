const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'user-name',
    password: 'strong-password',
    host: 'localhost',
    port: 5432,
    database: 'todos'
})

async function doQuery(query, args) {
    await pool.query(query, ...args)
}

module.exports = { pool, doQuery };