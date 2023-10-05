const express = require('express');
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
    if (!email || !password) {
        return res.status(400).send('Missing Credentials');
    }
    passport.authenticate('local', async (err, token) => {
        if (err) return res.status(err.code).send(err.message);
        return res.send({ token });
    })(req, res)
});

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
        console.log(result.error);
        if (result.error) {
            return res.status(result.code).send(result);
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