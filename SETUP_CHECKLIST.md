# Setup Checklist

Use this checklist to ensure your Scientific Article Writing Agent is properly configured and running.

## ✅ Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor (VS Code recommended)
- [ ] Modern web browser (Chrome, Firefox, Edge)

## ✅ Database Setup

- [ ] Neon PostgreSQL account created (https://neon.tech)
- [ ] Database named **"heart"** created
- [ ] Connection string copied
- [ ] Schema executed successfully
  ```bash
  psql "YOUR_NEON_URL" -f database/schema.sql
  ```
- [ ] Tables verified (should see `users` and `article_drafts`)
  ```sql
  \dt
  ```

## ✅ Backend Setup

- [ ] Navigate to backend folder (`cd backend`)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created in `backend/` folder
- [ ] Environment variables configured:
  - [ ] `DATABASE_URL` - Neon connection string
  - [ ] `JWT_SECRET` - Random secret key (minimum 32 characters)
  - [ ] `PORT` - Set to 5000
  - [ ] `NODE_ENV` - Set to "development"
  - [ ] `FRONTEND_URL` - Set to "http://localhost:3000"
  - [ ] `OPENAI_API_KEY` - (Optional) Your OpenAI API key
- [ ] Backend starts without errors (`npm run dev`)
- [ ] Health check works: http://localhost:5000/health
- [ ] See success message in terminal:
  ```
  🚀 Heart Backend Server Started Successfully!
  📍 Server running on: http://localhost:5000
  ```

## ✅ Frontend Setup

- [ ] Navigate to frontend folder (`cd frontend`)
- [ ] Dependencies installed (`npm install`)
- [ ] No `.env.local` needed (uses default http://localhost:5000)
- [ ] Frontend starts without errors (`npm run dev`)
- [ ] Opens in browser: http://localhost:3000
- [ ] Landing page displays correctly
- [ ] No console errors in browser DevTools

## ✅ Application Testing

### Authentication Tests

- [ ] **Sign Up** works
  - [ ] Navigate to http://localhost:3000/signup
  - [ ] Fill in email: `test@example.com`
  - [ ] Fill in password: `Test1234`
  - [ ] Fill in confirm password: `Test1234`
  - [ ] Click "Sign Up"
  - [ ] Redirected to `/dashboard`
  - [ ] Success toast notification appears

- [ ] **Logout** works
  - [ ] Click "Logout" button in header
  - [ ] Redirected to `/login`
  - [ ] Success toast appears

- [ ] **Login** works
  - [ ] Navigate to http://localhost:3000/login
  - [ ] Enter email: `test@example.com`
  - [ ] Enter password: `Test1234`
  - [ ] Click "Log In"
  - [ ] Redirected to `/dashboard`
  - [ ] Success toast appears

### Dashboard Tests

- [ ] **Dashboard loads**
  - [ ] Header shows user email
  - [ ] Dual-panel editor visible
  - [ ] Left panel (input) visible
  - [ ] Right panel (output) visible
  - [ ] Tool panel with buttons visible

- [ ] **Text input works**
  - [ ] Can type in left panel
  - [ ] Character count updates
  - [ ] Word count updates

- [ ] **Rewrite function works**
  - [ ] Paste sample text in left panel
  - [ ] Click "Rewrite" button
  - [ ] Processing indicator shows
  - [ ] Rewritten text appears in right panel
  - [ ] Success toast appears

- [ ] **Grammar check works**
  - [ ] Text in right panel
  - [ ] Click "Grammar Check"
  - [ ] Grammar error count updates
  - [ ] Error details visible (if errors found)

- [ ] **AI detection works**
  - [ ] Text in right panel
  - [ ] Click "AI Detect"
  - [ ] AI score displays
  - [ ] Classification shown (human/ai)

- [ ] **Save draft works**
  - [ ] Enter title
  - [ ] Add content
  - [ ] Click "Save Draft"
  - [ ] Success toast appears

- [ ] **Export works**
  - [ ] Click "Export" dropdown
  - [ ] "Export PDF" option visible
  - [ ] "Export DOCX" option visible
  - [ ] PDF export triggers print dialog
  - [ ] DOCX export downloads file

### Drafts Page Tests

- [ ] **Drafts page loads**
  - [ ] Navigate to http://localhost:3000/drafts
  - [ ] Saved drafts display
  - [ ] Draft cards show title, preview, date

- [ ] **Open draft works**
  - [ ] Click "Open" on a draft
  - [ ] Redirected to `/dashboard`
  - [ ] Draft content loaded in editor

- [ ] **Delete draft works**
  - [ ] Click "Delete" on a draft
  - [ ] Confirmation dialog appears
  - [ ] Draft removed from list
  - [ ] Success toast appears

## ✅ API Endpoint Testing

Using the `backend/test-api.http` file (with REST Client VS Code extension):

- [ ] Health check returns 200
- [ ] Signup creates user
- [ ] Login returns token
- [ ] Get current user (with token) returns user data
- [ ] Create draft (with token) works
- [ ] Get all drafts (with token) works
- [ ] Update draft (with token) works
- [ ] Delete draft (with token) works
- [ ] Rewrite API (with token) works
- [ ] Grammar check API (with token) works
- [ ] AI detect API (with token) works

## ✅ Database Verification

Check database directly:

```sql
-- Connect to Neon database
psql "YOUR_NEON_URL"

-- Check users table
SELECT COUNT(*) FROM users;

-- Check article_drafts table
SELECT COUNT(*) FROM article_drafts;

-- Verify your test user exists
SELECT email, created_at FROM users WHERE email = 'test@example.com';

-- Verify UUID primary keys
SELECT id FROM users LIMIT 1;  -- Should be UUID format
```

## ✅ Browser Console Checks

Open DevTools (F12) → Console:

- [ ] No red errors in console
- [ ] API requests show 200/201 status codes
- [ ] JWT token stored in localStorage
- [ ] User object stored in localStorage

## ✅ Network Checks

Open DevTools (F12) → Network tab:

- [ ] API calls to `http://localhost:5000` work
- [ ] POST requests include JWT token in headers
- [ ] Response data is correct JSON format
- [ ] No CORS errors

## ✅ File Structure Verification

Check all files are in place:

```
arrticle_writer/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env ✓
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── store/
│   ├── node_modules/
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.ts
├── database/
│   └── schema.sql
└── documentation files
```

## ✅ Optional: API Keys

If you have API keys, verify they work:

- [ ] **OpenAI API Key**
  - [ ] Added to backend `.env`
  - [ ] Rewrite produces better quality text
  - [ ] No API errors in backend logs

- [ ] **GPTZero API Key**
  - [ ] Added to backend `.env`
  - [ ] AI detection returns real scores
  - [ ] No mock data message

## ✅ Security Checks

- [ ] `.env` file NOT committed to git
- [ ] `.gitignore` includes `.env`
- [ ] JWT secret is strong (32+ characters)
- [ ] Database connection uses SSL
- [ ] Passwords are hashed (never plain text)
- [ ] Token expires after set time

## ✅ Performance Checks

- [ ] Backend responds in < 1 second
- [ ] Frontend loads in < 3 seconds
- [ ] No memory leaks (check Task Manager)
- [ ] Database queries are fast

## ✅ Production Readiness (Optional)

If deploying to production:

- [ ] Environment variables set on hosting platform
- [ ] Database connection string updated
- [ ] CORS configured for production URL
- [ ] Frontend API URL points to production backend
- [ ] SSL/HTTPS enabled
- [ ] Error logging configured
- [ ] Monitoring set up

## 🎉 Completion

When all items are checked:

✅ **Your Scientific Article Writing Agent is fully operational!**

### Quick Test Flow

1. Open http://localhost:3000
2. Sign up with new account
3. Paste research text in left panel
4. Click "Rewrite"
5. Click "Grammar Check"
6. Click "AI Detect"
7. Click "Save Draft"
8. Click "Export" → PDF

If all steps work → **You're ready to go!** 🚀

## 🆘 Troubleshooting

If any item fails, check:

1. **Backend Issues**
   - Review `backend/README.md`
   - Check environment variables
   - Verify database connection
   - Check backend logs

2. **Frontend Issues**
   - Review `frontend/README.md`
   - Check browser console
   - Verify API URL
   - Clear browser cache

3. **Database Issues**
   - Review `database/README.md`
   - Verify Neon connection
   - Check schema was applied
   - Test connection with psql

4. **General Issues**
   - Review `README.md`
   - Check `QUICK_START.md`
   - Verify all dependencies installed
   - Restart both servers

---

**Need help?** Refer to the comprehensive documentation in `README.md`

