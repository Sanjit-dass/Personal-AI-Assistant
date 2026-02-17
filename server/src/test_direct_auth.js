import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/user.models.js";
import userController from "./controllers/user.controller.js";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

const mockRes = (label) => {
    const res = {};
    res.statusCode = 0;
    res.data = null;
    res.cookies = {};

    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.data = data;
        console.log(`[${label}] Response Status: ${res.statusCode}`);
        console.log(`[${label}] Response JSON Keys:`, Object.keys(data));
        if (data.user) console.log(`[${label}] User email:`, data.user.email);
        return res;
    };
    res.cookie = (name, value, options) => {
        res.cookies[name] = value ? "SET" : "UNSET";
        console.log(`[${label}] Cookie set: ${name}`);
        return res;
    };
    return res;
};

const runTest = async () => {
    await connectDB();

    const testEmail = "test_direct_" + Date.now() + "@example.com";
    const testPassword = "password123";

    console.log("\n--- Testing Direct Register User ---");
    const reqRegister = {
        body: {
            name: "Direct Auth User",
            email: testEmail,
            password: testPassword,
        },
    };

    // Test Register
    try {
        const res = mockRes("REGISTER");
        await userController.registerUser(reqRegister, res, (err) => console.error("Register Error Next:", err));

        if (res.statusCode === 201 && res.cookies.accessToken === "SET") {
            console.log("✅ Register Successful: Tokens received directly.");
        } else {
            console.log("❌ Register Failed: Did not receive 201 or tokens.");
        }

    } catch (e) {
        console.error("Register Exception:", e);
    }

    console.log("\n--- Testing Direct Login User ---");
    const reqLogin = {
        body: {
            email: testEmail,
            password: testPassword,
        },
    };

    // Test Login
    try {
        const res = mockRes("LOGIN");
        await userController.loginUser(reqLogin, res, (err) => console.error("Login Error Next:", err));

        if (res.statusCode === 200 && res.cookies.accessToken === "SET") {
            console.log("✅ Login Successful: Tokens received directly.");
        } else {
            console.log("❌ Login Failed: Did not receive 200 or tokens.");
            console.log("Status:", res.statusCode);
        }

    } catch (e) {
        console.error("Login Exception:", e);
    }

    // Cleanup
    console.log("\n--- Cleanup ---");
    await User.deleteOne({ email: testEmail });

    console.log("Test finished.");
    process.exit(0);
};

runTest();
