const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'user-name',
    password: 'strong-password',
    host: 'localhost',
    port: 5432,
    database: 'stefos'
})

async function doQuery(query, args) {
    await pool.query(query, ...args)
}

module.exports = { pool, doQuery };
// Unable to connect to server:connection failed: Connection refused
// 	Is the server running on that host and accepting TCP/IP connections?
// connection to server at "localhost" (::1), port 5432 failed: Address not available
// 	Is the server running on that host and accepting TCP/IP connections?