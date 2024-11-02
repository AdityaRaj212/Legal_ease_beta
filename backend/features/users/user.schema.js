import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    remainingChats: {
        type: Number,
        default: 5
    },
    chats: {
        type: Number,
        default: 0
    },
    subscribed: {
        type: Boolean,
        default: false
    }
});

export const UserModel = mongoose.model('User',UserSchema);