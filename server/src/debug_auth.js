import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/user.models.js";
import { OtpSchema } from "./models/otp.model.js";
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

const mockRes = () => {
    const res = {};
    res.status = (code) => {
        console.log(`Response Status: ${code}`);
        return res;
    };
    res.json = (data) => {
        console.log("Response JSON:", JSON.stringify(data, null, 2));
        return res;
    };
    res.cookie = (name, value, options) => {
        console.log(`Response Cookie: ${name}=${value.substring(0, 10)}...`);
        return res;
    };
    res.clearCookie = (name) => {
        console.log(`Response Clear Cookie: ${name}`);
        return res;
    };
    res.send = (data) => {
        console.log("Response Send:", data);
        return res;
    }
    return res;
};

const runTest = async () => {
    await connectDB();

    const testEmail = "test_debug_auth_" + Date.now() + "@example.com";
    const testPassword = "password123";

    console.log("\n--- Testing Register User ---");
    const reqRegister = {
        body: {
            name: "Debug Test User",
            email: testEmail,
            password: testPassword,
        },
    };

    try {
        // We need to handle the fact that registerUser is wrapped in asyncHandler which expects (req, res, next)
        // ensure we call it and catch errors if any
        await userController.registerUser(reqRegister, mockRes(), (err) => console.error("Next called with error:", err));
    } catch (e) {
        console.error("Register failed Exception:", e);
    }

    console.log("\n--- Testing Login User ---");
    const reqLogin = {
        body: {
            email: testEmail,
            password: testPassword,
        },
    };

    try {
        await userController.loginUser(reqLogin, mockRes(), (err) => console.error("Next called with error:", err));
    } catch (e) {
        console.error("Login failed Exception:", e);
    }

    // Check if OTP was created
    const otpEntry = await OtpSchema.findOne({ email: testEmail });
    if (otpEntry) {
        console.log(`\nOTP found in DB for ${testEmail}: ${otpEntry.otp}`);

        console.log("\n--- Testing Verify OTP ---");
        const reqVerify = {
            body: {
                email: testEmail,
                otp: otpEntry.otp
            }
        };
        try {
            await userController.verifyOtp(reqVerify, mockRes(), (err) => console.error("Next called with error:", err));
        } catch (e) {
            console.error("Verify OTP failed Exception:", e);
        }

    } else {
        console.log(`\nNo OTP found in DB for ${testEmail}`);
    }

    // Cleanup
    console.log("\n--- Cleanup ---");
    await User.deleteOne({ email: testEmail });
    await OtpSchema.deleteOne({ email: testEmail });

    console.log("Changes reverted.");
    process.exit(0);
};

runTest();
