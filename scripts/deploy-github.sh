#!/usr/bin/env bash
# One-shot: create GitHub repo + push + enable Pages (site/ via workflow).
# Requires: gh logged in once (`gh auth login`).
set -euo pipefail
cd "$(dirname "$0")/.."

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI not logged in. Run once: gh auth login"
  echo "Then re-run: bash scripts/deploy-github.sh"
  exit 1
fi

REPO_NAME="${REPO_NAME:-us-scene-buy}"
VISIBILITY="${VISIBILITY:-public}"

if ! git remote get-url origin >/dev/null 2>&1; then
  gh repo create "$REPO_NAME" --"$VISIBILITY" --source=. --remote=origin --push
else
  git push -u origin HEAD
fi

OWNER="$(gh repo view --json owner -q .owner.login)"
NAME="$(gh repo view --json name -q .name)"

# Enable GitHub Pages from Actions
gh api -X POST "repos/${OWNER}/${NAME}/pages" \
  -f build_type=workflow \
  -f source[branch]=main \
  -f source[path]=/ \
  2>/dev/null || true

gh workflow run deploy-pages.yml 2>/dev/null || true

echo ""
echo "Pushed. Pages URL (after Actions finishes, ~1–2 min):"
echo "  https://${OWNER}.github.io/${NAME}/"
echo "Quiz: https://${OWNER}.github.io/${NAME}/quiz.html"
echo ""
echo "Check: gh run list --workflow=deploy-pages.yml"
