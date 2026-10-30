#!/bin/bash
export PATH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
cd /home/user/tezgel/_werkstatt/werkzeuge
curl -s -o /dev/null -w "4324 %{http_code}\n" http://127.0.0.1:4324/ || exit 1
echo "=== SUITE reduziert $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4324 RELAUNCH_REPORT=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/e4b/suite/suite.json RELAUNCH_OUTPUT=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/e4b/suite/suite-out npx playwright test 2>&1 | tail -5
echo "=== SUITE Bewegung an $(date +%T)"; RELAUNCH_BEWEGUNG=an RELAUNCH_BASE=http://127.0.0.1:4324 RELAUNCH_REPORT=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/e4b/suite/suite-bewegung.json RELAUNCH_OUTPUT=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/e4b/suite/suite-b-out npx playwright test 2>&1 | tail -5
echo "=== ENDE $(date +%T)"
