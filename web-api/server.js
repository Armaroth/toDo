const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const { pool, doQuery } = require('./db/db.js')


app.use(cors());
app.use(express.json());



const port = 4000;

const users = []

app.listen(port, () => console.log(`listening on port:${port}`));

app.get("/", async (req, res) => {
    const query = `SELECT * FROM todo;`
    const result = await pool.query(query);
    console.log(result)
    if (result.rows !== 0) {
        res.json(result.rows);
    }

})

app.post("/", async (req, res) => {
    const query = ` INSERT INTO todo (description) VALUES ($1)`
    const description = req.body.inputValue;
    await pool.query(query, [description]);
    console.log('done')
})