const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const { seedDatabase } = require('./db/db.js');

seedDatabase();

const userRouter = require('./routes/user.router.js');
const authRouter = require('./routes/auth.router.js');
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);

const port = 4000;

app.listen(port, () => console.log(`listening on port:${port}`));
