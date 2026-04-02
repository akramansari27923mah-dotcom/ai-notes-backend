import quizModel from "../models/quiz.model.js";
import { handelQuiz } from "../utils/ai.js";

const generateQuiz = async (req, res) => {
    const { note } = req.body;
    
    const shotNotes = note.slice(0, 2000)

    try {
        if (!note) {
            return res.status(400).json({
                success: false,
                message: 'Note is required'
            })
        }

        const quizGenerated = await handelQuiz(shotNotes)

        if (!quizGenerated) {
            return res.status(401).json({
                success: false,
                message: 'Groq api failed'
            })
        }

        const quizCreate = await quizModel.create({
            id: req?.userId,
            quiz: quizGenerated
        })

        res.status(201).json({
            success: true,
            message: 'Quiz generated successfully',
            quiz: quizCreate,
            id: req?.userId
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }


}

export default generateQuiz 