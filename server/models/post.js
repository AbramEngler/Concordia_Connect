const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    body: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    replies: [replySchema]} // Array to store replies
, {timestamps: true // Automatically add a createdAt field
}, { collection: 'post' });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;