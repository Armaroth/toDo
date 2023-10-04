const express = require('express');
const { pool } = require('../db/db.js');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const initialize = require('../passport-config.js');
const passport = require('passport');
const { saveUser } = require('../db/user.store.js');
const getTokenForUser = require('../utils/user.utils.js');

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
        const user = { email, username, password: hash };
        const result = await saveUser(user);
        console.log(result)
        if (result?.error) {
            res.status(result.code).send(result);
            return
        }
        console.log(result.data);
        user.id = result.data;
        const token = getTokenForUser(user);
        return res.send({ token })
    }
    catch (error) {
        console.error(error);
    }



})

module.exports = authRouter;