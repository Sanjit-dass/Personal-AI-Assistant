import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
import colors from "colors";
const connectDb = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL.replace(/\/$/, "");
        const connection = await mongoose.connect(
            `${mongoUrl}/${DB_Name}`
        );
        if (connection) {
            console.log(
                `MongoDb connection success`.cyan.underline
            );
        }
    } catch (error) {
        console.log(error.message.red.bold);
        throw error;
    }
};
export default connectDb;
