import express from 'express';
import { getAllUsers, createUser, userLogin } from '../controllers/userController.js';
import { verifyAccessToken, verifyRefreshToken } from '../controllers/authController.js';

const router = express.Router();

router.get('', verifyAccessToken, getAllUsers);

router.post('', createUser);

router.post('/login', userLogin);

router.delete('/logout',);

router.patch('',);

router.get('/refresh', verifyRefreshToken);

export default router;