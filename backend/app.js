const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const makeDbConnection = require('./connection');
const userRouter = require('./routes/userRoutes');
const chatRouter = require('./routes/chatRoutes');
require('dotenv').config();

const app = express();

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Database connection
makeDbConnection();

// Routes setup
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chats', chatRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
});