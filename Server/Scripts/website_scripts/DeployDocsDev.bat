@echo off

SET logfile="c:\webapps\mobiscroll-web-dev\deploylog.txt"

echo Deploy

echo MobiscrollDocs Dev Deploy Start %date% %time% >> %logfile%
xcopy /s /y c:\dailybuild\mobiscroll-docs-staging\build\ c:\webapps\mobiscroll-web-dev\MobiscrollMVC\docs\
echo MobiscrollDocs Dev Deploy End %date% %time% >> %logfile%

echo.>>%logfile%
pause
