 const postModel = require("../models/post.model");
const { generateImageCaption } = require("../services/gemini.service");

async function Post(req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  const base64Image = file.buffer.toString("base64");
   
  try {
    const captionResponse = await generateImageCaption(base64Image);

    res.status(200).json({ captionResponse });
  } catch (error) {
    console.error("Error generating caption:", error);
    res.status(500).json({ error: "Failed to generate caption" });
  }
}

module.exports = Post;
