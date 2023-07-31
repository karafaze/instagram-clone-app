const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");

exports.getComments = (req, res) => {
    Comment.find()
        .then((comments) => {
            res.status(200).json({
                status: "OK",
                data: comments,
            });
        })
        .catch((err) => res.status(500).json({ status: "FAILED", error: err }));
};

exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { comment, userId } = req.body;

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id: postId });

    const newComment = new Comment({
        owner: user._id,
        post: post._id,
        content: comment,
		username: user.username,
		avatarUrl: user.avatarUrl,
    });

	await newComment.save();

    post.comments.unshift({ comment: newComment._id });
	await post.save();

    res.status(200).json({
        status: "OK",
        comment: newComment,
        data: {
            user: user.username,
            comment: comment,
            post: postId,
        },
    });
};
