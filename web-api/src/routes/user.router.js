const express = require('express');
const { pool } = require('../db/db.js');

const userRouter = express.Router();


userRouter.route("/")
    .get(async (req, res) => {

        try {
            const query = `SELECT * FROM todo ;`
            const result = await pool.query(query);
            if (result.rows !== 0) {
                return res.json(result.rows);
            }

        } catch (error) {
            console.error(error)
        }
    })
    .post(async (req, res) => {
        try {
            const query = ` INSERT INTO todo (description) VALUES ($1);`
            const { value } = req.body;
            const result = await pool.query(query, [value]);
            return res.send(result);


        } catch (error) {
            console.error(error)
        }
    })
    .put(async (req, res) => {
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
    .delete(async (req, res) => {
        try {
            const { id } = req.body;
            const query = 'DELETE FROM todo WHERE todo_id = $1 ;'
            await pool.query(query, [id]);
            return res.json('Todo was deleted.');
        }

        catch (error) {
            console.error(error)
        }

    })

module.exports = userRouter

