# 🚀 Quick API Setup - Start Here!

## ✅ What's Already Done

Your app is now **100% SAFE** from endless loops:
- ✅ APIs ONLY call when you click buttons
- ✅ 2-second cooldown between calls
- ✅ Can't click while processing
- ✅ No Perplexity issues possible

## 🔑 Add Your OpenAI API Key (3 Steps)

### Step 1: Get OpenAI Key
1. Go to: https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

### Step 2: Run Setup Script
In PowerShell:
```powershell
cd backend
.\add-openai-key.ps1
```
Paste your key when prompted.

### Step 3: Restart Backend
```powershell
# Stop current backend (Ctrl+C)
cd backend
npm run dev
```

## 🎯 Test It!

1. Go to http://localhost:3000/dashboard
2. Type some text in LEFT panel
3. Click "✍️ Rewrite" button
4. Wait 5-10 seconds
5. See rewritten text in RIGHT panel

## 📋 What Each Button Does

| Button | What It Does | When It Calls API |
|--------|--------------|-------------------|
| ✍️ Rewrite | Uses OpenAI to rewrite text | When YOU click it |
| 📝 Grammar Check | Checks grammar (free) | When YOU click it |
| 🤖 AI Detect | Checks if text looks AI-written | When YOU click it |
| 💾 Save Draft | Saves to database | NO API call (just saves to DB) |

## 🛡️ Safety Features

### ✅ What's Protected:
- Can't spam click (2-second cooldown)
- Can't run multiple at once (locked during processing)
- No auto-calling on page load
- No auto-calling while typing
- No loops possible

### 💡 How It Works:
```
You click button → API calls ONCE → Shows result → Done!
```

Simple as that. No loops, no auto-calling.

## 💰 Cost Info

OpenAI pricing (approximate):
- Rewriting 500 words: ~$0.02-0.04
- 100 rewrites: ~$2-4
- 1000 rewrites: ~$20-40

**Tip:** You control costs - API only calls when YOU click!

## ⚠️ Important

### ✅ DO:
- Click "Rewrite" when you want to rewrite
- Wait for "⏳ Processing..." to finish
- Set usage limits in OpenAI dashboard

### ❌ DON'T:
- Worry about auto-calling (it's disabled)
- Worry about loops (protected against them)
- Spam click buttons (cooldown will stop you)

## 🆘 Troubleshooting

### "OpenAI API key not configured"
- Run `.\add-openai-key.ps1` in backend folder
- Restart backend server

### "Already processing a request"
- Wait for current request to finish
- This is normal protection, not an error!

### "Please wait a moment"
- 2-second cooldown is active
- Wait 2 seconds and try again
- This prevents rapid repeated calls

## 📚 Full Documentation

For more details, see:
- `OPENAI_SETUP.md` - Complete OpenAI setup guide
- `API_SAFETY_VERIFICATION.md` - Full safety audit report
- `SIGNUP_LOGIN_GUIDE.md` - Signup with phone numbers

## 🎉 You're Ready!

Everything is set up safely. Just:
1. Add your OpenAI key
2. Restart backend
3. Click "Rewrite" button when you need it

**No Perplexity loops. No auto-calling. Complete control!** 🚀

---

**Both servers running:**
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

**Need help?** Check the detailed guides above or review the terminal logs!

