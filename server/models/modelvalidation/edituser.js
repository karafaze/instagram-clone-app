const { body } = require("express-validator");
const User = require("../user");

const schema = [
    body("username")
        .optional(true)
        .isLength({min:4, max:12})
        .withMessage('The username\'s length must be between 4 and 12 characters')
        .isAlpha()
        .withMessage("The username must only contains letters.")
        .custom((username) => {
            return User.findOne({ username: username }).then((user) => {
                if (user) {
                    console.log(user)
                    return Promise.reject("This username is already taken.");
                }
            });
        }),
    body('bio')
        .optional(true)
        .isLength({max:150})
        .withMessage('The bio cannot exceed 150 characters')
];

module.exports = ("editUserSchema", schema);