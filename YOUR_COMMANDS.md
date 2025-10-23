# 🎯 Your Quick Commands Reference

Copy and paste these commands to get started!

## 📊 Step 1: Set Up Database Tables

### Option A: Using psql (Recommended)
```bash
psql "postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require" -f database/schema.sql
```

### Option B: Using Neon Console (If psql not available)
1. Go to: https://console.neon.tech
2. Open SQL Editor
3. Copy and paste from `database/schema.sql`
4. Click "Run"

---

## 🔧 Step 2: Set Up Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (Windows PowerShell)
New-Item -Path .env -ItemType File -Force
Add-Content -Path .env -Value 'DATABASE_URL="postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require"'
Add-Content -Path .env -Value 'JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"'
Add-Content -Path .env -Value 'PORT=5000'
Add-Content -Path .env -Value 'NODE_ENV="development"'
Add-Content -Path .env -Value 'FRONTEND_URL="http://localhost:3000"'
Add-Content -Path .env -Value 'OPENAI_API_KEY=""'

# OR manually create backend/.env with this content:
# DATABASE_URL="postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require"
# JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
# PORT=5000
# NODE_ENV="development"
# FRONTEND_URL="http://localhost:3000"
# OPENAI_API_KEY=""

# Start backend
npm run dev
```

**✅ Backend should show:**
```
🚀 Heart Backend Server Started Successfully!
📍 Server running on: http://localhost:5000
```

---

## 🎨 Step 3: Set Up Frontend

**Open a NEW terminal** (keep backend running) and run:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

**✅ Frontend should show:**
```
- Local: http://localhost:3000
```

---

## 🧪 Step 4: Test Your App

**Open browser:** http://localhost:3000

**Create account:**
- Email: `test@example.com`
- Password: `Test1234`
- Confirm: `Test1234`

**Test the editor:**
- Paste sample text in left panel
- Click "Rewrite"
- See transformed text in right panel

---

## 📝 Manual .env File Creation (Easiest Method)

If the PowerShell commands don't work, **manually create** a file:

1. Open `backend` folder
2. Create new file named `.env` (no extension)
3. Paste this content:

```env
DATABASE_URL="postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require"
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
OPENAI_API_KEY=""
```

4. Save and close

---

## 🔍 Verification Commands

### Check if backend is running:
```bash
# Should return JSON response
curl http://localhost:5000/health
```

### Check if database tables exist:
```bash
psql "postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require" -c "\dt"
```

Should show:
- `users`
- `article_drafts`

---

## 🛑 Stop Services

### Stop backend:
Press `Ctrl + C` in backend terminal

### Stop frontend:
Press `Ctrl + C` in frontend terminal

---

## 🔄 Restart Services

### Restart backend:
```bash
cd backend
npm run dev
```

### Restart frontend:
```bash
cd frontend
npm run dev
```

---

## ⚡ All-in-One Setup (After database schema is applied)

**Terminal 1 (Backend):**
```bash
cd backend && npm install && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm install && npm run dev
```

Then open: http://localhost:3000

---

## 📋 Your Connection Details

- **Database:** article_writer (Neon PostgreSQL)
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000
- **Test Account:** test@example.com / Test1234

---

## 🎯 What to Do Next

1. ✅ Run database schema
2. ✅ Start backend
3. ✅ Start frontend
4. 🎉 Create account and start writing!

**Need more details?** See [SETUP_NOW.md](SETUP_NOW.md)

