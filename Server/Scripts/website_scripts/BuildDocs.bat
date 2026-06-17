@echo off
set "branch=main"
@echo Default branch is %branch%
@echo Getting Latest changes

cd "C:\dailybuild\mobiscroll-docs"
call git fetch
call git checkout .
call git checkout %branch%
call git pull
REM if not [%branch%] == [main] pause


@echo Build
set NODE_OPTIONS=--max-old-space-size=16384
REM docusaurus 3 needs higher node version
nvm use 20
call npm install
call npm run build
REM reset base node version
nvm use 16
@echo build finished
pause
