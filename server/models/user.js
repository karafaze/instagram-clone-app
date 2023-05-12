const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }, 
    }],
    following: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }, 
    }],
    followedBy: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }, 
    }],
    bio: {type: String, default: null,},
    avatarUrl: {type: String, default: null,}
});

module.exports = mongoose.model("User", userSchema);
