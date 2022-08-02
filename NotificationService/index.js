const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(dbConfig.DB_URL, () => {
    console.log("Connected to MongoDB")
}, err => {
    console.log('Error while connecting to MongoDB', err.message)
})

let PORT = process.env.PORT || 8081;

require('./router/notification')(app);
require('./schedular/emailSchedular');

app.listen(PORT, ()=>{
    console.log(`Server Started ${PORT}`);
})