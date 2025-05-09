@echo off
set "branch=main"
@echo Default branch is %branch%
set /p branch="Enter Branch (leave empty to default):" %=%

@echo Getting Latest changes from %branch%

cd "C:\dailybuild\mobiscroll-docs-staging"
call git fetch
call git checkout .
call git checkout %branch%
call git pull
if not [%branch%] == [main] pause


@echo Build
set NODE_OPTIONS=--max-old-space-size=16384
call npm run build-dev
@echo build finished
pause
