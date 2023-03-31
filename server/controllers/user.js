const User = require("../models/user");

exports.getUser = (req, res) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId })
        .then((user) => {
            const userData = {
                username: user.username,
                avatarUrl: user.avatarUrl,
                bio: user.bio,
                followedByLength: user.followedBy.length,
                followedBy: user.followedBy,
                followingLength: user.following.length,
                following: user.following,
                postsLength: user.posts.length,
                posts: user.posts,
            };
            res.status(200).json({
                status: "OK",
                data: userData,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "FAILED",
                error: err,
            });
        });
};
