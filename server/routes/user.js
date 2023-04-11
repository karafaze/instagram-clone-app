const express = require("express");
const router = express.Router();
const authentificationCheck = require("../middlewares/jwt-validator");
const userControllers = require("../controllers/user");
const multer = require("../middlewares/multer");
const editUserSchema = require("../models/edituser");
const validateUserInputs = require("../middlewares/signup-validator");

// used for Postman mainly
const User = require("../models/user");
router.get("/", (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json({
                status: "OK",
                data: users,
            });
        })
        .catch((err) => res.status(500).json({ status: "FAILED", error: err }));
});

// official routes
router.get(
    "/:userId", 
    authentificationCheck, 
    userControllers.getUser
);

router.post(
    "/:userId/follow",
    authentificationCheck,
    userControllers.editUserFollow
);

router.put(
    "/:userId",
    authentificationCheck,
    multer,
    // editUserSchema will check if the user's inputs match our requirements
    editUserSchema,
    // validateUserInputs will then check for errors
    // if errors : returns 400 status code and an array of errors + messages
    // if no errors : calls next()
    validateUserInputs,
    userControllers.editUserProfile
);

router.put(
    "/:userId/follow",
    authentificationCheck,
    userControllers.editUserFollow
);
module.exports = router;
