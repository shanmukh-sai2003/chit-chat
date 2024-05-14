import Chat from '../models/chat.js';
import User from '../models/user.js';
import { body, validationResult } from 'express-validator';

export const createChat = async (req, res) => {
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

export const getAllChats = async (req, res) => {
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

export const deleteChat = async (req, res) => {
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

export const createGroupChat = [
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

export const getGroupChatDetails = async (req, res) => {
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

export const changeGroupName = [
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

export const addParticipant = async (req, res) => {
    try {
        const { chatId, participantId } = req.params;
        const userId = req.user.userInfo.userId;
        const participant = await User.findById(participantId);
        if(!participant) {
            return res.status(400).json({ success: false, message: "User does not exists" });
        }

        const chat = await Chat.findOne({ isGroupChat: true, _id: chatId });

        if(chat.length == 0) {
            return res.status(400).json({ success: false, message: "No such group chat exists" });
        }

        if(String(chat.admin) !== userId) {
            return res.status(403).json({ success: false, message: "That the user is not admin" });
        }

        chat.participants.push(participantId);
        await chat.save();

        res.status(200).json({ success: true, message: "participant added" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });   
    }
}

export const removeParticipant = async (req, res) => {
    try {
        const { chatId, participantId } = req.params;
        const userId = req.user.userInfo.userId;

        const chat = await Chat.findById(chatId);
        if(!chat) {
            return res.status(400).json({ success: false, message: "no such chat exists" });
        }

        if(!chat.participants.includes(participantId)) {
            return res.status(400).json({ success: false, message: "No such participant in the group" });
        }

        if(chat.admin != userId) {
            return res.status(403).json({ success: false, message: "user is not admin" });
        }

        chat.participants = chat.participants.filter(participant => participant != participantId);
        await chat.save();

        res.status(200).json({ success: true, message: "participant removed" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const leaveChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user.userInfo.userId;

        const chat = await Chat.findById(chatId);
        if(!chat) {
            return res.status(400).json({ success: false, message: "no such chat exists" });
        }

        if(!chat.participants.includes(userId)) {
            return res.status(400).json({ success: false, message: "user does not exists in the group" });
        }

        chat.participants = chat.participants.filter(participant => participant != userId);
        await chat.save();

        res.status(200).json({ success: true, message: "left the group" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}