const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());



const port = 4000;

const users= []

app.listen(port,()=> console.log(`listening on port:${port}`));

app.get("/",async(req, res)=>{
    res.json(users)

})

app.post("/", async(req, res)=>{
    users.push(req.body.inputValue);
    res.json(`user signed up`);
    console.log(users);
})