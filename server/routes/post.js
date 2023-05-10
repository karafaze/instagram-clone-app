const express = require("express");
const router = express.Router();
const authentificationCheck = require("../middlewares/jwt-validator");
const multer = require("../middlewares/multer");
const postController = require('../controllers/post')

router.post("/:userId", authentificationCheck, multer, postController.createPost);
router.get("/:userId/all", authentificationCheck, postController.getAllPosts)


module.exports = router;