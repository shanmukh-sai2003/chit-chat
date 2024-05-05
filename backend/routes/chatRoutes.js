const express = require('express');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('', authController.verifyAccessToken, chatController.getAllChats);

router.post('/:receiverId', authController.verifyAccessToken, chatController.createChat);

router.delete('/:chatId', authController.verifyAccessToken, chatController.deleteChat);

module.exports = router;