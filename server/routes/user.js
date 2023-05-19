const express = require("express");
const router = express.Router();
const authentificationCheck = require("../middlewares/jwt-validator");
const userControllers = require("../controllers/user");
const multer = require("../middlewares/multer");
const editUserSchema = require("../models/modelvalidation/edituser");
const validateUserInputs = require("../middlewares/signup-validator");

// test used for Postman mainly or accessing all raw users 
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

// route for authgard component
router.get('/protected/:userId', authentificationCheck, (req, res) => {
    res.status(200).json({
        status:'OK',
        message:'Authorized to go forward'
    })
})

// official routes
router.get(
    "/:userId", 
    authentificationCheck, 
    userControllers.getUserById
);

router.get("/profilefeed/:userId", 
    authentificationCheck,
    userControllers.getFeedData
);

router.get("/search/:username",
    authentificationCheck,
    userControllers.getUserByName)

router.put(
    "/:userId/follow",
    authentificationCheck,
    userControllers.addFollow
);
router.put(
    "/:userId/unfollow",
    authentificationCheck,
    userControllers.removeFollow
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

module.exports = router;
