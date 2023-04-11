const User = require("../models/user");
const path = require("path");
const fs = require("fs");

exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then((user) => {
            const userData = getFormattedUserData(user);
            res.status(200).json({
                status: "OK",
                data: userData,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "FAILED",
                error: err.message,
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
                        res.status(500).json({
                            status: "FAILED",
                            error: err.message,
                        })
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
                        res.status(500).json({
                            status: "FAILED",
                            error: err.message,
                        })
                    );
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "FAILED",
                error: err.message,
            });
        });
};

exports.editUserFollow = (req, res) => {
    // retrieve parameters from req.body
    const { profileUserId, number, loggedUserId } = req.body;
    // make sure they are included in the request
    if (!profileUserId || !number || !loggedUserId) {
        return res.status(400).json({
            status: "FAILED",
            error: "Missing required parameters.",
        });
    }

    // we first make sure both users exists in DB beforehand
    User.find({
        _id: {
            $in: [profileUserId, loggedUserId],
        },
    })
        .then((userArray) => {
            // if we don't have two users in array : it means one or more id failed
            if (userArray.length !== 2) {
                return res.status(400).json({
                    status: "FAILED",
                    error: "One or more users we not found in the database. Have you inserted the right id's?",
                });
            }
            // else we go on and look for the profile user in DB
            User.findOne({ _id: profileUserId })
                .then((user) => {
                    // we first look for the loggedUser in the 
                    // profile user followedBy array
                    const existingUser = user.followedBy.find(
                        (userId) => userId === loggedUserId
                    );
                    // if loggedUser wishes to follow, he must not be in the array yet
                    if (number === 1 && existingUser) {
                        return res.status(403).json({
                            status: "FAILED",
                            error: "User already followed.",
                        });
                    }
                    // if he wished to unfollow, he must be in the array
                    if (number === -1 && !existingUser) {
                        return res.status(403).json({
                            status: "FAILED",
                            error: "User not followed yet.",
                        });
                    }

                    // now we can finally update the users array
                    if (number === 1) {
                        // for a follow, we add logged user to array 
                        User.findOneAndUpdate(
                            { _id: profileUserId },
                            { $push: { followedBy: loggedUserId } },
                            { new: true }
                        )
                            .then((updatedUser) => {
                                // then we update loggedUser following array to include profile user
                                User.findOneAndUpdate(
                                    { _id: loggedUserId },
                                    { $push: { following: profileUserId } }
                                )
                                    .then(() => {
                                        // if successfull, we return the formatted user object to be user by front
                                        const userData =
                                            getFormattedUserData(updatedUser);
                                        return res.status(200).json({
                                            status: "OK",
                                            data: userData,
                                        });
                                    })
                                    .catch((err) => {
                                        return res.status(500).json({
                                            status: "FAILED",
                                            error: err.message,
                                        });
                                    });
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    status: "FAILED",
                                    error: err.message,
                                });
                            });
                    } else if (number === -1) {
                        // same operations occur here but we're pull instead of pushing
                        User.findOneAndUpdate(
                            { _id: profileUserId },
                            { $pull: { followedBy: loggedUserId } },
                            { new: true }
                        )
                            .then((updatedUser) => {
                                User.findOneAndUpdate(
                                    { _id: loggedUserId },
                                    { $pull: { following: profileUserId } }
                                )
                                    .then(() => {
                                        const userData =
                                            getFormattedUserData(updatedUser);
                                        return res.status(200).json({
                                            status: "OK",
                                            data: userData,
                                        });
                                    })
                                    .catch((err) => {
                                        return res.status(500).json({
                                            status: "FAILED",
                                            error: err.message,
                                        });
                                    });
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    status: "FAILED",
                                    error: err.message,
                                });
                            });
                    } else {
                        // here we handle the case where neither 1 nor -1 were sent by the front end
                        return res.status(400).json({
                            status: "FAILED",
                            error: "The request was not treated successfully. To fix it, make sure you sent the right parameters.",
                        });
                    }
                })
                .catch((err) => {
                    return res.status(500).json({
                        status: "FAILED",
                        error: err.message,
                    });
                });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "FAILED",
                error: err.message,
            });
        });
};

// utils functions to be used above
const getFormattedUserData = (userObject) => {
    return {
        userId: userObject._id,
        username: userObject.username,
        avatarUrl: userObject.avatarUrl,
        bio: userObject.bio,
        followedByLength: userObject.followedBy.length,
        followedBy: userObject.followedBy,
        followingLength: userObject.following.length,
        following: userObject.following,
        postsLength: userObject.posts.length,
        posts: userObject.posts,
    };
};
