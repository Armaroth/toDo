const express = require('express');
const { pool } = require('../db/db.js');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
require('dotenv').config();



authRouter.post('/login', (req, res) => {
    res.send('ok');

})

authRouter.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.sendStatus(400);
        }
        let saltRounds = Number(process.env['SALT_ROUNDS']);
        if (!saltRounds) {
            console.warn('SALT_ROUNDS not found in env. defaulting to 10');
            saltRounds = 10;
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const query = `INSERT INTO "user" (email, username, password) VALUES ($1, $2, $3)`
        await pool.query(query, [email, username, hash])



        res.send('ok');
    }
    catch (error) {
        console.error(error);
    }



})

module.exports = authRouter;