import express from 'express';
import { getAllUsers, createUser, userLogin, userLogout } from '../controllers/userController.js';
import { verifyAccessToken, verifyRefreshToken } from '../controllers/authController.js';
import upload from '../middliwares/handleFileUpload.js';

const router = express.Router();

router.get('', verifyAccessToken, getAllUsers);

router.post('', upload.single('avatar'), createUser);

router.post('/login', userLogin);

router.delete('/logout', userLogout);

router.patch('',);

router.get('/refresh', verifyRefreshToken);

export default router;