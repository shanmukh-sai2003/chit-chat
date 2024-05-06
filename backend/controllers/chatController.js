const Chat = require('../models/chat');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.createChat = async (req, res) => {
    try {
        const receiverId = req.params.receiverId;
        const receiver = await User.findById(receiverId).select('-password').exec();
        if(!receiver) {
            const response = {
                success: false,
                message: "No such user with the userId"
            };
            return res.status(400).json(response);
        }

        const userId = req.user.userInfo.userId;
        const exsistingChat = await Chat.find({ isGroupChat: false, participants: { $all: [userId, receiverId] } });
        console.log(exsistingChat);
        if(exsistingChat.length != 0) {
            const response = {
                success: false,
                message: "Already chat exists between the users"
            };

            return res.status(400).json(response);
        }

        const chat = new Chat({ participants: [userId, receiverId] });
        await chat.save();

        const chatCreated = await Chat.findById(chat._id).populate('participants', '-password -__v');

        const response = {
            success: true,
            chatId: chat._id,
            participants: [...chatCreated.participants],
            isGroupChat: chat.isGroupChat,
            createdAt: chat.createAt
        };

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

exports.getAllChats = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        const chats = await Chat.find({ participants: { $elemMatch: { $eq: userId }} }).populate('participants', '-password -__v');

        const response = {
            success: true,
            data: chats
        };

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.deleteChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const response = await Chat.findByIdAndDelete(chatId);

        if(!response) {
            return res.status(400).json({ success: false, message: "chat not deleted no chat exists with the Id" });
        }
        
        res.status(200).json({ success: true, message: "chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error.message);
    }
}

exports.createGroupChat = [
    body('name').trim().notEmpty().withMessage("Group name is required").escape(),
    body('participants').isArray({ min: 2, max: 100}).withMessage("Group should have only 2 to 100 participants"),

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
            const userId = req.user.userInfo.userId;
            const { name, participants } = req.body;
            const chat = new Chat({ groupName: name, admin: userId, isGroupChat: true, participants: [...participants, userId] });
            await chat.save();

            const response = {
                success: true,
                message: "group created successfully",
            };

            res.status(200).json(response);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
];

exports.getGroupChatDetails = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const chat = await Chat.find({ isGroupChat: true, _id: chatId }).populate('participants', '-password -__v');
        if(chat.length == 0) {
            return res.status(400).json({ success: false, message: "No such chat exists"});
        }

        const response = {
            success: true,
            data: chat,
        };

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.changeGroupName = [
    body('name').trim().notEmpty().withMessage('Group name is required'),

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
            const chatId = req.params.chatId;
            const userId = req.user.userInfo.userId;
            const chat = await Chat.findById(chatId);

            if(!chat) {
                return res.status(400).json({ success: false, message: 'no such chat exists with chatId' });
            }

            if(!chat.isGroupChat) {
                return res.status(401).json({ success: false, message: 'This chat is not a group chat' });
            }

            if(String(chat.admin) !== userId) {
                return res.status(401).json({ success: false, message: 'user dont have admin access to change the name' });
            }

            chat.groupName = req.body.name;
            await chat.save();

            const response = {
                success: true, 
                message: 'group name updated'
            };

            res.status(200).json(response);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });   
        }
    }
];