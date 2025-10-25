const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 100,
        min: 0,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
