const Chat = require('../models/chat');
const message = require('../models/message');
const Message = require('../models/message');
const { body, validationResult, param } = require('express-validator');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId }).populate('sender', '-password -__v').exec();
        const response = {
            success: true,
            data: messages,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
}

exports.createMessage = [
    body('content').trim().notEmpty().withMessage("message is required").escape(),
    param('chatId').trim().notEmpty().withMessage("chatId is required").escape().custom( async value => {
        const chat = await Chat.findById(value);
        if(!chat) {
            throw new Error('no such chat exsists');
        }
    }),

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                const response = {
                    success: false,
                    message: errors.array()[0].msg
                };

                return res.status(400).json(response);
            }

            const content = req.body.content;
            const userId = req.user.userInfo.userId;
            const chatId = req.params.chatId;

            const message = new Message({ sender: userId, chatId: chatId, content: content });
            await message.save();

            res.status(200).json({ success: true, message: "message sent" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
];

exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.messageId);
        const response = {
            success: true,
            message: "message deleted"
        };

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.deleteAllMessages = [
    param('chatId').trim().notEmpty().withMessage("chatId is required").escape().custom( async value => {
        const chat = await Chat.findById(value);
        if(!chat) {
            throw new Error('no such chat exsists');
        }
    }),

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const response = {
                success: false,
                message: errors.array()[0].msg
            };

            return res.status(400).json(response);
        }
        
        try {
            await Message.deleteMany({ chatId: req.params.chatId });
            res.status(200).json({ success: true, message: "chat cleared" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
];