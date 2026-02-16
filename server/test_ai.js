
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function testAI() {
    console.log("Starting AI Test...");
    const API_URL = process.env.AI_API_URL;

    if (!API_URL) {
        fs.writeFileSync('ai_test_result.txt', "Error: AI_API_URL not found in env");
        return;
    }

    console.log(`Using URL: ${API_URL.substring(0, 50)}...`); // Log part of URL for verification

    const prompt = "Explain what is AI in one sentence.";
    const requestData = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    try {
        const response = await axios.post(API_URL, requestData, {
            headers: { "Content-Type": "application/json" },
        });

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        const result = {
            success: true,
            status: response.status,
            text: text || "No text found"
        };
        fs.writeFileSync('ai_test_result.txt', JSON.stringify(result, null, 2));
        console.log("Success written to file.");

    } catch (error) {
        console.error("Caught error");
        let errorDetails = {
            success: false,
            message: error.message
        };
        if (error.response) {
            errorDetails.status = error.response.status;
            errorDetails.data = error.response.data;
        }
        fs.writeFileSync('ai_test_result.txt', JSON.stringify(errorDetails, null, 2));
        console.log("Error written to file.");
    }
}

testAI();
