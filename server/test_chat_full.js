
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function testChat() {
    console.log("Testing AI Chat Logic directly (Groq API)...");
    const API_URL = process.env.AI_API_URL;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const question = "What is AI?";

    if (!API_URL) {
        console.error("AI_API_URL is missing!");
        return;
    }

    const prompt = `
If the prompt is asking about educational material, give a proper response. If not, return this message:
**ask only generous and study related questions**

Always respond in the following strict **JSON format**:

{
  "ai_response": "The study material should be here.",
  "topic": "The related topic for the study material should be here.",
}

**Rules:**
- ONLY send valid JSON. No markdown or text outside the JSON object.
- Use double quotes for all JSON keys and string values.
- If the topic is study-related, generate a helpful educational answer.
- NEVER include links.
- Do not send anything outside the JSON object.

This is the question: "${question}"
`;

    const requestData = {
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: "You are a helpful study assistant. Always respond in valid JSON format as requested."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        response_format: { type: "json_object" }
    };

    try {
        const response = await axios.post(API_URL, requestData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
        });

        const aiGeneratedText = response.data?.choices?.[0]?.message?.content;
        console.log("Raw AI Response:", aiGeneratedText);
        fs.writeFileSync('chat_groq_result.txt', `Success: ${aiGeneratedText}`);

        try {
            const parsed = JSON.parse(aiGeneratedText);
            console.log("Parsed JSON:", parsed);
        } catch (e) {
            console.error("JSON Parse Error:", e.message);
        }

    } catch (error) {
        console.error("Error:", error.message);
        let errorMsg = `Error: ${error.message}`;
        if (error.response) {
            console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
            errorMsg += `\nResponse Data: ${JSON.stringify(error.response.data, null, 2)}`;
        }
        fs.writeFileSync('chat_groq_result.txt', errorMsg);
    }
}

testChat();
