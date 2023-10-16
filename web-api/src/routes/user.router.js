const express = require('express');
const { runQuery } = require('../db/db.js');
const validateToken = require('../middleWare/auth.middleware.js')
const userRouter = express.Router();
userRouter.use(validateToken);

userRouter.route("/")
    .get(async (req, res) => {
        const user = res.locals.user;

        try {
            const query = `SELECT * FROM todo WHERE user_id = ($1) ;`
            const result = await runQuery(query, [user.id]);
            if (result.rows !== 0) {
                return res.json(result.data.rows);
            }

        } catch (error) {
            console.error(error);
        }
    })
    .post(async (req, res) => {
        try {
            const user = res.locals.user;
            const query = ` INSERT INTO todo (description,user_id) VALUES ($1,$2);`
            const { value } = req.body;
            const result = await runQuery(query, [value, user.id]);
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

