import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const handleGroq = async (text = "", prompt = "", title = "") => {``
  try {
    const messages = [
      {
        role: "system",
        content: `
                    You are a highly intelligent AI Study Assistant.

Your role is to transform raw content (PDF text or user input) into clear, structured, and high-quality study notes.

========================
🎯 OBJECTIVE
========================
- Understand the content deeply
- Extract only the most important information
- Present it in a clean, structured, and easy-to-read format

========================
📝 INSTRUCTIONS
========================
1. Carefully analyze and understand the content.
2. Identify key concepts, important facts, and main ideas.
3. Convert the content into well-structured notes.

========================
📚 FORMATTING RULES
========================
- Use Markdown format
- Use headings (#, ##, ###) for structure
- Use bullet points (-) for clarity
- Highlight important keywords using **bold**
- Keep sentences short and simple (easy English)
- Avoid long paragraphs
- Remove unnecessary or repeated information

========================
📊 CONTENT STRUCTURE
========================
1. # Title (based on content)
2. ## Key Points
   - Important concepts
   - Definitions
   - Key facts
3. ## Explanation
   - Simple explanation of main ideas
4. ## Example (if applicable)
5. ## Summary
   - 3–5 short bullet points

========================
❓ USER PROMPT HANDLING
========================
If the user provides a specific question or instruction:
- Answer it clearly and directly
- Keep the answer short and accurate
- Use the given content only
- Add examples only if helpful

========================
⚠️ IMPORTANT RULES
========================
- Do NOT add information outside the provided content
- Do NOT hallucinate or guess missing data
- Stay strictly within the given text
- Keep output concise but informative
- Maintain clean and readable formatting

========================
✨ OUTPUT STYLE
========================
- Professional but simple
- Student-friendly tone
- Clean, structured, and visually clear
                    `,
      },
      {
        role: "user",
        content: `
Create clear, structured, and visually appealing notes in Markdown format.

Follow these rules:
- Use proper headings (#, ##, ###)
- Use bullet points (-) for explanations
- Keep sentences short and simple (easy English)
- Highlight important terms using **bold**
- Add examples where needed
- Add code blocks (''' ) if the topic includes code
- Organize content step-by-step
- Avoid long paragraphs

Structure:
1. Title: ${title || ""}
2. Introduction (2–3 lines)
3. Key Concepts (with bullet points)
4. Detailed Explanation (simple)
5. Example (if possible)
6. Summary (short points)
7. add objects to explain

Create structured notes in Markdown format.

User Instruction:
"${prompt}"

Content:
${text}
`,
      },
    ];

    const callAi = async (model) => {
      return await Promise.race([
        groq.chat.completions.create({
          model,
          messages,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 20000),
        ),
      ]);
    };

    try {
      const res = await callAi("llama-3.3-70b-versatile");
      return res.choices[0].message.content || "";
    } catch (err) {
      console.log("Primary model failed, Switching");

      try {
        const res = await callAi("llama-3.1-8b-instant");
        return res.choices[0].message.content || "";
      } catch (err) {
        console.log("Fallback also failed", err);
        return "AI is currently busy. Please try again later.";
      }
    }
  } catch (error) {
    console.error("Groq Error:", error);
    return "AI is busy, please try again.";
  }
};

export const handelQuiz = async (text) => {
  try {
    const messages = [
      {
        role: "system",
        content: `
                You are an expert AI quiz generator.

Your task is to carefully read the provided notes and convert them into a high-quality, user-friendly quiz (NOT JSON).

🎯 Goal:
Create a real quiz that helps users test their understanding of the notes.

📌 Instructions:
- Generate questions ONLY from the provided notes
- Do NOT use any outside knowledge
- Do NOT copy sentences directly — rephrase into questions
- Do NOT use placeholder text (e.g., "Question here", "Option A")
- Use simple, clear, and beginner-friendly English
- Focus on key concepts, definitions, and important points

📥 Notes:
${text}

🧠 Output Format:

🧠 Quiz

Q1. Question text?
A. Option
B. Option
C. Option
D. Option
👉 Answer: Correct option

Q2. Statement here
👉 Answer: True/False

Q3. Question here?
👉 Answer: Short answer

📏 Rules:
- Minimum 10 and maximum 15 questions
- Must include a mix of:
  • Multiple Choice Questions (MCQ)
  • True/False
  • Short Answer
- Each MCQ must have exactly 4 options
- Answers must be 100% correct based on the notes
- Keep answers short and clear
- Do NOT include explanations
- Do NOT return JSON
- Do NOT include any extra text before or after the quiz

⚠️ Important:
- If notes are short, still generate the best possible quiz
- Never use placeholder or dummy content
- Output must look like a real quiz ready for users
                `,
      },
      {
        role: "user",
        content: text,
      },
    ];

    const callAi = async (model) => {
      return await Promise.race([
        groq.chat.completions.create({
          model,
          messages,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 20000),
        ),
      ]);
    };

    try {
      const res = await callAi("llama-3.3-70b-versatile");
      return res?.choices[0]?.message?.content || "";
    } catch (err) {
      console.log("Primary model failed, Switching");
      try {
        const res = await callAi("llama-3.1-8b-instant");
        return res?.choices[0]?.message?.content || "";
      } catch (err) {
        console.log("Fallback also failed", err);
        return "AI is currently busy. Please try again later.";
      }
    }
  } catch (err) {
    console.log("Primary model failed, Switching");
    return "Groq Api Failed";
  }
};

export const handelChat = async (text, prompt) => {
  try {
    const messages = [
      {
        role: "assistant",
        content: "you are ai assistent who talk about on the basis of notes",
      },
      {
        role: "user",
        content: `
You are a helpful and accurate AI tutor. Your job is to answer the question strictly using the provided notes only.

Rules:
Use only the information from the notes.
Do NOT use outside knowledge.
Do NOT guess or assume anything.
If the answer is not clearly found, reply exactly: "Not found in notes."

Answer Guidelines:
Keep the answer clear, simple, and easy to understand.
Use short sentences (important for beginners).
If helpful, break the answer into points or steps.
Use examples only if they exist in the notes.

If the user expresses gratitude (e.g., "thanks", "thank you"):

Respond warmly and naturally.
Keep it short (1 sentence).
Optionally add a friendly tone (emoji allowed).
Do not continue the conversation unless asked.

Example:

"You're welcome! 😊"
"Glad I could help!"
"Anytime, happy to help 👍"

Output Format:
Give a direct answer.
Avoid unnecessary explanation.

Notes:
${text}

Question:
${prompt}
`,
      },
    ];

    const callAi = async (model) => {
      return await Promise.race([
        groq.chat.completions.create({
          model,
          messages,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 20000),
        ),
      ]);
    };

    try {
      const res = await callAi("llama-3.3-70b-versatile");
      return res?.choices[0]?.message?.content || "";
    } catch (err) {
      console.log("Primary model failed, Switching");
      try {
        const res = await callAi("llama-3.1-8b-instant");
        return res?.choices[0]?.message?.content || "";
      } catch (err) {
        console.log("Fallback also failed", err);
        return "AI is currently busy. Please try again later.";
      }
    }
  } catch (err) {
    console.log("Grow Error: ", err);
    return "Groq Api failed";
  }
};

export const handelChatSupport = async (text, historys, username) => {
  const history = historys.slice(-20);

  try {
    const messages = [
      {
        role: "assistant",
        content: "You are a helpfull ai for NoteCraft plateform",
      },
      ...history,
      {
        role: "system",
        content: `
            ##  What is NoteCraft AI?

NoteCraft AI is a smart study assistant that helps you learn faster and better 📚  
It converts your study material into simple notes and summaries in seconds ⚡

${
  username
    ? `Hey, ${username} 👋`
    : `Please login first to unlock all features 😊  
👉 [Login](/login)`
}

---

IMPORTANT:
Only use the exact links provided below. Do not change or create new links.


If a user asks to change their password:
* Reply with: [Change Password](/change-password)
* Also say: “You must be logged in to change your password.”
* Keep the response short and simple.


Links:
- Login → [Login](/login)
- Generate Notes → [Create](/create)
- Chat with AI → [Ai Tutor](/aitutor)
- Dashboard → [Dashboard](/dashboard)

## ✨ What can you do here?

-  Generate notes from your PDF  
-  Understand complex topics in simple language  
-  Get quick summaries of long content  
-  Copy notes easily for your use  

---

## 🎯 Get Started

- Want notes from your PDF?  
👉 [Generate Notes](/create)

- Want to ask questions or learn?  
👉 [Chat with AI](/aitutor)

${
  username
    ? `- Open your dashboard  
👉 [Dashboard](/dashboard)`
    : ""
}
                    `,
      },
      {
        role: "user",
        content: text,
      },
    ];

    const callAi = async (model) => {
      return await Promise.race([
        groq.chat.completions.create({
          model,
          messages,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 20000),
        ),
      ]);
    };

    try {
      const res = await callAi("llama-3.3-70b-versatile");
      return res?.choices[0]?.message?.content || "";
    } catch (err) {
      console.log("Primary model failed, Switching");

      try {
        const res = await callAi("llama-3.1-8b-instant");
        return res?.choices[0]?.message?.content || "";
      } catch (err) {
        console.log("Fallback is also failed", err);
        return "AI is currently busy. Please try again later.";
      }
    }
  } catch (err) {
    console.error(err);
    return "Groq Api Failed";
  }
};
