const mongoose = require("mongoose");
const { Schema } = mongoose;

const Comment = new Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref:'Post',
			required:true,
		},
        content: { type: String, required: true },
		username: { type: String, required: true },
		avatarUrl: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
