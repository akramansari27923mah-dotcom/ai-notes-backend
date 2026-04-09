import express from "express";
import noteController from "../controllers/note.controller.js";
import { uplode } from "../utils/upload.js";
import protectAuth from "../middleware/auth.middleware.js";
import chatController from "../controllers/chat.controller.js";
import chatSupportController from "../controllers/chatSupport.controller.js";
const router = express.Router();

router.post(
  "/",
  protectAuth,
  uplode.single("file"),
  noteController.generateNotes,
);
router.get("/history", protectAuth, noteController.getNotes);
router.post(
  "/chat",
  protectAuth,
  uplode.single("file"),
  chatController.chatWithNote,
);
router.post("/Chatsupport", chatSupportController.chatSupport);

export default router;
