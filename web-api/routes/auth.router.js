const express = require('express');
const { pool } = require('../db/db.js');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const initialize = require('../passport-config.js');
const passport = require('passport');

require('dotenv').config();

initialize(passport);



authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);
    passport.authenticate('local', async (err, token) => {
        if (err) return res.sendStatus(401).send(err);
        return res.send({ token });
    })(req, res)

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