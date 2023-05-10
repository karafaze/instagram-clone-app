const Post = require("../models/post");

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
    const post = new Post({
        title: title,
        description: description,
        owner: req.auth.userId,
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
};

exports.getAllPosts = (req, res) => {
    console.log('recevied')
    Post.find({owner: req.auth.userId})
        .then(posts => {
            if (!posts){
                return res.status(400).json({
                    status:'FAILED',
                    message: 'No posts linked to this account'
                })
            }
            console.log(posts)
            return res.status(200).json({
                status: 'OK',
                data: posts
            })
        })
        .catch(err => {
            return res.status(500).json({
                status:'FAILED',
                message: 'Error occured on the server side'
            })
        })
}