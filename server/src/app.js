import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("Hi this site is working")
})



app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://personal-ai-assistant-rho.vercel.app"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// setting up routes


import userRoutes from "./routes/user.routes.js"
import chatRouter from "./routes/aichat.routes.js"
import youtubeRouter from "./routes/youtube.routes.js"
import wikipediaRouter from "./routes/wikipedia.routes.js"


app.use("/api/v1/users", userRoutes)
app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/youtube', youtubeRouter)
app.use('/api/v1/wikipedia', wikipediaRouter)

app.use(errorHandler)

export default app;