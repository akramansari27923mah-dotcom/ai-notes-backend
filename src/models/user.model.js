import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email should be unique']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, { timestamps: true })

const userModel = mongoose.model('Users', userSchema)

export default userModel