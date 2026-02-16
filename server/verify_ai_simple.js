
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function testAI() {
    const API_URL = process.env.AI_API_URL;
    console.log(`Testing URL: ${API_URL}`);

    const prompt = "Hello";
    const requestData = {
        contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    try {
        const response = await axios.post(API_URL, requestData, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("Success! Status:", response.status);
        fs.writeFileSync('ai_result_simple.txt', `Success: ${response.status}\nResponse: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error("Error:", error.message);
        let errorMsg = `Error: ${error.message}\n`;
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data));
            errorMsg += `Status: ${error.response.status}\nData: ${JSON.stringify(error.response.data)}`;
        }
        fs.writeFileSync('ai_result_simple.txt', errorMsg);
    }
}

testAI();
