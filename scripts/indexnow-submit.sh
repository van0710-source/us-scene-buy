#!/usr/bin/env bash
# Submit sitemap URLs to IndexNow (Bing & partners). Runnable by Agent/CI — no user login.
set -euo pipefail

KEY="1fdae797761d1c5c0fcb835cb6783339"
HOST="van0710-source.github.io"
KEY_LOCATION="https://${HOST}/us-scene-buy/${KEY}.txt"
SITEMAP="https://${HOST}/us-scene-buy/sitemap.xml"

TMP_URLS="$(mktemp)"
trap 'rm -f "$TMP_URLS"' EXIT

if ! curl -fsSL "$SITEMAP" | grep -oE 'https://[^<]+' >"$TMP_URLS"; then
  echo "Failed to fetch sitemap" >&2
  exit 1
fi

COUNT=$(wc -l <"$TMP_URLS" | tr -d ' ')
echo "Submitting ${COUNT} URLs to IndexNow…"

JSON=$(python3 - "$KEY" "$HOST" "$KEY_LOCATION" "$TMP_URLS" <<'PY'
import json, sys
key, host, key_location, path = sys.argv[1:5]
with open(path) as f:
    urls = [line.strip() for line in f if line.strip()]
print(json.dumps({
    "host": host,
    "key": key,
    "keyLocation": key_location,
    "urlList": urls,
}))
PY
)

code=$(curl -sS -o /tmp/indexnow-out.txt -w "%{http_code}" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$JSON")
echo "HTTP $code"
cat /tmp/indexnow-out.txt 2>/dev/null || true
echo
case "$code" in
  200|202) exit 0 ;;
  *) exit 1 ;;
esac
