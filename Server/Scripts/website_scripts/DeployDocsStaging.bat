@echo off

SET logfile="c:\webapps\mobiscroll-web-staging\deploylog.txt"

echo Deploy

echo MobiscrollDocs Staging Deploy Start %date% %time% >> %logfile%
xcopy /s /y c:\dailybuild\mobiscroll-docs-staging\build\ c:\webapps\mobiscroll-web-staging\MobiscrollMVC\docs\
echo MobiscrollDocs Staging Deploy End %date% %time% >> %logfile%

echo.>>%logfile%
pause
