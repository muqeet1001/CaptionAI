const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existing = await userModel.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ username, password: hash });
    const safeUser = { _id: newUser._id, username: newUser.username, points: newUser.points };
    return res.status(201).json({ message: 'User registered successfully', user: safeUser });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

async function login(req, res)  {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    const safeUser = { _id: user._id, username: user.username, points: user.points };
    return res.status(200).json({ message: 'Login successful', user: safeUser });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

async function userProfile(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { register, login, userProfile };
