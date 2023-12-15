const express = require('express');
const initialize = require('../middleWare/passport-config.js');
const { getTokenForUser, saveRefreshToken } = require('../utils/user.utils.js');
const { saveUser } = require('../db/user.store.js');
const { runQuery } = require('../db/db.js');
const checkEnvVariables = require('../middleWare/checkEnvVariables.middleware.js')
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
authRouter.use(checkEnvVariables);
initialize(passport);

authRouter.post('/login', async (req, res) => {
    if (res?.error) return res.status(400).send(res?.error);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Missing Credentials');
    }
    passport.authenticate('local', async (err, result) => {
        if (err) return res.status(err.code).send(err.message);
        const { accessToken, refreshToken, id } = result;
        saveRefreshToken(refreshToken, id);
        return res.json({ accessToken });
    })(req, res)
});
authRouter.post('/register', async (req, res) => {
    if (res?.error) return res.status(400).send(res?.error);
    const patterns = {
        username: /^[a-z\d]{5,12}$/i,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#-_]).{8,20}$/
    }
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).send('Missing credentials.');
        }
        if (!patterns.email.test(email) || !patterns.username.test(username) || !patterns.password.test(password)) {
            return res.status(400).send(`Credentials don't meet the criteria.`);
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
        saveRefreshToken(refreshToken, user.id);
        return res.json({ accessToken });
    }
    catch (error) {
        console.error(error);
    }
})
authRouter.delete('/logout', async (req, res) => {
    const { id } = req.body;
    const query = 'UPDATE "user" SET refresh_token = $1 WHERE id = $2 ;'
    await runQuery(query, [null, id]);
    return res.sendStatus(200);
})
authRouter.post('/refresh', async (req, res) => {
    const { id } = req.body;
    const result = await runQuery(`SELECT refresh_token FROM "user" WHERE id = $1 ;`, [id])
    const { refresh_token } = result.data.rows[0]
    try {
        const user = jwt.verify(refresh_token, process.env.JWT_REFRESH_KEY);
        if (!(typeof user === 'object' && 'id' in user)) {
            throw new Error('invalid user extracted from token');
        }
        const newAccessToken = getTokenForUser(user, process.env.JWT_ACCESS_KEY, 'access');
        const newRefreshToken = getTokenForUser(user, process.env.JWT_REFRESH_KEY);
        await runQuery('UPDATE "user" SET refresh_token = $1 WHERE id = $2 ;', [newRefreshToken, id]);
        return res.json({ accessToken: newAccessToken });
    } catch (error) {
        return res.sendStatus(401);
    }
})
module.exports = authRouter;