# Deployment Guide

Complete guide to deploying the Scientific Article Writing Agent to production.

## 🌍 Deployment Options

### Recommended Stack
- **Backend**: Railway, Render, or Heroku
- **Frontend**: Vercel or Netlify
- **Database**: Neon PostgreSQL (already hosted)

## 📦 Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` folder

4. **Set Environment Variables**
   - Go to "Variables" tab
   - Add all required variables:
   ```
   DATABASE_URL=your-neon-connection-string
   JWT_SECRET=your-secret-key
   OPENAI_API_KEY=your-openai-key
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   PORT=5000
   ```

5. **Deploy**
   - Railway will auto-deploy
   - Copy your backend URL (e.g., `https://your-app.up.railway.app`)

### Option 2: Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Root Directory**: `backend`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

3. **Set Environment Variables**
   - Add all required variables in Render dashboard

4. **Deploy**
   - Click "Create Web Service"
   - Copy your backend URL

### Option 3: Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create your-article-writer-api

# Set environment variables
heroku config:set DATABASE_URL="your-neon-url"
heroku config:set JWT_SECRET="your-secret"
heroku config:set OPENAI_API_KEY="your-key"
heroku config:set NODE_ENV="production"

# Deploy
git subtree push --prefix backend heroku main
```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Deploy via Vercel Dashboard**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

2. **Set Environment Variable**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Netlify

1. **Deploy via Netlify Dashboard**
   - Go to https://netlify.com
   - Click "Add new site"
   - Connect to GitHub

2. **Configure Build**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

3. **Set Environment Variable**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

4. **Deploy**
   - Your app will be live at `https://your-app.netlify.app`

## 🔧 Post-Deployment Configuration

### Update Backend CORS

After deploying frontend, update backend `.env`:

```env
FRONTEND_URL=https://your-app.vercel.app
```

Redeploy backend to apply changes.

### Update Frontend API URL

In your frontend deployment, set:
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

## ✅ Verification Checklist

- [ ] Database connection works
- [ ] Backend health check responds: `GET /health`
- [ ] User signup works
- [ ] User login works
- [ ] Dashboard loads
- [ ] Text rewriting works
- [ ] Grammar check works
- [ ] AI detection works
- [ ] Draft saving works
- [ ] Export to PDF works
- [ ] Export to DOCX works

## 🔒 Production Security

### Backend Security

1. **Strong JWT Secret**
   ```bash
   # Generate a strong secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Environment Variables**
   - Never commit `.env` files
   - Use deployment platform's secret management

3. **Rate Limiting** (Optional)
   Add to backend:
   ```bash
   npm install express-rate-limit
   ```

### Frontend Security

1. **Environment Variables**
   - Only use `NEXT_PUBLIC_` prefix for public variables
   - Never expose backend API keys

2. **HTTPS**
   - Vercel/Netlify provide automatic SSL
   - Ensure all API calls use HTTPS

## 📊 Monitoring

### Backend Monitoring

Add logging service:
- **LogTail**: https://logtail.com
- **Sentry**: https://sentry.io

### Frontend Monitoring

Vercel Analytics (built-in):
- Go to your project dashboard
- Enable Analytics
- View real-time metrics

## 🚀 CI/CD (Optional)

### Automatic Deployments

Both Vercel and Railway support automatic deployments:

1. **Main branch** → Production
2. **Pull requests** → Preview deployments
3. **Feature branches** → Development deployments

Configuration:
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: echo "Railway auto-deploys on push"
```

## 💰 Cost Estimates

### Free Tier Options

**Backend (Railway):**
- Free tier: $5 credit/month
- Estimated cost: $0-5/month

**Frontend (Vercel):**
- Free tier: Unlimited
- Hobby plan: Free forever

**Database (Neon):**
- Free tier: 1 project, 1GB storage
- Estimated cost: $0/month

**Total**: $0-5/month for small usage

### Paid Tier (Recommended for Production)

- Railway: ~$10/month
- Vercel Pro: $20/month
- Neon: ~$20/month
- **Total**: ~$50/month

## 📱 Custom Domain (Optional)

### Vercel Custom Domain

1. Go to your project → Settings → Domains
2. Add your domain (e.g., `articlewriter.com`)
3. Update DNS records (Vercel provides instructions)
4. SSL is automatic

### Railway Custom Domain

1. Go to Settings → Domains
2. Add custom domain
3. Update DNS CNAME record
4. SSL is automatic

## 🔄 Database Migrations

For schema updates:

```bash
# Backup database first
pg_dump YOUR_NEON_URL > backup.sql

# Run new migration
psql YOUR_NEON_URL -f database/migration.sql
```

## 📞 Support

If you encounter issues:

1. Check deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check CORS configuration
5. Review security settings

## 🎉 Success!

Your Scientific Article Writing Agent is now live!

- 🌐 Frontend: https://your-app.vercel.app
- 🔧 Backend: https://your-api.railway.app
- 🗄️ Database: Neon PostgreSQL

Share your deployed app and start writing! ✨

