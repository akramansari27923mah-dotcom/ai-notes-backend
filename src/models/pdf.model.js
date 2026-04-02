import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({

    text: {
        type: String
    },

    notes: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    quiz: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }

}, { timestamps: true });

const pdfModel = mongoose.model("PDF", pdfSchema);

export default pdfModel