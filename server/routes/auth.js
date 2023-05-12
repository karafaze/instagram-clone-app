const express = require("express");
const router = express.Router();
const registerSchema = require("../models/modelvalidation/register");
const validateUserInputs = require("../middlewares/signup-validator");
const authControllers = require("../controllers/auth");

router.post("/login", authControllers.login);

router.post(
    "/register",
    // registerSchema will check if the user's inputs match our requirements
    registerSchema,
    // validateUserInputs will then check for errors
    // if errors : returns 400 status code and an array of errors + messages
    // if no errors : calls next()
    validateUserInputs,
    authControllers.register
);

module.exports = router;
