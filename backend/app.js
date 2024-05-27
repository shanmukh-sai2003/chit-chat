import express from "express";
import cors from 'cors';
import logger from 'morgan';
import cookieParser from "cookie-parser";
import makeDbConnection from './connection.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { createServer } from 'http';
import { Server } from "socket.io";
import dotenv from 'dotenv';
import { initializeIO } from "./socket.js";
dotenv.config();

const app = express();
const httpServer = createServer(app);

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
    origin: allowOrigins,
    credentials: true,
}));

// Database connection
makeDbConnection();

// socket.io - setup
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

app.set("io", io);

// Routes setup
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/messages', messageRouter);

initializeIO(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
});