# Kitchen drain mini-site

Static site for Amazon Associates + organic SEO. **Single vertical** (kitchen drain) with a few conversion probes.

Live: https://van0710-source.github.io/us-scene-buy/

## Pages

| Path | Role |
|------|------|
| `index.html` | Home + symptom grid |
| `quiz.html` | Constraint quiz → one primary pick |
| `guides/index.html` | Guides hub by symptom |
| `guides/*.html` | High-intent SEO + contextual Amazon CTAs |

Product links use Associates tag **`usscenebuy-20`**. Every commercial page includes affiliate disclosure + safety copy.

## Local preview

```bash
cd site && python3 -m http.server 8080
# open http://127.0.0.1:8080/
```

## Deploy

Push to `main` → GitHub Pages workflow deploys `site/` and runs IndexNow.
