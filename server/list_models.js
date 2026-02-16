
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const logFile = 'list_models.txt';
function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

const API_KEY = process.env.AI_API_URL.match(/key=([^&]*)/)?.[1];
if (!API_KEY) {
    log("No API Key found.");
    process.exit(1);
}

async function listModels() {
    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
        );
        log("Models:");
        response.data.models.forEach(m => {
            log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
        });
    } catch (err) {
        log(`ERROR: ${err.message}`);
        if (err.response) {
            log(`Status: ${err.response.status}`);
            log(`Response: ${JSON.stringify(err.response.data, null, 2)}`);
        }
    }
}

listModels();
