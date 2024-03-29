const User = require("../models/user");
const Comment = require('../models/comment');

const path = require("path");
const fs = require("fs");

exports.getUserById = (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then((user) => {
            const userData = getFormattedProfileUserData(user);
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

exports.getUserByName = (req, res) => {
    const { username } = req.params;
    // retrieve list of users containing username constant with regular expressions
    User.find({ username: new RegExp(username) })
        .then((users) => {
            // if list is empty
            // still send good status code with failure message
            if (users.length === 0) {
                return res.status(200).json({
                    status: "FAILED",
                    message: "User not found. Try typing something else...",
                });
            }
            // filter out own user from the list
            let userList = users.filter(
                (user) => String(user._id) !== req.auth.userId
            );
            // format users data to be sent to front-end
            userList = getFormattedSearchUserData(userList);
            return res.status(200).json({
                status: "OK",
                data: userList,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "FAILED",
                message:
                    "An error ocurred on the server-side. Please try again.",
            });
        });
};

exports.getFeedData = (req, res) => {
    User.findById({_id: req.params.userId})
        .then(user => {
            if (!user){
                return res.status(400).json({
                    status:'FAILED',
                    error: 'User not found'
                })
            }
            const userData = {
                username: user.username,
                avatarUrl: user.avatarUrl,
                userId: user._id
            }
            return res.status(200).json({
                status: 'OK',
                data: userData
            })
        })
        .catch(err => {
            return res.status(500).json({
                status: "FAILED",
                error: err.message,
            })
        })
}

// TO MODIFY
exports.editUserProfile = async (req, res) => {
	// check if another user is trying to modify another account
	if (req.auth.userId !== req.params.userId) {
		return res.status(401).json({
			status: "FAILED",
			error: "Unauthorized request",
		});
	}
	// retrieve user from DB
	const user = await User.findOne({_id: req.params.userId})

	// initialize updates object to take in req.body key and values
	let updates = {};
	for (const key in req.body) {
		updates[key] = req.body[key];
	}

	// if file is sent, add it to updates object
	if (req.files.avatar){
		// we first initialize oldAvatarPath with value = null
		let oldAvatarPath = null;
		// we check if the user is still using the picture by default assigned
		// at the creation (in public/default) or if he's using a custom on (in public/uploads)
		if (user.avatarUrl.includes("/uploads/")) {
			// if he's using a custom picture
			// we want to retrieve the full path of the current picture
			// to delete if with fs.unlink
			oldAvatarPath = path.join(__dirname, "../public/uploads/");
			oldAvatarPath += user.avatarUrl.split("/uploads/")[1];
		}
		const newAvatarUrl = `${req.protocol}://${req.get(
			"host"
		)}/uploads/${req.files.avatar[0].filename}`
		// we add to updates object the new avatarUrl for incoming picture
		updates["avatarUrl"] = newAvatarUrl;
	}

	try {
		// update user in DB
		const updatedUser = await User.findOneAndUpdate({_id: req.params.userId}, updates, {new: true})
		// iterate through user comments, and modify its avatar_url and username, then save to DB
		const comments = await Comment.find({owner: req.params.userId});
		if (comments.length > 0){
			for (const comment of comments){
				comment.username = updatedUser.username;
				comment.avatarUrl = updatedUser.avatarUrl;
				await comment.save()
			}
		}
		// return ok status
		return res.status(200).json({
			status: "OK",
			message: "Profile updated successfully",
		});
	} catch(err){
		return res.status(500).json({
			status:'FAILED',
			error: err.message
		})
	}
}

exports.addFollow = async (req, res) => {
    // retrieve parameters from req.body
    const { profileUserId, loggedUserId } = req.body;
    // make sure they are included in the request
    if (!profileUserId || !loggedUserId) {
        return res.status(400).json({
            status: "FAILED",
            error: "Missing required parameters.",
        });
    }
    const profileUserDB = await User.findOne({_id: profileUserId})
    const loggedUserDB = await User.findOne({_id: loggedUserId})
    if (!profileUserDB || !loggedUserDB){
        return res.status(400).json({
            status:'FAILED',
            error: "One or more users we not found in the database. Have you inserted the right id's?"
        })
    }

    const existing = profileUserDB.followedBy.find(id => id.user.toString() == loggedUserId)

    if (existing){
        return res.status(400).json({
            status: 'FAILED',
            error: 'User already followed.'
        })}

    profileUserDB.followedBy.unshift({user: loggedUserDB._id})
    const updatedProfileUser = await profileUserDB.save()
    loggedUserDB.following.unshift({user : profileUserDB._id})
    const updatedLoggedUser = await loggedUserDB.save()

    if (updatedLoggedUser && updatedProfileUser){
        return res.status(200).json({
            status: 'OK',
            data: getFormattedProfileUserData(updatedProfileUser)
        })
    } else {
        return res.status(500).json({
            status: 'FAILED',
            error: 'An error occured on the server-side'
        })
    }
};

exports.removeFollow = async (req, res) => {
    // retrieve parameters from req.body
    const { profileUserId, loggedUserId } = req.body;
    // make sure they are included in the request
    if (!profileUserId || !loggedUserId) {
        return res.status(400).json({
            status: "FAILED",
            error: "Missing required parameters.",
        });
    }
    const profileUserDB = await User.findOne({_id: profileUserId})
    const loggedUserDB = await User.findOne({_id: loggedUserId})
    if (!profileUserDB || !loggedUserDB){
        return res.status(400).json({
            status:'FAILED',
            error: "One or more users we not found in the database. Have you inserted the right id's?"
        })
    }

    const existing = profileUserDB.followedBy.find(id => id.user.toString() == loggedUserId)

    if (!existing){
        return res.status(400).json({
            status: 'FAILED',
            error: 'User not followed yet.'
        })}

    let indexToRemove = profileUserDB.followedBy.map(id => id.user.toString().indexOf(loggedUserId))
    profileUserDB.followedBy.splice(indexToRemove, 1)
    const updatedProfileUser = await profileUserDB.save()
    indexToRemove = loggedUserDB.following.map(id => id.user.toString().indexOf(profileUserId))
    loggedUserDB.following.splice(indexToRemove, 1)
    const updatedLoggedUser = await loggedUserDB.save()

    if (updatedLoggedUser && updatedProfileUser){
        return res.status(200).json({
            status: 'OK',
            data: getFormattedProfileUserData(updatedProfileUser)
        })
    } else {
        return res.status(500).json({
            status: 'FAILED',
            error: 'An error occured on the server-side'
        })
    }
};

// utils functions to be used above
const getFormattedProfileUserData = (userObject) => {
    return {
        userId: userObject._id,
        username: userObject.username,
        avatarUrl: userObject.avatarUrl,
        bio: userObject.bio,
        followedByLength: userObject.followedBy.length,
        followedBy: userObject.followedBy.map(id => id.user.toString()),
        followingLength: userObject.following.length,
        following: userObject.following.map(id => id.user.toString()),
        postsLength: userObject.posts.length,
        posts: userObject.posts,
    };
};

const getFormattedSearchUserData = (arr) => {
    return arr.map((user) => {
        return {
            username: user.username,
            userId: user._id,
            avatarUrl: user.avatarUrl,
            followedBy: user.followedBy.map(id => id.user.toString()),
            following: user.following.map(id => id.user.toString()),
        };
    });
}
