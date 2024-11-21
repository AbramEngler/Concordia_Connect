// server/models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({  
    name: String,  
    email: String,
    password: String,
    deletedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] // Array of deleted message IDs
});
const User = mongoose.model('User', userSchema);
module.exports = User;