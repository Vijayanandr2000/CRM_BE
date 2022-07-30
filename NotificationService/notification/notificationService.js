const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();



module.exports = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })