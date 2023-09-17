const Pool = require('pg').Pool;

const pool = new Pool();

async function doQuery(query, args) {
    await pool.query(query, ...args);
}
async function initDb() {
    await pool.query(`create table if not exists todo (
        id serial primary key,
        description text not null 
    )`);
}

module.exports = { pool, doQuery, initDb };
