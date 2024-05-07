import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: Buffer },
    joinedAt: { type: Date, default: Date.now },
    name: { type: String }
});

export default mongoose.model('User', UserSchema);