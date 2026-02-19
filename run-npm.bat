@echo off
set "NODE_DIR=C:\Program Files\nodejs"
set "PATH=%NODE_DIR%;%PATH%"
if not exist "%NODE_DIR%\npm.cmd" (
  echo Node.js not found at %NODE_DIR%. Install from https://nodejs.org
  exit /b 1
)
call "%NODE_DIR%\npm.cmd" %*
