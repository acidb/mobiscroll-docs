@echo off

SET logfile="c:\webapps\mobiscroll-web\deploylog.txt"

echo Deploy

echo MobiscrollDocs Deploy Start %date% %time% >> %logfile%
xcopy /s /y c:\dailybuild\mobiscroll-docs\build\ c:\webapps\mobiscroll-web\MobiscrollMVC\docs\
echo MobiscrollDocs Deploy End %date% %time% >> %logfile%

echo.>>%logfile%
pause
