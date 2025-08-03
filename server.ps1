$frontendPath = ".\frontend"
$backendPath  = ".\backend"
$venvActivate = Join-Path $backendPath "\venv\Scripts\Activate.ps1"
$frontendPort = 5173
$localhostURL = "http://localhost:$frontendPort"

Write-Host "`n🎯 Starting Fullstack Dev Environment..." -ForegroundColor Cyan
Write-Host "──────────────────────────────────────────────`n"

# ── 🚀 Launch Frontend ──
Write-Host "🌐 Starting Frontend server in new Windows Terminal tab..." -ForegroundColor Yellow
Start-Process wt.exe -ArgumentList @(
  "-w", "0",
  "new-tab", "-d", "$frontendPath", "-p", "PowerShell", "--title", "Frontend",
  "pwsh", "-NoExit", "-Command", "pnpm dev"
)
Write-Host "✅ Frontend launched at $frontendPath`n" -ForegroundColor Green

# ── ⚙️ Launch Backend ──
Write-Host "🧠 Starting Backend server in new Windows Terminal tab..." -ForegroundColor Yellow
Start-Process wt.exe -ArgumentList @(
  "-w", "0",
  "new-tab", "-d", "$backendPath", "-p", "PowerShell", "--title", "Backend",
  "pwsh", "-NoExit", "-Command", ".\start.ps1"
)
Write-Host "✅ Backend launched at $backendPath`n" -ForegroundColor Green

# ── 🌐 Open Browser ──
Write-Host "⏳ Waiting for frontend to be ready..." -ForegroundColor DarkGray
Start-Sleep -Seconds 1

Write-Host "🌍 Opening browser at: $localhostURL" -ForegroundColor Cyan
Start-Process "$localhostURL"
Write-Host "✅ Successfully opened $localhostURL`n" -ForegroundColor Green

Write-Host "🎉 All systems launched!" -ForegroundColor Magenta
