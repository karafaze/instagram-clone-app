const { body } = require("express-validator");

const schema = [
    body('title')
        .not()
        .isEmpty()
		.withMessage('You need to add a title')
        .bail()
        .trim()
        .isLength({min:2, max:50})
        .withMessage('The title\'s length must be between 1 and 50 characters')
        ,
    body('description')
        .optional(true)
        .isLength({max:200})
        .withMessage('The description cannot exceed 200 characters')
]

module.exports = ("addPostSchema", schema);
