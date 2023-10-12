const express = require("express");
const cors = require('cors');
const app = express();
const userRouter = require('./routes/user.router.js');
const authRouter = require('./routes/auth.router.js');
require('dotenv').config();
const { createTable } = require('./db/db.js');


createTable(
  `CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password TEXT NOT NULL
  );`
);

createTable(
  `CREATE TABLE IF NOT EXISTS "todo" (
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id)
      );`
);




app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);



const port = 4000;


app.listen(port, () => console.log(`listening on port:${port}`));
