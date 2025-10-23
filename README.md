# 📝 Scientific Article Writer

AI-powered academic writing assistant with OpenAI integration, database storage, and export capabilities.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **🤖 AI Rewriting** - Transform text into professional academic writing using OpenAI
- **👤 User Authentication** - Secure signup/login with JWT tokens
- **💾 Database Storage** - Save drafts with original and rewritten content
- **📥 Export Options** - Download as PDF or DOCX format
- **📊 Grammar Check** - Integrated grammar checking
- **🔍 AI Detection** - Check if content appears AI-generated
- **📱 Mobile Friendly** - Fully responsive design for all devices
- **🔒 Secure** - Password hashing, JWT auth, environment variables

## 🚀 Live Demo

**Production URL:** `https://your-app.onrender.com` (after deployment)

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** - REST API
- **TypeScript** - Type safety
- **PostgreSQL (Neon)** - Serverless database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **OpenAI API** - AI text rewriting

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - API requests
- **Zustand** - State management
- **React Hot Toast** - Notifications
- **DOCX** - Word export
- **File Saver** - PDF export

### Database Schema
- **users** - Authentication (UUID, email, password_hash)
- **article_drafts** - Content storage (UUID, original_content, rewritten_content, citations, metadata)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- OpenAI API key
- GitHub account (for deployment)
- Render account (for hosting)

## 🔧 Local Development

### 1. Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/scientific-article-writer.git
cd scientific-article-writer
```

### 2. Setup Database
Run the SQL schema in your Neon database:
```sql
-- See database/schema.sql for complete schema
```

### 3. Backend Setup
```bash
cd backend
npm install

# Create .env file (or run create-env.ps1)
# Add:
DATABASE_URL="your-neon-connection-string"
JWT_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-key"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

npm run dev
# Backend runs on http://localhost:5000
```

### 4. Frontend Setup
```bash
cd frontend
npm install

# Optional: Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000

npm run dev
# Frontend runs on http://localhost:3000
```

### 5. Access Application
Open **http://localhost:3000** in your browser

## 🌐 Production Deployment

### Deploy to Render ($7/month for 24/7 uptime)

**Complete deployment guide:** See `RENDER_DEPLOYMENT.md`

**Quick Steps:**
1. Push code to GitHub
2. Create Render account
3. Deploy backend service
4. Deploy frontend service
5. Configure environment variables
6. Access your live app!

**Or run:**
```powershell
.\PUSH_TO_GITHUB.ps1
```

Then follow Render instructions.

## 📖 Documentation

- **RENDER_DEPLOYMENT.md** - Complete Render deployment guide
- **QUICK_TEST_GUIDE.md** - Feature testing instructions
- **SYSTEM_VERIFICATION.md** - Architecture and status
- **DIAGNOSIS_AND_FIX.md** - Troubleshooting guide

## 🎯 Usage

1. **Sign Up** - Create account with email/password
2. **Login** - Access dashboard
3. **Write/Paste** - Add your research text in left panel
4. **Rewrite** - Click "Rewrite" button for AI transformation
5. **Review** - Check rewritten content in right panel
6. **Save** - Store draft in database
7. **Export** - Download as PDF or DOCX
8. **Submit** - Use in your journal/publication!

## 🔐 Security

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT token authentication
- ✅ Environment variables for sensitive data
- ✅ CORS configured
- ✅ SQL injection protection
- ✅ Input validation
- ✅ HTTPS enforced in production

## 💰 Cost Breakdown

**Total: $7-14/month**

- Render Starter Plan: $7/month (backend + frontend combined) or $14/month (separate)
- Neon Database: Free tier (sufficient for personal use)
- OpenAI API: Pay-as-you-go (typically $0.50-$2/month for light use)

## 📱 Mobile Support

Fully responsive design works on:
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Mobile (iOS, Android)
- ✅ Tablet (iPad, Android tablets)
- ✅ All modern browsers

## 🤝 Contributing

Contributions welcome! See `CONTRIBUTING.md`

## 📄 License

MIT License - See LICENSE file

## 🐛 Issues & Support

Found a bug? Have a question?
1. Check existing issues
2. Create new issue with details
3. Include error messages/screenshots

## 🎓 Use Cases

Perfect for:
- Academic researchers
- Medical professionals
- PhD students
- Journal article writers
- Review article authors
- Conference paper submissions
- Grant proposal writing
- Research documentation

## 📊 Features Roadmap

- [ ] Research database integration (Perplexity, ResearchPal)
- [ ] Citation management
- [ ] Collaboration features
- [ ] Version history
- [ ] Custom AI prompts
- [ ] Multiple export formats
- [ ] Plagiarism checking
- [ ] Reference formatting (APA, MLA, Chicago)

## ⭐ Star History

If this project helps you, please consider giving it a star! ⭐

## 📞 Contact

- GitHub: [@YOUR-USERNAME](https://github.com/YOUR-USERNAME)
- Email: your-email@example.com

## 🙏 Acknowledgments

- OpenAI for GPT API
- Neon for serverless PostgreSQL
- Render for deployment platform
- Next.js and React teams

---

**Made with ❤️ for the academic community**

**Status:** ✅ Production Ready | 🚀 24/7 Deployment | 📱 Mobile Friendly
