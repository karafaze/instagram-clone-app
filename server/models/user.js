const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: {type: Array, default: [], required: false},
    following: {type: Array, default: [], required: false},
    followedBy: {type: Array, default: [], required: false},
    bio: {type: String, default: null, required: false},
    avatarUrl: {type: String, default: null, required: false}
});

module.exports = mongoose.model("User", userSchema);
