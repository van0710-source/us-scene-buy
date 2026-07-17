# Kitchen drain mini-site (MVP)

Static site for Associates application + organic SEO. **Single vertical only** (kitchen drain) — not a multi-category portal.

## Pages

| Path | Role |
|------|------|
| `index.html` | Home |
| `quiz.html` | Constraint quiz → one primary pick |
| `guides/slow-kitchen-drain-grease.html` | T02 |
| `guides/septic-safe-kitchen-drain.html` | T04 |
| `guides/kitchen-sink-smell.html` | T03 |
| `guides/prevent-grease-clog.html` | ③→① prevention |

Product links are **untagged** Amazon URLs until Associates approval. Every page includes affiliate disclosure + safety copy.

## Local preview

```bash
cd site && python3 -m http.server 8080
# open http://127.0.0.1:8080/
```

## Next ops step

Deploy to a public HTTPS URL (GitHub Pages, Cloudflare Pages, Netlify, etc.), then apply to **Amazon Associates** with that URL (see `docs/08-ops-roadmap.md` Phase 2).
