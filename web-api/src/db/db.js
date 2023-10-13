const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'user-name',
    password: 'strong-password',
    host: 'localhost',
    port: 5432,
    database: 'stefos'
})

async function createTables() {
    await runQuery(`CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       password TEXT NOT NULL
      );`);

    await runQuery(`CREATE TABLE IF NOT EXISTS "todo" (
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id)
      );`)

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



module.exports = { pool, runQuery, createTables };