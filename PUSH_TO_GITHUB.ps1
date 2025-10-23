# Quick GitHub Push Script
# Run this to push your code to GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Push to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "Enter your GitHub username:" -ForegroundColor Yellow
$username = Read-Host

Write-Host ""
Write-Host "Enter repository name (default: scientific-article-writer):" -ForegroundColor Yellow
$repoName = Read-Host
if ($repoName -eq "") {
    $repoName = "scientific-article-writer"
}

Write-Host ""
Write-Host "🔍 Staging all files..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "📝 Committing..." -ForegroundColor Cyan
git commit -m "Scientific article writer with AI - production ready for Render deployment"

Write-Host ""
Write-Host "🔗 Adding GitHub remote..." -ForegroundColor Cyan
$repoUrl = "https://github.com/$username/$repoName.git"
git remote remove origin 2>$null
git remote add origin $repoUrl

Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your repository: $repoUrl" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://dashboard.render.com" -ForegroundColor White
Write-Host "2. Click 'New +' → 'Web Service'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Follow instructions in RENDER_DEPLOYMENT.md" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full guide: See RENDER_DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""

