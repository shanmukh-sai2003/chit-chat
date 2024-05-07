import express from 'express';
import { getAllChats, createGroupChat, createChat, deleteChat, getGroupChatDetails, changeGroupName, addParticipant, removeParticipant, leaveChat} from '../controllers/chatController.js';
import { verifyAccessToken } from '../controllers/authController.js';

const router = express.Router();

router.get('', verifyAccessToken, getAllChats);

router.post('/groups', verifyAccessToken, createGroupChat);

router.post('/:receiverId', verifyAccessToken, createChat);

router.delete('/:chatId', verifyAccessToken, deleteChat);

// group chat routes
router.get('/groups/:chatId', verifyAccessToken, getGroupChatDetails);

router.patch('/groups/:chatId', verifyAccessToken, changeGroupName);

router.post('/groups/:chatId/:participantId', verifyAccessToken, addParticipant);

router.delete('/groups/:chatId/leave', verifyAccessToken, leaveChat);

router.delete('/groups/:chatId/:participantId', verifyAccessToken, removeParticipant);

export default router;