# Quick Start Guide

Get the Scientific Article Writing Agent running in 5 minutes!

## 🚀 Quick Setup

### Step 1: Database Setup (2 minutes)

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Create a database named **"heart"**
4. Copy your connection string
5. Run schema:

```bash
# Replace with your actual connection string
psql "postgresql://user:password@host/heart?sslmode=require" -f database/schema.sql
```

### Step 2: Backend Setup (1 minute)

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL="your-neon-connection-string"
JWT_SECRET="my-super-secret-key-12345"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
OPENAI_API_KEY="your-openai-key-optional"
EOF

# Start backend
npm run dev
```

✅ Backend should be running at http://localhost:5000

### Step 3: Frontend Setup (1 minute)

```bash
cd frontend
npm install

# Start frontend
npm run dev
```

✅ Frontend should be running at http://localhost:3000

### Step 4: Test the App (1 minute)

1. Open http://localhost:3000
2. Click **"Get Started"**
3. Sign up with:
   - Email: test@example.com
   - Password: Test1234
   - Confirm: Test1234
4. You'll be redirected to the dashboard!

## ✨ Try It Out

### Example Workflow

1. **Paste this in the left panel:**
```
The study by Smith et al. (2023) demonstrates that machine learning algorithms 
can significantly improve diagnostic accuracy in medical imaging. Their findings 
suggest a 15% improvement over traditional methods.
```

2. **Click "Rewrite"** - Watch it transform into natural academic writing!

3. **Click "Grammar Check"** - See if there are any issues

4. **Click "AI Detect"** - Verify it appears human-written

5. **Click "Save Draft"** - Your work is saved!

6. **Click "Export"** - Download as PDF or DOCX

## 🔑 API Keys (Optional but Recommended)

### OpenAI API (for best rewriting quality)
1. Go to https://platform.openai.com
2. Create an API key
3. Add to backend `.env`: `OPENAI_API_KEY="sk-..."`
4. Restart backend

Without OpenAI key, the app will still work but rewriting will be limited.

### Free APIs Already Integrated
- **LanguageTool**: Free grammar checking (no key needed)
- **GPTZero**: Mock responses (add key for real detection)

## 🎯 Common Issues

### "Cannot connect to database"
- Check your Neon connection string is correct
- Ensure database name is "heart"
- Verify SSL mode is enabled

### "Frontend can't reach backend"
- Make sure backend is running on port 5000
- Check no other app is using port 5000

### "OpenAI API error"
- Check your API key is valid
- Ensure you have credits
- App works without it, just with limited features

## 📱 Next Steps

1. Explore the dashboard features
2. Try different writing styles
3. Check grammar and AI detection
4. Export your work
5. Browse your saved drafts at `/drafts`

## 🎓 Full Documentation

For complete documentation, see [README.md](README.md)

---

**Total setup time: ~5 minutes** ⚡

Need help? Check the troubleshooting section in the main README!

