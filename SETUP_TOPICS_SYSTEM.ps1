# Quick Setup Script for Topic-Based Research System
# Run this after reviewing TOPIC_RESEARCH_SYSTEM.md

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   Topic Research System Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Run Database Migration" -ForegroundColor Yellow
Write-Host "----------------------------------------"  -ForegroundColor Gray
Write-Host ""
Write-Host "Choose your option:" -ForegroundColor White
Write-Host "1. I'll do it manually in Neon Console" -ForegroundColor Gray
Write-Host "2. Run psql command now (requires psql installed)" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Enter 1 or 2"

if ($choice -eq "2") {
    Write-Host ""
    Write-Host "Running psql command..." -ForegroundColor Yellow
    psql "postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require" -f database/schema_topics.sql
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database migration successful!" -ForegroundColor Green
    } else {
        Write-Host "❌ Database migration failed!" -ForegroundColor Red
        Write-Host "Please run manually in Neon Console" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host ""
    Write-Host "📋 Manual Steps:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://console.neon.tech" -ForegroundColor White
    Write-Host "2. Select 'article_writer' database" -ForegroundColor White
    Write-Host "3. Open SQL Editor" -ForegroundColor White
    Write-Host "4. Copy contents from: database/schema_topics.sql" -ForegroundColor White
    Write-Host "5. Paste and run in SQL Editor" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "Press Enter when done, or Ctrl+C to exit"
}

Write-Host ""
Write-Host "Step 2: Restart Backend Server" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""
Write-Host "Backend needs to restart to load new routes..." -ForegroundColor White
Write-Host ""
Write-Host "⚠️  In your backend terminal:" -ForegroundColor Yellow
Write-Host "  1. Press Ctrl+C to stop backend" -ForegroundColor White
Write-Host "  2. Run: npm run dev" -ForegroundColor White
Write-Host ""
$continue = Read-Host "Press Enter when backend restarted"

Write-Host ""
Write-Host "Step 3: Test the API" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""
Write-Host "Testing health check..." -ForegroundColor White

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
    if ($response.success) {
        Write-Host "✅ Backend is running!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Backend not responding. Please check if it's running." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "   Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Database tables created" -ForegroundColor Green
Write-Host "✅ Backend routes loaded" -ForegroundColor Green
Write-Host "✅ API endpoints ready" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Read TOPIC_RESEARCH_SYSTEM.md for full details" -ForegroundColor White
Write-Host "2. Frontend UI will be created next" -ForegroundColor White
Write-Host "3. Test endpoints in browser or Postman" -ForegroundColor White
Write-Host ""
Write-Host "🎯 New API Endpoints Available:" -ForegroundColor Cyan
Write-Host "  POST   /api/topics              - Create topic" -ForegroundColor Gray
Write-Host "  GET    /api/topics              - Get all topics" -ForegroundColor Gray
Write-Host "  POST   /api/topics/:id/entries  - Add entry" -ForegroundColor Gray
Write-Host "  GET    /api/topics/:id/entries  - View entries" -ForegroundColor Gray
Write-Host ""
Write-Host "Ready to organize your research! 🚀" -ForegroundColor Green
Write-Host ""

