require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
 
const connectDB = require("./db/db");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
connectDB();
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", authRoute);
app.use("/", postRoute);

module.exports = app;
