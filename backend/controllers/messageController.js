import Chat from '../models/chat.js';
import Message from '../models/message.js';
import { body, validationResult, param } from 'express-validator';

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId }).populate('sender', '-password -__v').sort({ sentAt: -1 }).exec();
        const response = {
            success: true,
            data: messages,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
}

export const createMessage = [
    body('content').trim().notEmpty().withMessage("message is required").escape(),
    param('chatId').trim().notEmpty().withMessage("chatId is required").escape().custom( async value => {
        const chat = await Chat.findById(value);
        if(!chat) {
            throw new Error('no such chat exists');
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
            await message.populate('sender');

            const chat = await Chat.findById(chatId);
            chat.lastMessage = message._id;
            chat.updatedAt = new Date();
            await chat.save();

            res.status(200).json({ success: true, message: "message sent", data: message });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
];

export const deleteMessage = async (req, res) => {
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

export const deleteAllMessages = [
    param('chatId').trim().notEmpty().withMessage("chatId is required").escape().custom( async value => {
        const chat = await Chat.findById(value);
        if(!chat) {
            throw new Error('no such chat exists');
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