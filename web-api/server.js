const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const { pool } = require('./db/db.js')


app.use(cors());
app.use(express.json());



const port = 4000;

const users = []

app.listen(port, () => console.log(`listening on port:${port}`));

app.get("/", async (req, res) => {

    try {
        const query = `SELECT * FROM todo;`
        const result = await pool.query(query);
        if (result.rows !== 0) {
            return res.json(result.rows);
        }

    } catch (error) {
        console.error(error)
    }
})
app.post("/", async (req, res) => {
    try {
        const query = ` INSERT INTO todo (description) VALUES ($1);`
        const { value } = req.body;
        const result = await pool.query(query, [value]);
        return res.send(result);


    } catch (error) {
        console.error(error)
    }
})

app.put('/', async (req, res) => {
    try {
        const { description, id } = req.body;
        const query = 'UPDATE todo SET description = $1 WHERE todo_id = $2 ;'
        await pool.query(query, [description, id]);
        return res.json('Todo was updated.');
    }

    catch (error) {
        console.error(error)
    }
})

app.delete('/:id', async (req, res) => {
    try {

    }

    catch (error) {
        console.error(error)
    }

})