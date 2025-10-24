const express = require("express");
const { tokenVerification } = require("../middleware/auth.middleware");
const multer = require("multer");
const {Post} = require("../controllers/post.controllers"); // no braces
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/post",
  tokenVerification,
  upload.single("image"),
  Post // pass the function, not called
);

module.exports = router;
