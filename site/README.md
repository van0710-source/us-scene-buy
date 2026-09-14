# Robot-vacuum replacement-parts compatibility site

Static site for Amazon Associates + organic SEO. Current vertical: exact-model Roborock / Dreame replacement consumables. The earlier kitchen-drain experiment remains archived.

Live: https://van0710-source.github.io/us-scene-buy/

## Pages

| Path | Role |
|------|------|
| `index.html` | Home + one-field robot-model selector |
| `robots/index.html` | Verified model hub |
| `robots/*.html` | Manufacturer-source-backed model fit pages + Amazon CTAs |
| `assets/robot-compatibility.json` | Source matrix for generated pages |
| `quiz.html` | Archived kitchen-drain selector |
| `guides/` | Archived drain / air / floor experiments |

Product links use Associates tag **`usscenebuy-20`**. Every page includes the required disclosure; robot pages separate manufacturer fit evidence from Amazon shopping results.

Regenerate after editing the compatibility matrix:

```bash
cd /path/to/us-scene-buy
python3 scripts/generate-robot-pages.py
```

## Local preview

```bash
cd site && python3 -m http.server 8080
# open http://127.0.0.1:8080/
```

## Deploy

Push to `main` → GitHub Pages workflow deploys `site/` and runs IndexNow.
