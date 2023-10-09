const express = require('express');
const { runQuery } = require('../db/db.js');
const userRouter = express.Router();


userRouter.route("/")
    .get(async (req, res) => {

        try {
            const query = `SELECT * FROM todo ;`
            const result = await runQuery(query);
            if (result.rows !== 0) {
                return res.json(result.data.rows);
            }

        } catch (error) {
            console.error(error);
        }
    })
    .post(async (req, res) => {
        try {
            const query = ` INSERT INTO todo (description) VALUES ($1);`
            const { value } = req.body;
            const result = await runQuery(query, [value]);
            return res.send(result.data);


        } catch (error) {
            console.error(error);
        }
    })
    .put(async (req, res) => {
        try {
            const { description, id } = req.body;
            const query = 'UPDATE todo SET description = $1 WHERE todo_id = $2 ;'
            await runQuery(query, [description, id]);
            return res.json('Todo was updated.');
        }

        catch (error) {
            console.error(error);
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.body;
            const query = 'DELETE FROM todo WHERE todo_id = $1 ;'
            await runQuery(query, [id]);
            return res.json('Todo was deleted.');
        }

        catch (error) {
            console.error(error);
        }

    })

module.exports = userRouter;

