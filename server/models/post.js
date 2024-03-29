const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        }],
        comments: [{
            comment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            }
         }],
        pictureUrl: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
