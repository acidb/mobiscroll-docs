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
call npm run build
@echo build finished
pause
