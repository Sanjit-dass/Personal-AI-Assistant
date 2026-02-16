
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const DB_Name = "AI_TUTOR";

async function connectDb() {
    try {
        console.log("DEBUG: Starting connection...");
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in .env");
        }

        const mongoUrl = process.env.MONGODB_URL.replace(/\/$/, "");
        const fullUrl = `${mongoUrl}/${DB_Name}`;
        console.log(`DEBUG: Connecting to ${fullUrl}`);

        await mongoose.connect(fullUrl);
        console.log("SUCCESS: Connected to MongoDB");
        process.exit(0);
    } catch (error) {
        console.error("ERROR: Connection failed");
        console.error(error.message);
        if (error.cause) console.error(error.cause);
        process.exit(1);
    }
}

connectDb();
