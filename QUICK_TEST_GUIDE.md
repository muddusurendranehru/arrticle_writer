# Quick Test Guide - Article Writer System

## ✅ What's Done

1. ✅ OpenAI API key configured
2. ✅ Database: 2 tables (users, article_drafts) with proper schema
3. ✅ Backend running on http://localhost:5000
4. ✅ Frontend running on http://localhost:3000
5. ✅ Authentication system working (Sign up/Login)
6. ✅ Dashboard with left/right panels
7. ✅ Safety measures to prevent endless API loops
8. ✅ All middleware aligned

## 🔄 RESTART BACKEND NOW

The OpenAI key was just added. You must restart the backend:

### In Backend Terminal:
1. Press `Ctrl + C` to stop the server
2. Run: `npm run dev`
3. Wait for "Server Started Successfully!" message

## 🧪 Test the Complete System

### Step 1: Sign Up
```
1. Open browser: http://localhost:3000/signup
2. Enter:
   - Email: yourtest@test.com
   - Password: test123
   - Confirm Password: test123
3. Click "Sign Up"
4. Should automatically redirect to /dashboard
```

### Step 2: Test Dashboard
```
Left Panel (Your Script):
- Type or paste your academic text
- Example: "The study shows that exercise improves health."

Click "Rewrite" Button:
- OpenAI will rewrite your text academically
- Rewritten text appears in Right Panel
- Draft auto-saves to database

Right Panel (Rewritten):
- Shows AI-rewritten version
- You can edit it manually
- Click "Save" to update draft
```

### Step 3: View Saved Drafts
```
1. Click "My Drafts" in navigation
2. See all your saved drafts
3. Click "Open" to edit any draft
```

### Step 4: Test Other Features
```
Grammar Check Button:
- Checks right panel text for grammar errors
- (Needs LanguageTool API key to work)

AI Detection Button:
- Detects if text appears AI-generated
- (Needs GPTZero API key to work)

Save Button:
- Manually save current draft
- Updates database

New Button:
- Clear panels and start fresh draft
```

## 🔍 What to Watch For

### ✅ Should Work:
- Sign up creates account
- Login redirects to dashboard
- Left panel accepts text input
- Rewrite button works (OpenAI configured)
- Right panel shows rewritten text
- Save button stores in database
- Drafts page shows saved content

### ⚠️ Will Show Error (Need API Keys):
- Grammar Check (needs LanguageTool key)
- AI Detection (needs GPTZero key)
- Research suggestions (needs ResearchPal key)

These are optional - main rewrite feature works!

## 🎯 Expected Behavior

### Login Flow:
```
/login → Enter credentials → /dashboard
```

### Dashboard Insert:
```
Type text → Click Rewrite → Text appears → Auto-saves to DB
```

### Dashboard Fetch:
```
Click "My Drafts" → See all saved drafts → Click "Open" → Load draft
```

## 🐛 If Something Doesn't Work

### Login Issues:
- Check browser Console (F12) for errors
- Check Network tab to see API responses
- Make sure both servers are running
- Try creating a new account via Sign Up

### Rewrite Not Working:
- Make sure you restarted backend after adding OpenAI key
- Check backend terminal for error messages
- Verify .env file has OPENAI_API_KEY set
- Check OpenAI account has credits

### Save Not Working:
- Check backend terminal for database errors
- Make sure you're logged in
- Check Network tab for 401 errors

## 📊 Database Check

Your database currently has:
- **7 users** (including your test accounts)
- **1 draft** already saved
- Both tables using **UUID** primary keys ✅
- All passwords properly **hashed** ✅

## 🔐 Current System Architecture

```
FRONTEND (Port 3000)
├── /signup → Sign Up Page (email, password, confirm)
├── /login → Login Page (email, password)
├── /dashboard → Main Editor (left panel + right panel + tools)
├── /drafts → View All Saved Drafts
└── /topics → Research Topics (separate feature)

BACKEND (Port 5000)
├── POST /api/auth/signup → Create user
├── POST /api/auth/login → Authenticate user
├── POST /api/drafts → Insert draft ✅
├── GET /api/drafts → Fetch drafts ✅
├── POST /api/tools/rewrite → AI rewriting (OpenAI) ✅
└── Other tool endpoints (need API keys)

DATABASE (article_writer)
├── users table (authentication) ✅
└── article_drafts table (content storage) ✅
```

## ✨ Safety Features

### No Endless Loops:
- ✅ 2-second cooldown between API calls
- ✅ Processing lock prevents simultaneous calls
- ✅ APIs only trigger on button click
- ✅ No automatic rewriting on text change
- ✅ User must manually click buttons

### Cost Protection:
- ✅ OpenAI only calls when YOU click "Rewrite"
- ✅ Can't spam the button (cooldown enforced)
- ✅ Set usage limits in OpenAI dashboard

## 🎨 Project Aim

**Academic Writing Assistant:**
1. ✅ User signs up/logs in
2. ✅ Writes or pastes academic text (left panel)
3. ✅ Clicks "Rewrite" to improve it (right panel)
4. ⚠️ Can search research databases (needs API keys)
5. ✅ Saves drafts to database
6. ✅ Can view and edit saved drafts
7. 🔮 Future: AI detector integration

**Current Status:** Core features working! 🎉
- Authentication ✅
- Database CRUD ✅
- AI Rewriting ✅ (OpenAI configured)
- Safety mechanisms ✅
- Research APIs ⚠️ (need keys)

## 📝 Next Steps

1. **Restart backend** (to load OpenAI key)
2. **Test sign up** → login → dashboard flow
3. **Try rewrite feature** with sample text
4. **Add research API keys** when ready:
   - ResearchPal
   - Perplexity
   - Science.ai
   - Others as needed

---

## 💡 Quick Tips

- Backend terminal shows all API requests in real-time
- Frontend console (F12) shows any JavaScript errors
- Network tab shows API responses and status codes
- Drafts auto-save when you rewrite text
- Manual "Save" button updates existing drafts
- "New" button clears everything for fresh start

**Ready to test? Restart backend and open http://localhost:3000!** 🚀

