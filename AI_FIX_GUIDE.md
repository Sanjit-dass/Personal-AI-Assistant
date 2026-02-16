# AI and Chart Issues - Fix Guide

## Problem 1: AI is Not Working (429 Quota Error)

### Cause
Your Gemini API free tier quota is exhausted. The error logs show:
```
Status: 429 - "You exceeded your current quota"
```

### Solution

#### Step 1: Get a New API Key
1. Go to https://ai.google.dev/
2. Click "Get started with Google AI" 
3. Create or select a project
4. Go to "API Keys" section
5. Click "Create API key"
6. Copy the new key

#### Step 2: Update .env
1. Open `server/.env`
2. Find line with `AI_API_URL=`
3. Replace the old API key with your new one:
   ```
   AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=YOUR_NEW_KEY_HERE
   ```
4. Save the file

#### Step 3: Restart Server
```bash
cd server
npm start
```

#### Step 4: Test
- Try Chat feature → Ask a question
- Try Quiz feature → Generate questions

---

## Problem 2: No Chart Component in App

Currently, the app uses Chakra UI's `<Progress>` bar in Quiz (basic progress indicator), but there's **no advanced chart library** installed.

### What Was Changed
✅ Better error messages for AI errors
✅ Server-side model validation improved
✅ Client-side error handling enhanced

### Optional: Add Charts
If you want advanced charts (score history, topic performance), let me add:
- **recharts** - Best for React
- **chart.js** - Alternative option

---

## Testing Commands

### Test AI Models
```bash
cd server
node test_model_variants.js
```

### Start Server
```bash
cd server
npm start
```

### Start Client (in another terminal)
```bash
cd client
npm run dev
```

---

## Files Modified
- ✅ `server/test_model_variants.js` - Updated model list
- ✅ `client/src/components/ChatBox.jsx` - Better error handling
- ✅ `client/src/pages/Quiz.jsx` - Better error messages

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| **429 Quota Exceeded** | Get new API key from Google AI Studio |
| **404 Model Not Found** | Ensure API key is valid and key hasn't changed |
| **Server not responding** | Check if `npm start` is running on port 8000 |
| **Connection refused** | Make sure server is running before opening client |

