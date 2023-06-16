@echo off
set "branch=main"
@echo Default branch is %branch%
@echo Getting Latest changes

cd "C:\dailybuild\mobiscroll-docs-staging"
git fetch
git checkout .
git checkout %branch%
git pull
if not [%branch%] == [main] pause


@echo Build
npm run build-dev
@echo build finished
pause
