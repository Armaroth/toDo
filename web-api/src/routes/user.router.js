const express = require('express');
const validateToken = require('../middleWare/auth.middleware.js')
const { runQuery } = require('../db/db.js');
const userRouter = express.Router();
userRouter.use(validateToken);

userRouter.route("/todos")
    .get(async (req, res) => {
        try {
            const user = res.locals.user;
            const query = `SELECT * FROM todo WHERE user_id = ($1) ORDER BY todo_id ;`
            const result = await runQuery(query, [user.id]);
            if (result.rows !== 0) {
                return res.json(result.data.rows);
            }
        }
        catch (error) {
            console.error(error);
        }
    })
    .post(async (req, res) => {
        try {
            const user = res.locals.user;
            const { value } = req.body;
            const query = ` INSERT INTO todo (description,user_id) VALUES ($1,$2);`
            const result = await runQuery(query, [value, user.id]);
            return res.send(result.data);
        }
        catch (error) {
            console.error(error);
        }
    })
    .put(async (req, res) => {
        try {
            const { payload } = req.body;
            const query = 'UPDATE todo SET description = $1 WHERE todo_id = $2 ;'
            await runQuery(query, [payload.description, payload.id]);
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
    });

userRouter.put('/todos/check', async (req, res) => {
    const { payload } = req.body;
    const query = 'UPDATE todo SET completed = $1 WHERE todo_id = $2 ;'
    await runQuery(query, [!payload.completed, payload.toDo_id])
    return res.send('Todo was checked.');
});
// ********************************************************************************************************************************************************************************
// ********************************************************************************************************************************************************************************
//**********************************************************************************Archived***************************************************************************************
// ********************************************************************************************************************************************************************************
// ********************************************************************************************************************************************************************************
userRouter.route("/archived")
    .get(async (req, res) => {
        try {
            const user = res.locals.user;
            const query = `SELECT * FROM archivedtodo WHERE user_id = ($1) ;`
            const result = await runQuery(query, [user.id]);
            if (result.rows !== 0) {
                return res.json(result.data.rows);
            }
        }
        catch (error) {
            console.error(error);
        }
    })
    .post(async (req, res) => {
        try {
            const user = res.locals.user;
            const { id } = req.body;
            const descQuery = `SELECT description FROM todo WHERE todo_id = ($1) ;`;
            const value = await runQuery(descQuery, [id]);
            const description = value?.data?.rows[0]?.description;
            if (description) {
                const query = ` INSERT INTO archivedtodo (description,user_id) VALUES ($1,$2);`
                const result = await runQuery(query, [description, user.id]);
                return res.send(true);
            }
            return res.send(false)

        }
        catch (error) {
            console.error(error);
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.body;
            const query = 'DELETE FROM archivedtodo WHERE todo_id = $1 ;'
            await runQuery(query, [id]);
            return res.json('Todo was deleted.');
        }
        catch (error) {
            console.error(error);
        }
    });
userRouter.route('/dark-mode')
    .get(async (req, res) => {
        try {
            const { darkMode } = req.cookies;
            if (darkMode === 'true') {
                return res.send(true)
            } else {
                return res.send(false)
            }
        }
        catch (error) {
            console.error(error);
        }
    })
    .put(async (req, res) => {
        try {
            const { darkMode } = req.cookies;
            if (darkMode === 'true') {
                res.cookie('darkMode', false, { httpOnly: true })
            } else {
                res.cookie('darkMode', true, { httpOnly: true })
            }
            return res.send('done');
        }
        catch (error) {
            console.error(error);
        }
    }
    )
module.exports = userRouter;

