 const postModel = require("../models/post.model");
const { generateImageCaption } = require("../services/gemini.service");
const { uploadImage } = require("../services/cloude.service");
const { v4: uuidv4 } = require("uuid");

// Controller for creating a new post
async function Post(req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  // Convert to base64 with proper prefix
  const base64Image =  file.buffer.toString("base64");


  try {
    // Generate caption (via your Gemini API service)
    const captionResponse = await generateImageCaption(base64Image);

    // Upload image to ImageKit
    const uploadResponse = await uploadImage(base64Image, `${uuidv4()}.jpg`);

    console.log("Upload response:", uploadResponse); // debug

    // Save post to MongoDB
    const post = await postModel.create({
      caption: captionResponse,
      userId: req.user.id,
      imageUrl: uploadResponse.url,
    });

    console.log("Saved post:", post); // debug
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error generating caption or uploading image:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}

module.exports = { Post };
