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

async function getDbClient() {
    const client = await pool.connect();
    if (!client) throw new Error('client is not connected to db');
    return client;
}
async function beginTransaction() {
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        return client;
    } catch (e) {
        await client.query('ROLLBACK');
    }
}

async function commitTransaction(client) {
    try {
        const res = await client.query('COMMIT');
        return { data: res };
    } catch (e) {
        await client.query('ROLLBACK');
        return { error: e };
    } finally {
        client.release();
    }
}

async function seedDatabase() {
    const client = await beginTransaction();
    const filenames = readDirSync(__dirname + '/migrations', 'utf-8');
    if (!filenames) throw new Error('there is no init db file');
    for (const filename of filenames) {
        const query = readFileSync(`${__dirname}/migrations/${filename}`, 'utf-8')
        await client.query(query);
    }
    const res = commitTransaction(client);
    if (res.error) {
        console.error(res.error);
        throw new Error('failed to seed database');
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