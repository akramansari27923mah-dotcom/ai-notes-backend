import express from 'express';
import noteController from '../controllers/note.controller.js';
import { uplode } from '../utils/upload.js';
import protectAuth from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', protectAuth, uplode.single('file'), noteController.generateNotes)
router.get('/history', protectAuth, noteController.getNotes)

export default router