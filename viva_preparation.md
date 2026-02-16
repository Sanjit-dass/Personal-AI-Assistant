# Viva Preparation Guide: Personnel Training Assistant

## 1. Project Overview
This is a MERN stack (MongoDB, Express, React, Node.js) application designed as a **AI-Powered Personnel Training Assistant**. Key features include:

*   **AI Tutor**: Interactive chat and question generation using a Large Language Model (LLM).
*   **Multimedia Integration**: Searches and displays YouTube videos and Wikipedia articles.
*   **Authentication**: Secure user login/signup with Email/Password (JWT + HttpOnly Cookies) and Google OAuth.
*   **Profile Management**: Profile picture uploads via Cloudinary.

## 2. APIs and Technologies Used
**Backend (Server):**
*   **Node.js & Express.js**: Core server framework.
*   **MongoDB & Mongoose**: Database and Object Data Modeling (ODM).
*   **JWT (JSON Web Tokens)**: For secure authentication (`accessToken`, `refreshToken`).
*   **Bcrypt**: For hashing passwords.
*   **Cloudinary**: For storing user profile pictures.
*   **Nodemailer**: For sending OTP emails.
*   **Axios**: For making HTTP requests to external APIs.
*   **Google Gemini / PaLM API** (referred to as `AI_API_URL`): For generating AI responses and Study Questions.
*   **YouTube Data API v3**: For fetching video recommendations.
*   **Wikipedia Action API**: For fetching articles (`en.wikipedia.org/w/api.php`).

**Frontend (Client):**
*   **React.js**: UI Library.
*   **Vite**: Build tool.
*   **Chakra UI**: Component library for styling.
*   **Redux Toolkit**: State management (implied by `react-redux` dependency).
*   **React Router DOM**: Navigation.

## 3. Data Filtering Logic
The "filtering" in your application happens effectively in three layers:

### A. AI Content Filtering (Prompt Engineering)
You don't just pass the user's question to the AI. You use a technique called **Prompt Engineering** to filter the output:
1.  **Context enforcement**: You verify if the question is "study related". The prompt explicitly instructs the AI: *"If the prompt is asking about educational material, give a proper response. If not, return this message: **ask only generous and study related questions**"*.
2.  **Format enforcement**: You force the AI to return **strict JSON** (e.g., `{"ai_response": "...", "topic": "..."}`). This "filters" out unstructured text and ensures your frontend can parse the answer safely.
3.  **Question Rules**: When generating MCQs, you enforce rules like "exactly 5 to 10 questions" and specific "A, B, C, D" options structure.

### B. Database Caching (Deduplication)
In `generateQuestion` (AI Controller):
1.  **Check DB First**: Before calling the AI, the code checks MongoDB (`Question.find({ topic })`).
2.  **Filter**: If `existingQuestions.length >= 5`, it returns the **cached** data instead of calling the external API. This acts as a filter to save API costs and improve speed.

### C. External API Parameter Filtering
*   **YouTube**: You filter results using query parameters:
    *   `type: "video"` (Ensures only videos are returned, not channels or playlists).
    *   `maxResults: 6` (Limits the data size).
*   **Wikipedia**: You use `list: "search"` and `srsearch: query` to get relevant articles.

## 4. Potential Viva Questions & Answers

**Q1: What is the architecture of your project?**
*   **A:** It follows the **MVC (Model-View-Controller)** architecture.
    *   **Models**: MongoDB schemas (User, Question, OTP) define the data structure.
    *   **Views**: The React frontend handles the UI display.
    *   **Controllers**: Node.js functions handle the business logic (e.g., calling APIs, processing data).

**Q2: How do you handle security?**
*   **A:**
    *   **Passwords**: Hashed using `bcrypt` before saving to DB.
    *   **Tokens**: I use JWT (JSON Web Tokens). Access tokens are short-lived, while Refresh tokens are long-lived and stored in secure `HttpOnly` cookies to prevent XSS attacks.
    *   **CORS**: Configured to only allow requests from my specific frontend client URL.

**Q3: Why did you use Cloudinary?**
*   **A:** Storing images (like profile pics) directly in MongoDB makes the database heavy and slow. Cloudinary provides a CDN (Content Delivery Network) for fast image loading and easy transformations.

**Q4: How does the AI integration work?**
*   **A:** I send the user's input to the AI model via an HTTP POST request. I wrap their input in a "System Prompt" that instructs the AI to behave like a tutor and return JSON data. I then parse this JSON to display it nicely in the UI.

**Q5: What was the most challenging part?**
*   **A:** (Pick one)
    *   *Handling the AI's response format*: The AI sometimes returned text instead of JSON, so I added error handling and regex matching (`aiGeneratedText.match(/\{[\s\S]*\}/)`) to robustly extract the JSON.
    *   *Managing State*: Syncing the user's auth state across the app using Redux/Context.

**Q6: How is data passed between Client and Server?**
*   **A:** Using **REST API** endpoints. The client calls endpoints like `/api/v1/chat/get-response` using `axios`, and the server returns JSON responses.
