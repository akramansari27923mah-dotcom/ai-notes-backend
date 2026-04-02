import { Router } from "express";
import generateQuiz from "../controllers/quiz.controller.js";

const app = Router();

app.post('/', generateQuiz)

export default app