@echo off
setlocal
cd /d "%~dp0"
title Youssef Portfolio Local Server

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js was not found on this computer.
  echo Install Node.js or use VS Code Live Server.
  echo.
  pause
  exit /b 1
)

echo.
echo Starting portfolio at http://127.0.0.1:5500
echo Keep this window open while using the website.
echo Press Ctrl+C to stop the server.
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:5500/'"
node local-server.js

echo.
echo The local server stopped.
pause
