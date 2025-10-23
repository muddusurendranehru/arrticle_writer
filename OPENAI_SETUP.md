# 🤖 OpenAI API Setup Guide

## ✅ Safety Features Implemented

Your app now has **multiple safety layers** to prevent endless loops and unwanted API calls:

### 1. **Button-Click Only** 
- ✅ APIs ONLY call when you click a button
- ✅ No auto-calling on page load
- ✅ No calling in useEffect or background

### 2. **Cooldown Period**
- ✅ 2-second cooldown between API calls
- ✅ Prevents accidental double-clicks
- ✅ Prevents rapid repeated calls

### 3. **Single Request Lock**
- ✅ Only ONE request can run at a time
- ✅ If already processing, new clicks are blocked
- ✅ Button shows "⏳ Processing..." when locked

### 4. **No Endless Loops**
- ✅ No recursive API calls
- ✅ No API calls in useEffect hooks
- ✅ All requests have proper error handling

## 🔑 How to Add Your OpenAI API Key

### Step 1: Get Your OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

### Step 2: Add Key to Backend .env File

Open `backend/.env` and add:

```env
# OpenAI API Key for text rewriting
OPENAI_API_KEY=sk-your-actual-key-here
```

**Important:** Replace `sk-your-actual-key-here` with your real key!

### Step 3: Restart Backend Server

In your terminal, press `Ctrl+C` to stop the backend, then run:
```powershell
cd backend; npm run dev
```

### Step 4: Test the Rewrite Feature

1. Go to http://localhost:3000/dashboard
2. Type some text in the left panel
3. Click "✍️ Rewrite" button
4. Wait for OpenAI to process (takes 3-10 seconds)
5. See rewritten text appear in right panel

## 📋 What Each Tool Does

### 1. ✍️ Rewrite (Uses OpenAI)
- **When it calls**: When you click "Rewrite" button
- **What it does**: Sends text to OpenAI to rewrite in academic style
- **API used**: OpenAI GPT-4 Turbo
- **Cost**: ~$0.01-0.03 per request (paid by you via OpenAI account)

### 2. 📝 Grammar Check (Free)
- **When it calls**: When you click "Grammar Check" button
- **What it does**: Checks grammar and spelling
- **API used**: LanguageTool (free public API)
- **Cost**: FREE

### 3. 🤖 AI Detect (Optional)
- **When it calls**: When you click "AI Detect" button
- **What it does**: Checks if text appears AI-written
- **API used**: GPTZero (requires separate API key)
- **Cost**: Depends on GPTZero plan (can use mock data if no key)

### 4. Research Tools (Future)
- **ResearchPal**: For finding research papers
- **SciHub**: For academic paper access
- **These are NOT implemented yet** (only placeholders)

## ⚠️ Important Safety Rules

### ✅ SAFE: These actions call APIs
- Clicking "Rewrite" button → Calls OpenAI API
- Clicking "Grammar Check" → Calls LanguageTool API
- Clicking "AI Detect" → Calls GPTZero API

### ❌ NEVER: These actions will NEVER call APIs
- Typing in text fields
- Loading the page
- Saving drafts (only saves to database, not AI APIs)
- Switching between drafts
- Any action without explicitly clicking a tool button

## 🛡️ Protection Against Loops

Your app has these protections:

```
User clicks "Rewrite" button
  ↓
✅ Check: Is cooldown period passed? (2 seconds)
  ↓
✅ Check: Is any other request processing?
  ↓
✅ Lock: Set isProcessing = true (blocks other clicks)
  ↓
Call OpenAI API (ONE TIME ONLY)
  ↓
✅ Unlock: Set isProcessing = false
  ↓
Done! Ready for next click
```

## 💰 OpenAI Pricing (Approximate)

Using GPT-4 Turbo:
- Input: $0.01 per 1K tokens (~750 words)
- Output: $0.03 per 1K tokens (~750 words)

**Example costs:**
- Rewriting 500 words: ~$0.02-0.04 per request
- 100 rewrites: ~$2-4 total
- 1000 rewrites: ~$20-40 total

**To reduce costs:**
- Use GPT-3.5-turbo instead (10x cheaper)
- Set max_tokens limit
- Only rewrite when needed (not on every edit)

## 🔧 Advanced Configuration

### Change OpenAI Model

Edit `backend/src/controllers/externalApi.controller.ts`:

```typescript
// Current (GPT-4 Turbo - Better quality, more expensive)
model: 'gpt-4-turbo-preview',

// Option 1 (GPT-3.5 Turbo - Faster, 10x cheaper)
model: 'gpt-3.5-turbo',

// Option 2 (GPT-4 - Best quality, most expensive)
model: 'gpt-4',
```

### Adjust Cooldown Period

Edit `frontend/src/components/DualPanelEditor.tsx`:

```typescript
// Current: 2 seconds between calls
const COOLDOWN_MS = 2000;

// More restrictive: 5 seconds
const COOLDOWN_MS = 5000;

// Less restrictive: 1 second
const COOLDOWN_MS = 1000;
```

## 🧪 Testing Without OpenAI Key

If you don't have an OpenAI key yet:

1. The app will show error: "OpenAI API key not configured"
2. Other tools (Grammar, AI Detect) still work
3. You can still save/load drafts
4. Add key later when ready

## 📞 Getting Help

### If API calls fail:
1. Check backend console for errors
2. Verify API key is correct in `.env`
3. Restart backend server
4. Check OpenAI account has credits

### If you see loops:
1. This should NOT happen with current code
2. Check browser console (F12) for errors
3. The 2-second cooldown should prevent it
4. Contact for help if issue persists

## ✅ Checklist

Before using OpenAI:
- [ ] Created OpenAI account
- [ ] Generated API key
- [ ] Added key to `backend/.env`
- [ ] Restarted backend server
- [ ] Verified key works (check backend logs)
- [ ] Added payment method to OpenAI account
- [ ] Set usage limits in OpenAI dashboard (optional but recommended)

## 🎯 Summary

**Your app is SAFE:**
- ✅ No auto-calling
- ✅ No endless loops
- ✅ Only calls on button click
- ✅ 2-second cooldown between calls
- ✅ One request at a time
- ✅ Proper error handling

**To use OpenAI:**
1. Get API key from OpenAI
2. Add to `backend/.env`
3. Restart backend
4. Click "Rewrite" button to test

**All clear to use! No Perplexity issues will happen.** 🚀

