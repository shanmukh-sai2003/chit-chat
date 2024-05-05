const express = require('express');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.get('/:chatId', authController.verifyAccessToken, messageController.getAllMessages);

router.post('/:chatId', authController.verifyAccessToken, messageController.createMessage);

router.delete('/clear/:chatId', authController.verifyAccessToken, messageController.deleteAllMessages);

router.delete('/:messageId', authController.verifyAccessToken, messageController.deleteMessage);

module.exports = router;