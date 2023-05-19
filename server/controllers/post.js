const Post = require("../models/post");
const User = require('../models/user');

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
                        message: "Your post has been created !",
                    });
                })
                .catch(() =>
                    res.status(500).json({
                        err: "Sorry an error occured during the creation of your post",
                    })
                );
        })

};

exports.getAllPosts = (req, res) => {
    Post.find({owner: req.params.userId})
        .then(posts => {
            if (!posts){
                return res.status(400).json({
                    status:'FAILED',
                    message: 'No posts linked to this account'
                })
            }
            const allUsersInLike = posts.map(post => {
                return post.likes.map(like => like.user.toString())
            }).flat()

            let uniqueUsersIdInLike = [];
            for (let userId of allUsersInLike){
                if (!uniqueUsersIdInLike.includes(userId)){
                    uniqueUsersIdInLike.push(userId)
                }
            }
            if (uniqueUsersIdInLike.length > 0){
                User.find({_id: {$in: uniqueUsersIdInLike}})
                    .then(users => {
                        let userLikeList = users.map(user => {
                            return {
                                username: user.username,
                                avatarUrl: user.avatarUrl,
                                userId: user._id.toString()
                            }
                        })
                        const payload = {
                            posts: formatPostListData(posts),
                            likes: userLikeList
                        }
                        return res.status(200).json({
                            status: 'OK', 
                            data: payload
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            status: 'FAILED',
                            error: err.message
                        })
                    })
            } else {
                const payload = {
                    posts: formatPostListData(posts),
                    likes: []
                }
                return res.status(200).json({
                    status: 'OK',
                    data: payload
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                status:'FAILED',
                message: 'Error : ' + err 
            })
        })
}

exports.addLikeToPost = async (req, res) => {
    const {userId, postId} = req.body;
    const post = await Post.findOne({_id: postId})
    const user = await User.findById({_id: userId})
    let existing = post.likes.find(id => id.user.toString() == user._id.toString())
    if (existing){
        return res.status(400).json({
            status :'FAILED',
            error: 'You already like this post'
        })
    }
    post.likes.unshift({user: user._id})
    await post.save()
    res.status(200).json({
        status: 'OK',
        data : formatPostData(post)
    })
}

exports.removeLikeFromPost = async (req, res) => {
    const {userId, postId} = req.body;
    const post = await Post.findOne({_id: postId})
    const user = await User.findById({_id: userId})
    const existing = post.likes.find(id => id.user.toString() == user._id.toString())
    if (!existing){
        return res.status(400).json({
            status :'FAILED',
            error: 'You need to like the post first'
        })
    }

    const removeIndex = post.likes.map(id => id.user.toString().indexOf(userId))
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
        comments: post.likes.map(id => id.user),
        pictureUrl: post.pictureUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }
}