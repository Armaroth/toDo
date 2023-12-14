require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { pool, seedDatabase } = require('./db/db.js');
const app = express();
if (pool) seedDatabase();


const userRouter = require('./routes/user.router.js');
const authRouter = require('./routes/auth.router.js');
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port:${port}`));
