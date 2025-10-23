# Quick script to add OpenAI API key to .env file
# Usage: .\add-openai-key.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   OpenAI API Key Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Creating .env from template..." -ForegroundColor Yellow
    Copy-Item "../env.template" ".env"
    Write-Host "✅ Created .env file" -ForegroundColor Green
}

Write-Host "📝 Enter your OpenAI API key (starts with sk-...):" -ForegroundColor Yellow
Write-Host "   Get it from: https://platform.openai.com/api-keys" -ForegroundColor Gray
Write-Host ""
$apiKey = Read-Host "API Key"

if ($apiKey -eq "") {
    Write-Host "❌ No API key provided. Exiting." -ForegroundColor Red
    exit 1
}

if (-not $apiKey.StartsWith("sk-")) {
    Write-Host "⚠️  Warning: API key should start with 'sk-'" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "❌ Cancelled." -ForegroundColor Red
        exit 1
    }
}

# Read .env file
$envContent = Get-Content ".env" -Raw

# Check if OPENAI_API_KEY already exists
if ($envContent -match 'OPENAI_API_KEY=') {
    # Replace existing key
    $envContent = $envContent -replace 'OPENAI_API_KEY="[^"]*"', "OPENAI_API_KEY=`"$apiKey`""
    $envContent = $envContent -replace 'OPENAI_API_KEY=[^\r\n]*', "OPENAI_API_KEY=`"$apiKey`""
    Write-Host "✅ Updated existing OpenAI API key" -ForegroundColor Green
} else {
    # Add new key
    $envContent += "`nOPENAI_API_KEY=`"$apiKey`"`n"
    Write-Host "✅ Added OpenAI API key" -ForegroundColor Green
}

# Write back to .env
Set-Content ".env" $envContent

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "✅ OpenAI API Key Configured!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart backend: npm run dev" -ForegroundColor White
Write-Host "2. Go to dashboard and test Rewrite button" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Remember:" -ForegroundColor Yellow
Write-Host "- OpenAI API calls cost money (small amounts)" -ForegroundColor Gray
Write-Host "- Set usage limits in OpenAI dashboard" -ForegroundColor Gray
Write-Host "- Rewrite button only calls when YOU click it" -ForegroundColor Gray
Write-Host ""

