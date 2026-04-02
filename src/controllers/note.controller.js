import * as pdfParsePkg from 'pdf-parse';
const pdfParse = pdfParsePkg;
import pdfModel from "../models/pdf.model.js";
import { handelQuiz, handleGroq } from "../utils/ai.js";

const generateNotes = async (req, res) => {

    const { prompt } = req.body;
    const id = req.userId;
    const { title } = req.body;

    try {
        // check file
        if (!req.file && !prompt) {
            return res.status(400).json({
                success: false,
                message: "One thing is required"
            });
        }

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            })
        }

        const result = req.file ? await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText() : ""

        const texts = result.text ? result.text : result

        const text = texts.slice(0, 10000)

        // get notes from AI
        const notesByAi = await handleGroq(text, prompt, title);

        const checkNotes = text ? text : prompt

        const quiz = await handelQuiz(checkNotes)

        // save in DB
        const notesCreated = await pdfModel.create({
            text: text,
            notes: notesByAi,
            userId: id,
            title: title,
            quiz: quiz
        });

        res.status(201).json({
            success: true,
            message: "Notes created successfully",
            data: notesCreated,
            title,
            id: req.userId,
            quiz
        });

    } catch (err) {
        console.error('notes', err);
        return res.status(500).json({
            success: false,
            message: "Error generating notes"
        });
    }
};

const getNotes = async (req, res) => {
    const id = req.userId
    console.log(id);

    try {

        const notes = await pdfModel.find({ userId: req?.userId })

        if (!notes) {
            return res.status(400).json({
                success: false,
                message: 'Notes not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Notes Fetched Successfully',
            notes
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }


}

export default { generateNotes, getNotes }