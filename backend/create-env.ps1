# PowerShell script to create .env file
Write-Host "Creating .env file..." -ForegroundColor Green

$envContent = @"
DATABASE_URL="postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require"
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
OPENAI_API_KEY=""
"@

# Create .env file
$envContent | Out-File -FilePath ".env" -Encoding ASCII -NoNewline

Write-Host "`n✅ .env file created successfully!" -ForegroundColor Green
Write-Host "`nContent:" -ForegroundColor Yellow
Get-Content .env
Write-Host "`nNow run: npm run dev" -ForegroundColor Cyan

