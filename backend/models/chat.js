const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = Schema({
    isGroupChat: { type: Boolean, default: false },
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);