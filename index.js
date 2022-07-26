const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const serverConfig = require('./config/server.config');
const dbConfig = require("./config/db.config");
const User = require('./model/user.model')

const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", async () => {
    // await User.collection.drop();
    // await User.create({
    //     name: "Vijayanand",
    //     userId: 1,
    //     password: bcrypt.hashSync("password", 10),
    //     email: "abc@gmail.com",
    //     userType: "ADMIN"
    // });

    console.log("Connected to mongoDB");
});

const PORT = serverConfig.PORT;

require('./router/auth.route')(app)
require('./router/user.route')(app)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})