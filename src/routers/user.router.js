const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

router.get('/users/:userId', authMiddleware.checkToken, userController.getUser);
router.put('/users/:userId', authMiddleware.checkToken, userController.updateUser);
router.delete('/users/:userId', authMiddleware.checkToken, userController.deleteUser);
router.get('/users', userController.getAllUsers);

module.exports = router;
