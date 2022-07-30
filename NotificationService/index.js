const express = require('express');
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.use(express.json());

let PORT = process.env.PORT || 8081;

app.listen(PORT, ()=>{
    console.log(`Server Started ${PORT}`);
})