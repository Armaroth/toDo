const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();

console.log(process.env.TEST)

app.use(cors());
app.use(express.json());



const port = 4000;

const users= []

app.listen(port,()=> console.log(`listening on port:${port}`));

app.get("/",async(req, res)=>{
    res.json("request njvdjnvd")
})

app.post("/", async(req, res)=>{
    users.push(req.body.username);
    res.json(`user signed up`);
    console.log(users);
})