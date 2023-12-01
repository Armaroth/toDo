const Pool = require('pg').Pool;
require('dotenv').config();
const path = require('path');
const readDirSync = require('fs').readdirSync;
const readFileSync = require('fs').readFileSync;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD.toString(),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})
async function seedDatabase() {
    const filenames = readDirSync(__dirname + '/migrations', 'utf-8');
    if (!filenames) throw new Error('there is no init db file');
    await runQuery('BEGIN');
    for (const filename of filenames) {
        const query = readFileSync(`${__dirname}/migrations/${filename}`, 'utf-8')
        await runQuery(query);
    }
    try {
        await runQuery('COMMIT');
        console.log('database seeded');
    } catch (error) {
        await runQuery('ROLLBACK');
        console.log('problem with database seeding');
    }
}
async function runQuery(query, args) {
    try {
        const res = await pool.query(query, args)
        return { data: res }
    } catch (error) {
        console.error(error)
    }
}
module.exports = { pool, runQuery, seedDatabase };