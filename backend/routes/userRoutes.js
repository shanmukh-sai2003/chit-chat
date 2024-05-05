const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('', authController.verifyAccessToken, userController.getAllUsers);

router.post('', userController.createUser);

router.post('/login', userController.userLogin);

router.delete('/logout',);

router.put('',);

router.get('/refresh', authController.verifyRefreshToken);

module.exports = router;