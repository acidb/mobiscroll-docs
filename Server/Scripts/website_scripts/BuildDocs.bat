@echo off
set "branch=main"
@echo Default branch is %branch%
@echo Getting Latest changes

cd "C:\dailybuild\mobiscroll-docs"
git fetch
git checkout .
git checkout %branch%
git pull
REM if not [%branch%] == [main] pause


@echo Build
npm run build
@echo build finished
pause
