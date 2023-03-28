const User = require('../models/user');

exports.getUserProfile = (req, res) => {
    const {userId} = req.auth;
    User.findOne({ _id: userId})
        .then((user) => {
            console.log(user)
        })
        .catch(err => {
            return res.status(500).json({
                status: 'FAILED',
                error: err
            })
        })
    res.status(200).json({
        status: 'OK',
        message: 'You got in'
    })
}