const User = require("../models/user");
const path = require("path");
const fs = require("fs");

exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then((user) => {
            const userData = {
                userId: user._id,
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

exports.editUserProfile = (req, res) => {
    // check if another user is trying to modify another account
    if (req.auth.userId !== req.params.userId) {
        return res.status(401).json({
            status: "FAILED",
            error: "Unauthorized request",
        });
    } 

    User.findOne({ _id: req.params.userId })
        .then((user) => {
            // initialize updates object to take in req.body key and values
            let updates = {};
            for (const key in req.body) {
                updates[key] = req.body[key];
            }
            // if user sent a file to modify its profile picture
            if (req.file) {
                // we first initialize oldAvatarPath with value = null
                let oldAvatarPath = null;
                // now we check if the user is still using the picture by default assigned
                // at the creation (in public/default) or if he's using a custom on (in public/uploads)
                if (user.avatarUrl.includes("/uploads/")) {
                    // if he's using a custom picture
                    // we want to retrieve the full path of the current picture
                    // to delete if with fs.unlink below
                    oldAvatarPath = path.join(__dirname, "../public/uploads/");
                    oldAvatarPath += user.avatarUrl.split("/uploads/")[1];
                }
                // we add to updates object the new avatarUrl for incoming picture
                updates["avatarUrl"] = `${req.protocol}://${req.get(
                    "host"
                )}/uploads/${req.file.filename}`;
                // below we update user with updates object and 
                // make sure we delete the previous picture from storage
                User.findOneAndUpdate({ _id: req.params.userId }, updates)
                    .then(() => {
                        if (oldAvatarPath) {
                            fs.unlink(oldAvatarPath, (err) => {
                                if (err) console.log(err);
                            });
                        }
                        return res.status(200).json({
                            status: "OK",
                            message: "Profile updated successfully",
                        });
                    })
                    .catch((err) =>
                        res.status(500).json({ error: err.message })
                    );
            } else {
                // no picture was added, so we simply update user
                User.findOneAndUpdate({ _id: req.params.userId }, updates)
                    .then(() => {
                        return res.status(200).json({
                            status: "OK",
                            message: "Profile updated successfully",
                        });
                    })
                    .catch((err) =>
                        res.status(500).json({ error: err.message })
                    );
            }
        })
        .catch((err) => res.status(500).json({ error: err.message }));
};

exports.editUserFollow = (req, res) => {
    // this controller will update 2 profiles : 
        // 1/ the user receving the follow/unfollow
        // 2/ the user sending the follow/unfollow

    // step 1 :
        // we want to update the followedBy user RECEIVING with the sending userId
            // if it's 1 : it means we add the user to the array
            // if it's -1 : it means we remove the user from the array

    // step 2 : 
        // we want to update the following user SENDING with the receiving userId
            // if it's 1 : it means we add the user to the array
            // if it's -1 : it means we remove the user from the array

    const {profileUserId, number, loggedUserId} = req.body;
    if (number === 1){
        User.findOneAndUpdate(
            {_id: profileUserId}, 
            {$push: {followedBy: loggedUserId}},
            {new:true},
        ).then((updatedUser) => {
            User.findOneAndUpdate(
                {_id: loggedUserId},
                {$push: {following: profileUserId}}
            ).then(() => {
                const userData = {
                    userId: updatedUser._id,
                    username: updatedUser.username,
                    avatarUrl: updatedUser.avatarUrl,
                    bio: updatedUser.bio,
                    followedByLength: updatedUser.followedBy.length,
                    followedBy: updatedUser.followedBy,
                    followingLength: updatedUser.following.length,
                    following: updatedUser.following,
                    postsLength: updatedUser.posts.length,
                    posts: updatedUser.posts,
                };
                return res.status(200).json({
                    status: "OK",
                    data: userData
                })
            }).catch(err => {
                return res.status(500).json({
                    status: 'FAILED',
                    error: err.message
                })
            })
        }).catch(err => {
            return res.status(500).json({
                status: 'FAILED',
                error: err.message
            })
        })
    } else if (number === -1){
        User.findOneAndUpdate(
            {_id: profileUserId}, 
            {$pull: {followedBy: loggedUserId}},
            {new:true}
        ).then((updatedUser) => {
            User.findOneAndUpdate(
                {_id: loggedUserId},
                {$pull: {following: profileUserId}}
            ).then(() => {
                const userData = {
                    userId: updatedUser._id,
                    username: updatedUser.username,
                    avatarUrl: updatedUser.avatarUrl,
                    bio: updatedUser.bio,
                    followedByLength: updatedUser.followedBy.length,
                    followedBy: updatedUser.followedBy,
                    followingLength: updatedUser.following.length,
                    following: updatedUser.following,
                    postsLength: updatedUser.posts.length,
                    posts: updatedUser.posts,
                };
                return res.status(200).json({
                    status: "OK",
                    data: userData
                })
            }).catch(err => {
                return res.status(500).json({
                    status: 'FAILED',
                    error: err.message
                })
            })
        }).catch(err => {
            return res.status(500).json({
                status: 'FAILED',
                error: err.message
            })
        });
    }
}