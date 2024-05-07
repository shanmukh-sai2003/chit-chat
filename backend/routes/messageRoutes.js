import express from 'express';
import { verifyAccessToken } from '../controllers/authController.js';
import { getAllMessages, createMessage, deleteAllMessages, deleteMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/:chatId', verifyAccessToken, getAllMessages);

router.post('/:chatId', verifyAccessToken, createMessage);

router.delete('/clear/:chatId', verifyAccessToken, deleteAllMessages);

router.delete('/:messageId', verifyAccessToken, deleteMessage);

export default router;