const express = require("express");
const cors = require('cors');
const app = express();
const userRouter = require('./routes/user.router.js');
const authRouter = require('./routes/auth.router.js');
require('dotenv').config();
const { createTables } = require('./db/db.js');

createTables();




app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);



const port = 4000;


app.listen(port, () => console.log(`listening on port:${port}`));
