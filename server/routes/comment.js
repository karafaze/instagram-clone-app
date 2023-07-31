const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const authentificationCheck = require('../middlewares/jwt-validator');

// add new comment to a post

router.get(
	'/:postId/all',
	// authentificationCheck,
	commentController.getComments
)

router.post(
	"/:postId/add",
    authentificationCheck,
    commentController.addComment
)

module.exports = router;
