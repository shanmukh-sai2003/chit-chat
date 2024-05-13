import express from "express";
import cors from 'cors';
import logger from 'morgan';
import cookieParser from "cookie-parser";
import makeDbConnection from './connection.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

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

// Routes setup
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/messages', messageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
});