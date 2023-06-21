const express = require("express");
const router = express.Router();
const authentificationCheck = require("../middlewares/jwt-validator");
const multer = require("../middlewares/multer");
const postController = require('../controllers/post')
const addPostSchema = require('../models/modelvalidation/addpost');
const validateUserInputs = require('../middlewares/signup-validator')

// testing for postman
const Post = require('../models/post')
router.get('/all', (req, res) => {
	Post.find()
		.then(posts => {
			return res.json({
				status: 'OK',
				posts: posts
			})
		})
})

// official routes
router.post(
	"/:userId",
	authentificationCheck,
	multer,
	addPostSchema,
	validateUserInputs,
	postController.createPost
);

router.get("/:userId/all", authentificationCheck, postController.getAllPosts)
router.put("/:userId/:postId/like", authentificationCheck, postController.addLikeToPost)
router.put("/:userId/:postId/unlike", authentificationCheck, postController.removeLikeFromPost)

module.exports = router;
