const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 async function register(req, res) {
    const { username, password } = req.body; 
    const isuserExist =await userModel.findOne({ username: username });
    if (isuserExist) {
        return res.status(400).json({ message: "User already exists" });
    }   
    const newUser = await userModel.create({ username, password: password });
    return res.status(201).json({ message: "User registered successfully", user: newUser });
}

async function login(req, res)  {
   const { username, password } = req.body;
   const user = await userModel.findOne({ username: username });    
    if (!user) {
        return res.status(400).json({ message: "Invalid username " });
    }
    const isPasswordValid = await password === user.password;
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET        
    );
    res.cookie("token",token);
    return res.status(200).json({ message: "Login successful", user: user });
}

async function userProfile(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }               
}




module.exports = { register, login, userProfile };
