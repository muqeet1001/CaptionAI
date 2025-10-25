const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    caption: { type: String, required: true },
    style: { type: String, enum: ['default','funny','humorous','informative','poetic','edgy'], default: 'default' },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
