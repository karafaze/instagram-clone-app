const express = require("express");
const router = express.Router();
const authentificationCheck = require("../middlewares/jwt-validator");
const userControllers = require("../controllers/user");

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

router.get("/:userId", authentificationCheck, userControllers.getUser);

module.exports = router;
