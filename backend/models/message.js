import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    content: { type: String, required: true},
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sentAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', MessageSchema);