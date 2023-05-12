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
            return res.status(200).json({
                status: 'OK',
                data: posts
            })
        })
        .catch(err => {
            return res.status(500).json({
                status:'FAILED',
                message: 'Error : ' + err 
            })
        })
}