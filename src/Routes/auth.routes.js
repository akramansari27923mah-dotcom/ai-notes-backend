import express from 'express';
import authController from '../controllers/auth.controller.js';
import protectAuth from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', protectAuth, authController.logout)
router.get('/get-me', protectAuth, authController.getMe)

export default router