const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const { pool } = require('./db/db.js');
const userRouter = require('./routes/user.js');
const authRouter = require('./routes/auth.js');


app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);



const port = 4000;


app.listen(port, () => console.log(`listening on port:${port}`));
