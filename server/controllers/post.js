const Post = require("../models/post");
const User = require('../models/user');
const Comment = require('../models/comment');

exports.createPost = (req, res) => {
    if (req.auth.userId !== req.params.userId) {
        return res.status(401).json({
            status: "FAILED",
            error: "Unauthorized request",
        });
    }
    const {title, description = ''} = req.body
    const filename = req.files.postpicture[0].filename
    const imageUrl = `${req.protocol}://${req.get('host')}/pictures/${filename}`;
    User.findById({_id: req.auth.userId})
        .then(user => {
            if (!user){
                return res.status(400).json({
                    status: 'FAILED',
                    error:'User not found'
                })
            };
            const post = new Post({
                title: title,
                description: description,
                owner: user._id,
                likes: [],
                comments: [],
                pictureUrl: imageUrl,
            })
            post
                .save()
                .then(() => {
                    res.status(201).json({
						status: 'OK',
                        message: "Your post has been created !",
                    });
                })
                .catch(() =>
                    res.status(500).json({
						status:'FAILED',
                        err: "Sorry an error occured during the creation of your post",
                    })
                );
        })

};

exports.getAllPosts = async(req, res) => {
		// retrieve all posts from a specific user
		const posts = await Post.find({owner: req.params.userId})
		if (!posts){
			return res.status(500).json({
				status:'FAILED',
				message:'No posts linked to this account'
			})
		}

		let allUsersInLike = []
		// map array of posts and return all userId that liked a picture
		allUsersInLike = posts.map(post => {
			return post.likes.map(like => like.user.toString())
		}).flat();

		// reduce list to get only one userId per user
		let uniqueUsersIdInLike = [];
		for (let userId of allUsersInLike) {
			if (!uniqueUsersIdInLike.includes(userId)) {
				uniqueUsersIdInLike.push(userId)
			}
		}
		// need to format usersLikeList
		const users = await User.find({_id: {$in: uniqueUsersIdInLike}})

		let userLikeList = users.map(user => {
			return {
				username: user.username,
				avatarUrl: user.avatarUrl,
				userId: user._id.toString()
			}
		})

		// retrieve all post id from user
		const allUserPostId = posts.map(post => post._id.toString())

		// retrieve all comments from DB
		const comments = await Comment.find()
		// allComments should only contains comments that were linked to a post from user
		let allComments = [];
		// for each comment, if postId is in allUserPostId, we include it into allComments list
		for (let comment of comments){
			if (allUserPostId.includes(comment.post.toString())){
				allComments.push(comment)
			}
		}

		return res.status(200).json({
			status: 'OK',
			data: {
				posts: formatPostListData(posts),
				likes: userLikeList,
				comments: allComments,
			}
		})
}

exports.addLikeToPost = async (req, res) => {
    const {userId, postId} = req.body;
	// get requested post and user objects from DB
    const post = await Post.findOne({_id: postId})
    const user = await User.findById({_id: userId})

	// first check that user does not likes the post yet
    let existing = post.likes.find(id => id.user.toString() == user._id.toString())
    if (existing){
        return res.status(400).json({
            status :'FAILED',
            error: 'You already like this post'
        })
    }

	// else we add the user to post likes array
    post.likes.unshift({user: user._id})

    await post.save()
    res.status(200).json({
        status: 'OK',
        data : formatPostData(post)
    })
}

exports.removeLikeFromPost = async (req, res) => {
    const {userId, postId} = req.body;
	// get requested post and user objects from DB
    const post = await Post.findOne({_id: postId})
    const user = await User.findById({_id: userId})

	// check that user is in post likes array
    const existing = post.likes.find(id => id.user.toString() == user._id.toString())
    if (!existing){
        return res.status(400).json({
            status :'FAILED',
            error: 'You need to like the post first'
        })
    }

	// if he is, we retrieve the index of the user in the array
	const removeIndex = post.likes.findIndex(userObj => userObj.user.toString() == user._id.toString())
	// use splice methods to remove it with index
    post.likes.splice(removeIndex, 1)

    await post.save()
    res.status(200).json({
        status: 'OK',
        data: formatPostData(post)
    })
}

function formatPostListData(postList) {
    return postList.map(post => formatPostData(post))
}

function formatPostData(post) {
    return {
        _id: post._id,
        title: post.title,
        description: post.description,
        owner: post.owner,
        likes: post.likes.map(id => id.user),
        comments: post.comments.map(id => id.comment.toString()),
        pictureUrl: post.pictureUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }
}
