import { handelChatSupport } from "../utils/ai.js";

const chatSupport = async (req, res) => {
  const { prompt, history, username } = req?.body;
  
  if (!prompt) {
   return res.status(401).json({
      success: false,
      message: "Prompt is required",
    });
  }

  const reply = await handelChatSupport(prompt, history, username);

  res.status(201).json({
    success: true,
    message: "Replied successfully",
    reply,
  });
};

export default {
    chatSupport
};
