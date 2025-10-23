# 🚀 Your Personal Setup Guide

Great! You have your Neon database connection string. Let's get your app running in 3 steps.

## ⚠️ Important Note About Your Connection String

Your database name is **`article_writer`** (not "heart" as mentioned in the general docs). This is perfectly fine! The app will work with any database name.

## 📝 Step-by-Step Setup

### Step 1: Set Up the Database (2 minutes)

Your database connection string (corrected):
```
postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require
```

**Create the database tables:**

```bash
# Option A: Using psql command
psql "postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require" -f database/schema.sql

# Option B: Using Neon's SQL Editor (if psql not available)
# 1. Go to https://console.neon.tech
# 2. Select your project
# 3. Click "SQL Editor"
# 4. Copy and paste the contents of database/schema.sql
# 5. Click "Run"
```

**Verify tables were created:**
```sql
-- Run this in Neon SQL Editor:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- You should see: users, article_drafts
```

---

### Step 2: Set Up Backend (2 minutes)

**Navigate to backend folder:**
```bash
cd backend
```

**Install dependencies:**
```bash
npm install
```

**Create .env file:**
```bash
# Windows PowerShell:
Copy-Item .env.example .env

# Windows Command Prompt:
copy .env.example .env

# Or manually create a file named .env in the backend folder
```

**Edit backend/.env file** with these exact values:
```env
DATABASE_URL="postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require"
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
OPENAI_API_KEY=""
```

**Start the backend:**
```bash
npm run dev
```

**✅ Success Check:**
You should see:
```
🚀 Heart Backend Server Started Successfully!
📍 Server running on: http://localhost:5000
✅ Connected to Neon PostgreSQL database: article_writer
```

**Test it:** Open http://localhost:5000/health in your browser
- Should see: `{"success":true,"message":"Server is running"}`

---

### Step 3: Set Up Frontend (2 minutes)

**Open a NEW terminal** (keep backend running) and navigate to frontend:
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Start the frontend:**
```bash
npm run dev
```

**✅ Success Check:**
You should see:
```
- Local:        http://localhost:3000
```

**Open your browser:** http://localhost:3000

---

## 🎉 You're Ready!

### Quick Test:

1. **Sign Up**
   - Click "Get Started"
   - Email: `test@example.com`
   - Password: `Test1234`
   - Confirm: `Test1234`
   - Click "Sign Up"
   - ✅ Should redirect to Dashboard

2. **Try the Editor**
   - Paste this in the left panel:
   ```
   The study by Smith et al. (2023) demonstrates that machine learning 
   algorithms can significantly improve diagnostic accuracy in medical imaging.
   ```
   - Click "Rewrite"
   - ✅ Should see rewritten text in right panel

3. **Save a Draft**
   - Click "Save Draft"
   - ✅ Should see success message

---

## 🔑 Optional: Add OpenAI API Key (Recommended)

For the best text rewriting quality:

1. Go to https://platform.openai.com/api-keys
2. Create an account (free trial available)
3. Generate an API key
4. Add to `backend/.env`:
   ```env
   OPENAI_API_KEY="sk-your-actual-key-here"
   ```
5. Restart backend: Stop (Ctrl+C) and run `npm run dev` again

Without OpenAI key, rewriting will still work but with limited quality.

---

## ⚠️ Troubleshooting

### Backend won't start?

**Check your .env file exists:**
```bash
# In backend folder:
dir .env     # Windows
ls .env      # Mac/Linux
```

**Common issues:**
- Missing .env file → Copy from .env.example
- Wrong DATABASE_URL → Double-check the connection string
- Port 5000 in use → Change PORT in .env to 5001

### Frontend can't reach backend?

**Ensure:**
- Backend is running (check terminal)
- Backend shows "Server running on: http://localhost:5000"
- No firewall blocking localhost

### Database connection errors?

**Verify:**
- Connection string is correct
- No extra characters or spaces
- Neon database is active (check console.neon.tech)
- Schema was applied successfully

---

## 📚 Next Steps After Setup

1. ✅ **Complete setup** - Follow steps above
2. 📋 **Verify everything** - Use [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
3. 🎓 **Learn the features** - Read [README.md](README.md)
4. 🚀 **Deploy** - When ready, see [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🆘 Need Help?

If you encounter issues:

1. Check both terminals are running (backend + frontend)
2. Verify .env file in backend folder
3. Test database connection in Neon console
4. Review error messages carefully
5. Check [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

---

## 🎯 Summary

**Database:** ✅ Neon PostgreSQL (article_writer)  
**Backend:** http://localhost:5000  
**Frontend:** http://localhost:3000  

**Your login:** test@example.com / Test1234

**Start writing amazing academic articles!** ✍️🎉

