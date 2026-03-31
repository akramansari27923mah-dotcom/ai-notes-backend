import Groq from "groq-sdk";
import 'dotenv/config'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const handleGroq = async (text = '', prompt = '', title = '') => {


    try {
        const aiResponse = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
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
                    `
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
1. Title: ${title || ''}
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
`
                }
            ],
        });

        return aiResponse.choices[0]?.message?.content || "";

    } catch (error) {
        console.error("Groq Error:", error);
        throw new Error("AI request failed");
    }
};