import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    pdfNote: {
        type: String,
        required: true
    },
    prompt: {
        type: String
    },
    reply: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, { timestamps: true })

const chatModel = mongoose.model('Chats', chatSchema)

export default chatModel