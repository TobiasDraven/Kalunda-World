@echo off
setlocal
REM Publish the Kalunda portal: vault source -> public repo mirror -> GitHub Pages.
REM Source of truth is this folder in the vault. The repo at C:\KALUNDA-WORLD is a
REM mirror, kept outside the vault so the vault's own git and Syncthing never see a
REM nested .git.
REM
REM Usage:  publish.cmd            copy new and changed files only. Nothing is ever deleted.
REM         publish.cmd purge      full mirror - deletes repo-side files absent from the
REM                                vault folder. Guarded: it refuses to run unless
REM                                .github\workflows\pages.yml exists in the source,
REM                                because a mirror would otherwise destroy the Pages
REM                                workflow the repo needs.
REM
REM Double-click works. Safe to run repeatedly; commits only when something changed.

REM EXCLUSIONS ARE NOT DECIDED HERE.
REM This script moves bytes. What the public repository carries is decided by the
REM .gitignore in the source folder (70-SITE\.gitignore) - a versioned, owned, dated
REM record - and by git, at `git add`. The previous form carried the exclusion as a
REM /XD _SOURCE /XF *.bak flag inside the job, which made a content decision at the
REM moment a timer happened to run it. Owner of that decision: Archon Atlas,
REM 2026-10-26 (APEX 20261026-1317-APEX-002 section 2). Add or remove exclusions in
REM 70-SITE\.gitignore, never in a robocopy flag below.

set SRC=C:\OBSIDIAN-VAULT\ASTRALIS\ATELIER\EXDESIGN-CPX-INFSCHOOL-2026\70-SITE
set DST=C:\KALUNDA-WORLD
set MODE=copy
if /i "%~1"=="purge" set MODE=purge
if /i "%~1"=="/purge" set MODE=purge

if not exist "%SRC%" echo Source folder not found: %SRC% & goto :fail
if not exist "%DST%" echo Mirror not found - clone it first: %DST% & goto :fail

if /i "%MODE%"=="purge" goto :purge
echo Copying new and changed files only - nothing will be deleted ...
robocopy "%SRC%" "%DST%" /E /XD .git /NFL /NDL /NJH /NJS /NP
goto :after

:purge
if not exist "%SRC%\.github\workflows\pages.yml" goto :noguard
echo MIRRORING - this deletes repo files absent from the vault ...
robocopy "%SRC%" "%DST%" /MIR /XD .git /NFL /NDL /NJH /NJS /NP
goto :after

:noguard
echo ABORT: purge requires .github\workflows\pages.yml in the source.
echo A mirror without it deletes the repo's Pages workflow. Fix the source first.
goto :fail

:after
if %ERRORLEVEL% GEQ 8 echo Robocopy failed with %ERRORLEVEL% & goto :fail

cd /d "%DST%"
git add -A
git commit -m "portal: sync from vault %DATE% %TIME%"
if errorlevel 1 echo Nothing to publish - no changes.
git push
echo.
echo Done. Site: https://tobiasdraven.github.io/Kalunda-World/
echo Pages rebuilds automatically on push, workflow .github/workflows/pages.yml
exit /b 0

:fail
exit /b 1
