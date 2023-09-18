const Pool = require('pg').Pool;
require('dotenv').config()

const pool = new Pool({
    user: 'user-name',
    password: 'strong-password',
    host: 'localhost',
    port: 5432,
    database: 'todos'
});

async function doQuery(query, args) {
    await pool.query(query, ...args);
}
// async function initDb() {
//     await pool.query(`create table if not exists todo (
//         id serial primary key,
//         description text not null 
//     )`);
// }

module.exports = { pool };
