const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const serverConfig = require('./config/server.config');
const dbConfig = require("./config/db.config");
const User = require('./model/user.model')
const Ticket = require('./model/ticket.model')
const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect("mongodb+srv://flash:Superman123@cluster0.4hzwm7j.mongodb.net/test");
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", async () => {
    // await Ticket.collection.drop()
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
require('./router/ticket.route')(app)

module.exports = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})