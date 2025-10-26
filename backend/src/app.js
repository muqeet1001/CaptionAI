require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
 
const connectDB = require("./db/db");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", authRoute);
app.use("/", postRoute);

module.exports = app;
