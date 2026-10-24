@echo off
REM Publish the Kalunda portal: vault source -> public repo mirror -> GitHub Pages.
REM Source of truth is this folder in the vault. The repo at C:\KALUNDA-WORLD is a
REM mirror, kept outside the vault so the vault's own git and Syncthing never see a
REM nested .git.
REM
REM Usage: double-click, or run from cmd. Safe to run repeatedly; commits only if changed.

set SRC=C:\OBSIDIAN-VAULT\ASTRALIS\ATELIER\EXDESIGN-CPX-INFSCHOOL-2026\70-SITE
set DST=C:\KALUNDA-WORLD

if not exist "%SRC%" (echo Source folder not found: %SRC% & exit /b 1)
if not exist "%DST%" (echo Mirror not found. Clone it first: & exit /b 1)

echo Mirroring vault source to %DST% ...
robocopy "%SRC%" "%DST%" /MIR /XD .git /XF *.bak /NFL /NDL /NJH /NJS /NP
if %ERRORLEVEL% GEQ 8 (echo Robocopy failed with %ERRORLEVEL% & exit /b %ERRORLEVEL%)

cd /d "%DST%"
git add -A
git commit -m "portal: sync from vault %DATE% %TIME%"
if errorlevel 1 echo Nothing to publish - no changes.
git push
echo.
echo Done. Site: https://tobiasdraven.github.io/Kalunda-World/
echo Pages rebuilds automatically on push (workflow: .github/workflows/pages.yml).
