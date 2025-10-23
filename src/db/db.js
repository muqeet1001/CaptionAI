const mongoose = require('mongoose');
require('dotenv').config(); // load .env here or in app.js
 
 function connectDB() {
    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
 }

 
 module.exports = connectDB;