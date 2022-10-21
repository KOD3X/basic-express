'use strict';

const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');
const login_controller = require('../controllers/login.controller');

router.post('/signup', user_controller.createUser);
router.post('/login', login_controller.login);

module.exports = router;
