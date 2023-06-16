@echo off
set "branch=main"
@echo Default branch is %branch%
@echo Getting Latest changes

cd "C:\dailybuild\mobiscroll-docs-staging"
call git fetch
call git checkout .
call git checkout %branch%
call git pull
if not [%branch%] == [main] pause


@echo Build
call npm run build-dev
@echo build finished
pause
