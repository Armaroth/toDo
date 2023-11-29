const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'user-name',
    password: 'strong-password',
    host: 'localhost',
    port: 5432,
    database: 'stefos'
})

const path = require('path');
const readDirSync = require('fs').readdirSync;
const readFileSync = require('fs').readFileSync;

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
    } catch (error) {
        await runQuery('ROLLBACK');
    }

    console.log('database seeded');
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