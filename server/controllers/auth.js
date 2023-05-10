const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = (req, res) => {
    if (req.body.username === '' ){
        return res.status(400).json({
            status: 'FAILED',
            field: 'username',
            error: 'You need to enter a username'
        })
    }
    if (req.body.password === '' ){
        return res.status(400).json({
            status: 'FAILED',
            field: 'password',
            error: 'No password ?'
        })
    }
    // we first check in the database if the user already exists
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                // if he does not exists, we return 400 status code
                // with custom message
                return res.status(400).json({
                    status: "FAILED",
                    field: "username",
                    error: "Oops, this user is not registered on this platform.",
                });
            }
            // else if user exists we now check for a password match with bcrypt
            bcrypt.compare(req.body.password, user.password).then((data) => {
                if (!data) {
                    return res.status(400).json({
                        status: "FAILED",
                        field: "password",
                        error: "Oops, the password is not correct.",
                    });
                }
                // if passwords math, we create a token using JWT
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: "24h" }
                );
                // we return a 200 status code with an object containing
                // the userId and its token
                return res.status(200).json({
                    status: "OK",
                    userId: user._id,
                    token: token,
                });
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "FAILED",
                field: "internal",
                error: err,
            });
        });
};

exports.register = (req, res) => {
    // retrieve inputs from req.body
    const { username, email, password } = req.body;
    const saltRounds = 10;
    bcrypt
        // hash the password using bcrypt
        .hash(password, saltRounds)
        .then((hashedPassword) => {
            // if ok, we create the user and store
            // username, email, hashedpassword
            const avatarUrl = `${req.protocol}://${req.get(
                "host"
            )}/default/default_avatar.jpeg`;
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                avatarUrl: avatarUrl,
            });
            user.save().then(() => {
                return res.status(201).json({
                    status: "OK",
                    data: {
                        message: `New user ${username} created`,
                    },
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