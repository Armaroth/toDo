require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { pool, seedDatabase } = require('./db/db.js');
const cookieParser = require('cookie-parser');

async function bootstrap() {
    const app = express();
    if (pool) await seedDatabase();
    app.use(cors({ origin: "http://localhost:5173", credentials: true, }));

    const userRouter = require('./routes/user.router.js');
    const authRouter = require('./routes/auth.router.js');

    app.use(express.json());
    app.use(cookieParser());
    app.use('/user', userRouter);
    app.use('/auth', authRouter);

    const port = process.env.PORT;

    return app;
}


module.exports = { bootstrap }