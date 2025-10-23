const express = require("express");
const { tokenVerification } = require("../middleware/auth.middleware");
const multer = require("multer");
const { Post } = require("../controllers/post.controllers");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/post", tokenVerification, 
    upload.single('image'),Post);

module.exports = router;
