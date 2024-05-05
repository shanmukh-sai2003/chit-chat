const Chat = require('../models/chat');
const User = require('../models/user');

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
                message: "Already chat exsists between the users"
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
        const chats = await Chat.find({ participants: userId }).populate('participants', '-password -__v');

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
            return res.status(400).json({ success: false, message: "chat not deleted no chat exsists with the Id" });
        }
        
        res.status(200).json({ success: true, message: "chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error.message);
    }
}