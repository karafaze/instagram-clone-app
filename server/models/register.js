const { body } = require("express-validator");
const User = require("./user");

const schema = [
    body("username")
        .not()
        .isEmpty()
        .bail()
        .withMessage("You need to choose a username.")
        .trim()
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
    body("email")
        .not()
        .isEmpty()
        .bail()
        .withMessage("You must enter an email address.")
        .trim()
        .isEmail()
        .withMessage("You must enter a valid email address.")
        .custom((email) => {
            return User.findOne({ email: email }).then((user) => {
                if (user) {
                    return Promise.reject("This email is already used.");
                }
            });
        }),
    body("password")
        .isStrongPassword({
            minLength: 5,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
            returnScore: false,
        })
        .withMessage(
            "Password weak. It must respect a combination of upper case, lower case, number and symbols."
        ),
    body("passwordConfirm")
        .custom((passwordConfirm, {req}) => passwordConfirm === req.body.password)
        .withMessage("The passwords do not match"),
];

module.exports = ("registerSchema", schema);