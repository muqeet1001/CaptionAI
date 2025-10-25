const express = require('express');
const {register,login,userProfile} = require('../controllers/authController.register');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', userProfile);

module.exports = router;
