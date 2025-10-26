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
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl) or if in allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRoute);
app.use("/", postRoute);

module.exports = app;
