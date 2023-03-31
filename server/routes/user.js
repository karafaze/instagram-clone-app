const express = require('express');
const router = express.Router();
const authentificationCheck = require('../middlewares/jwt-validator');
const userControllers = require('../controllers/user');

// entry points is : user/
router.get('/:userId', authentificationCheck, userControllers.getUser)

module.exports = router;