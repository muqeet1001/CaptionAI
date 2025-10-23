const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;