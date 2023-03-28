const express = require('express');
const router = express.Router();
const authentificationCheck = require('../middlewares/jwt-validator');
const userControllers = require('../controllers/user');

router.get('/', authentificationCheck, userControllers.getUserProfile)

module.exports = router;