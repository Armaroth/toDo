const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const initialize = require('../middleWare/passport-config.js');
const passport = require('passport');
const { saveUser } = require('../db/user.store.js');
const getTokenForUser = require('../utils/user.utils.js');
const jwt = require('jsonwebtoken');

initialize(passport);

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Missing Credentials');
    }
    passport.authenticate('local', async (err, result) => {
        if (err) return res.status(err.code).send(err.message);
        const { accessToken, refreshToken } = result;
        return res.json({ accessToken, refreshToken });
    })(req, res)
});

authRouter.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).send('Missing credentials');
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
        if (result.error) {
            return res.status(result.code).send(result.error);
        }
        user.id = result.data;
        const accessToken = getTokenForUser(user, process.env.JWT_ACCESS_KEY);
        const refreshToken = getTokenForUser(user, process.env.JWT_REFRESH_KEY);
        return res.json({ accessToken, refreshToken });
    }
    catch (error) {
        console.error(error);
    }
})
authRouter.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const user = jwt.verify(JSON.parse(refreshToken), process.env.JWT_REFRESH_KEY);
        if (!(typeof user === 'object' && 'id' in user)) {
            throw new Error('invalid user extracted from token');
        }
        const newAccessToken = getTokenForUser(user, process.env.JWT_ACCESS_KEY);
        const newRefreshToken = getTokenForUser(user, process.env.JWT_REFRESH_KEY);
        return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        return res.sendStatus(401);
    }




})

module.exports = authRouter;