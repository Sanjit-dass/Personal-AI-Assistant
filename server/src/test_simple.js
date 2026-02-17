console.log("Hello debug world");
import dotenv from "dotenv";
dotenv.config();
console.log("Env loaded:", process.env.MONGODB_URL ? "Yes" : "No");
