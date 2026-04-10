import chatModel from "../models/chat.model.js";
import { handelChat } from "../utils/ai.js";
import * as pdfParsePkg from 'pdf-parse';
const pdfParse = pdfParsePkg;

const chatWithNote = async (req, res) => {
    const { prompt } = req.body;    

    try {

        if (!prompt || !req.file) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const pdfConvert = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

        const texts = pdfConvert.text

        const text = texts.slice(0, 10000)


        const aiRes = await handelChat(text, prompt)

        const createChat = await chatModel.create({
            userId: req.userId,
            pdfNote: text,
            prompt,
            reply: aiRes
        })

        res.status(201).json({
            success: true,
            message: 'Chat created',
            createChat
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

export default { chatWithNote }