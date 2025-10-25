 const PostModel = require("../models/post.model");
const { generateImageCaption } = require("../services/gemini.service");
const { uploadImage } = require("../services/cloude.service");
const { v4: uuidv4 } = require("uuid");

// Create a new post (auth required)
async function Post(req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  const base64Image = file.buffer.toString("base64");

  try {
    const style = req.body?.style || 'default';
    const captionResponse = await generateImageCaption(base64Image, style);
    const uploadResponse = await uploadImage(base64Image, `${uuidv4()}.jpg`);

    // deduct points if possible
    if ((req.user.points ?? 0) < 10) {
      return res.status(400).json({ error: 'Not enough points' });
    }
    req.user.points = (req.user.points || 0) - 10;
    await req.user.save();

    const post = await PostModel.create({
      caption: captionResponse,
      style,
      user: req.user._id,
      image: uploadResponse.url,
    });

    return res.status(200).json({ post, points: req.user.points });
  } catch (error) {
    console.error("Error generating caption or uploading image:", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
}

// Generate caption only (no auth, no save)
async function CaptionOnly(req, res) {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No image file provided" });
  const base64Image = file.buffer.toString("base64");
  try {
    const style = req.body?.style || 'default';
    const captionResponse = await generateImageCaption(base64Image, style);
    return res.status(200).json({ caption: captionResponse });
  } catch (error) {
    console.error("Error generating caption:", error);
    return res.status(500).json({ error: "Failed to generate caption" });
  }
}

// Get posts for current user
async function GetMyPosts(req, res) {
  try {
    const posts = await PostModel.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
}

module.exports = { Post, CaptionOnly, GetMyPosts };
