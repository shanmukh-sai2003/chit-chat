const express = require('express');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('', authController.verifyAccessToken, chatController.getAllChats);

router.post('/groups', authController.verifyAccessToken, chatController.createGroupChat);

router.post('/:receiverId', authController.verifyAccessToken, chatController.createChat);

router.delete('/:chatId', authController.verifyAccessToken, chatController.deleteChat);

// group chat routes
router.get('/groups/:chatId', authController.verifyAccessToken, chatController.getGroupChatDetails);

router.patch('/groups/:chatId', authController.verifyAccessToken, chatController.changeGroupName);

router.post('/groups/:chatId/:participantId', authController.verifyAccessToken, chatController.addParticipant);

router.delete('/groups/:chatId/leave', authController.verifyAccessToken, chatController.leaveChat);

router.delete('/groups/:chatId/:participantId', authController.verifyAccessToken, chatController.removeParticipant);

module.exports = router;