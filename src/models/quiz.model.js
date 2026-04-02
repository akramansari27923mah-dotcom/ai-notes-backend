import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    quiz: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        req: 'Users'
    }
}, { timestamps: true })

const quizModel = mongoose.model('Quiz', quizSchema)

export default quizModel