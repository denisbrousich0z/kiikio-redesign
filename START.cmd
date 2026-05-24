@echo off
REM Kiikio — After the Storm — local launcher (Windows)
REM Double-click this file to start the prototype on http://localhost:3000

setlocal
cd /d "%~dp0prototype"

echo.
echo ============================================
echo   KIIKIO -- AFTER THE STORM
echo   Local prototype launcher
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [!] Node.js is not installed.
  echo     Install Node 18+ from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo [1/2] Installing dependencies (first run, ~1-2 min)...
  call npm install
  if errorlevel 1 (
    echo [!] npm install failed.
    pause
    exit /b 1
  )
) else (
  echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Starting dev server...
echo.
echo   Open http://localhost:3000 in your browser.
echo   Press Ctrl+C in this terminal to stop the server.
echo.

call npm run dev

endlocal
