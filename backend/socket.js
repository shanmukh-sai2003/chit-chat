import jwt from "jsonwebtoken";
import User from './models/user.js';
import dotenv from 'dotenv';
dotenv.config();

function initializeIO(io) {
    return io.on('connection', async (socket) => {
        console.log('socket id: ', socket.id);
        const token = socket.handshake.auth.token;
        if (!token) {
            return
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

        const user = await User.findById(decoded?.userInfo?.userId).select("-password -__v");
        if(!user) {
            return
        }

        console.log('userId:', user._id.toString());
        socket.join(user._id.toString());

        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
        });

        socket.on('typing', (chatId) => {
            socket.in(chatId).emit('typing', chatId);
        });

        socket.on('stopTyping', (chatId) => {
            socket.in(chatId).emit('stopTyping', chatId);
        });
    });
}

function emitEvent(req, roomId, eventMessage, data) {
    req.app.get('io').in(roomId).emit(eventMessage, data);
}

export { initializeIO, emitEvent };