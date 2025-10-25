const express = require("express");
const { tokenVerification } = require("../middleware/auth.middleware");
const multer = require("multer");
const { Post, CaptionOnly, GetMyPosts } = require("../controllers/post.controllers");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/post", tokenVerification, upload.single("image"), Post);
router.get("/posts/me", tokenVerification, GetMyPosts);
router.post("/caption", upload.single("image"), CaptionOnly);

module.exports = router;
