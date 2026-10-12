#!/usr/bin/env bash
# Wartet auf den Vercel-Commit-Status (alle 20 s, max. 10 min). Ausgabe: success|failure|error|timeout
SHA="$1"; MAX="${2:-600}"; t=0
while [ "$t" -lt "$MAX" ]; do
  out=$(gh api "repos/umutcantezgel-cpu/tezgel/commits/$SHA/statuses" --jq '[.[]|select(.context|startswith("Vercel"))][0]|.state+" "+.description+" "+.target_url' 2>/dev/null)
  st="${out%% *}"
  case "$st" in success|failure|error) echo "$out"; exit 0;; esac
  sleep 20; t=$((t+20))
done
echo "timeout"
