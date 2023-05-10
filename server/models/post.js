const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        owner: { type: String },
        likes: { type: Array, default: [] },
        comments: { type: Array, default: [] },
        pictureUrl: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
