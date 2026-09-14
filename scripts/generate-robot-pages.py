#!/usr/bin/env python3
"""Generate static robot-vacuum compatibility pages from the reviewed matrix."""

from __future__ import annotations

import html
import json
from pathlib import Path
from urllib.parse import quote_plus

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "site" / "assets" / "robot-compatibility.json"
OUT = ROOT / "site" / "robots"
BASE = "https://van0710-source.github.io/us-scene-buy/"
TAG = "usscenebuy-20"


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def amazon_url(query: str) -> str:
    return f"https://www.amazon.com/s?k={quote_plus(query)}&tag={TAG}"


def header(prefix: str, current: str = "") -> str:
    attrs = {
        "models": ' aria-current="page"' if current == "models" else "",
        "archive": ' aria-current="page"' if current == "archive" else "",
        "about": ' aria-current="page"' if current == "about" else "",
    }
    return f"""  <header class="site-header">
    <div class="site-header-inner">
      <a class="logo" href="{prefix}index.html">US Scene Buy</a>
      <nav class="nav" aria-label="Primary">
        <a href="{prefix}robots/"{attrs["models"]}>Robot parts</a>
        <a href="{prefix}guides/"{attrs["archive"]}>Drain archive</a>
        <a href="{prefix}about.html"{attrs["about"]}>How we verify</a>
      </nav>
    </div>
  </header>"""


def footer(prefix: str) -> str:
    return f"""  <footer class="site-footer">
    <div class="site-footer-inner">
      <p><strong>Affiliate disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases.</p>
      <p>Compatibility is based on the manufacturer sources linked on each page. Re-check the full model name and the current Amazon listing before ordering.</p>
      <p><a href="{prefix}about.html">How we verify</a> · <a href="{prefix}privacy.html">Privacy</a> · <a href="{prefix}robots/">All robot models</a> · <a href="{prefix}guides/">Drain archive</a></p>
    </div>
  </footer>"""


def selector(models: list[dict], prefix: str = "") -> str:
    options = "\n".join(
        f'          <option value="{prefix}{esc(item["slug"])}.html">{esc(item["brand"])} {esc(item["model"])}</option>'
        for item in models
    )
    return f"""      <form class="model-picker" data-model-picker>
        <label for="robot-model"><strong>Choose the exact model on your machine label</strong></label>
        <div class="model-picker-row">
          <select id="robot-model" name="model" data-model-select>
            <option value="">Select a Roborock or Dreame model</option>
{options}
          </select>
          <button class="primary" type="submit">See compatible parts</button>
        </div>
        <p class="hint">One field, no account. Similar model names can use different bags, filters, mops, or brushes.</p>
      </form>"""


def render_home(models: list[dict]) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Robot vacuum replacement parts by exact model — US Scene Buy</title>
  <meta name="description" content="Match Roborock and Dreame dust bags, filters, mop pads, and brushes to the exact robot-vacuum model before buying." />
  <link rel="canonical" href="{BASE}" />
  <link rel="alternate" type="application/atom+xml" title="US Scene Buy updates" href="feed.xml" />
  <script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"WebSite","name":"US Scene Buy","url":"{BASE}","description":"Exact-model compatibility help for robot-vacuum replacement consumables."}}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600;7..72,700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="assets/site.css" />
</head>
<body>
{header("")}
  <main class="wrap wide">
    <section class="hero-home">
      <p class="brand-hero">US Scene Buy</p>
      <h1>The right replacement part starts with the exact robot model.</h1>
      <p class="lede">Match Roborock and Dreame dust bags, filters, mop pads, and brushes without guessing from a look-alike listing.</p>
      <div class="actions">
        <a class="btn primary" href="robots/">Find my robot model</a>
        <a class="btn ghost" href="about.html">See how fit is verified</a>
      </div>
    </section>

    <section class="panel" aria-label="Robot model selector">
      <p class="step-label">One-field fit check</p>
      <h2>Choose the full model name</h2>
{selector(models, "robots/")}
    </section>

    <section>
      <p class="step-label">Why exact fit matters</p>
      <div class="guide-grid">
        <div class="guide-card"><h3>Names can be one word apart</h3><p>Qrevo MaxV and S8 MaxV Ultra are different accessory families.</p></div>
        <div class="guide-card"><h3>Looks are not a fit test</h3><p>Dock bags, filter frames, mop mounts, and brushes can look nearly identical.</p></div>
        <div class="guide-card"><h3>Sources stay visible</h3><p>Every model page links the manufacturer compatibility pages used for the match.</p></div>
      </div>
    </section>

    <section class="pick-box">
      <p class="pick-eyebrow">Start with verified families</p>
      <h2>10 Roborock and Dreame models</h2>
      <p class="pick-why">The first set covers recurring bags and filters plus model-specific mop and brush families. We expand only after exact-model pages earn real search and Amazon clicks.</p>
      <p class="actions"><a class="btn primary" href="robots/">Browse all 10 models</a></p>
    </section>

    <section>
      <p class="step-label">Archived experiment</p>
      <h2>Kitchen-drain guides remain available</h2>
      <p>The earlier drain library is preserved for existing links and search history, but it is no longer the site’s main product or expansion path.</p>
      <p class="actions"><a class="btn ghost" href="guides/">Open the drain archive</a></p>
    </section>
  </main>
{footer("")}
  <script src="assets/site.js" defer></script>
  <script src="assets/robot-selector.js" defer></script>
</body>
</html>
"""


def render_index(models: list[dict]) -> str:
    cards = "\n".join(
        f"""        <a class="guide-card" href="{esc(item["slug"])}.html">
          <h2>{esc(item["brand"])} {esc(item["model"])}</h2>
          <p>{esc(item["fit_family"])} · bags, filters, mops, and brushes</p>
        </a>"""
        for item in models
    )
    item_list = [
        {
            "@type": "ListItem",
            "position": index,
            "url": f"{BASE}robots/{item['slug']}.html",
            "name": f"{item['brand']} {item['model']} replacement parts",
        }
        for index, item in enumerate(models, start=1)
    ]
    schema = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Robot vacuum replacement-parts compatibility",
            "url": f"{BASE}robots/",
            "mainEntity": {"@type": "ItemList", "itemListElement": item_list},
        },
        ensure_ascii=False,
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Robot vacuum replacement parts by exact model</title>
  <meta name="description" content="Match Roborock and Dreame dust bags, filters, mop pads, and brushes to the exact robot-vacuum model before buying." />
  <link rel="canonical" href="{BASE}robots/" />
  <link rel="alternate" type="application/atom+xml" title="US Scene Buy updates" href="../feed.xml" />
  <script type="application/ld+json">{schema}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600;7..72,700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../assets/site.css" />
</head>
<body>
{header("../", "models")}
  <main class="wrap wide">
    <section class="hero-compact">
      <p class="eyebrow">Robot vacuum consumables</p>
      <h1>Find parts by the model name—not by how they look</h1>
      <p class="lede">Near-identical bags and filters can belong to different dock families. Pick the full model printed on your robot or in its app, then check the manufacturer-backed fit notes.</p>
    </section>
    <section class="panel">
{selector(models)}
    </section>
    <section>
      <p class="step-label">First verified models</p>
      <div class="guide-grid">
{cards}
      </div>
    </section>
    <div class="callout"><strong>Before ordering:</strong> match every suffix—including Pro, MaxV, Plus, Gen 2, or Ultra. We link the brand sources used for each fit decision.</div>
  </main>
{footer("../")}
  <script src="../assets/site.js" defer></script>
  <script src="../assets/robot-selector.js" defer></script>
</body>
</html>
"""


def render_model(item: dict) -> str:
    name = f"{item['brand']} {item['model']}"
    aliases = ", ".join(item["aliases"])
    rows = "\n".join(
        f"""          <tr>
            <td><strong>{esc(part["type"])}</strong></td>
            <td>{esc(part["fit"])}</td>
            <td><a href="{esc(amazon_url(part["query"]))}" target="_blank" rel="noopener noreferrer sponsored" data-umami-event="amazon-outbound" data-umami-event-model="{esc(item["slug"])}" data-umami-event-part="{esc(part["type"].lower().replace(" ", "-"))}">Check current options on Amazon</a></td>
          </tr>"""
        for part in item["parts"]
    )
    sources = "\n".join(
        f'        <li><a href="{esc(source["url"])}" target="_blank" rel="noopener noreferrer">{esc(source["label"])}</a></li>'
        for source in item["sources"]
    )
    schema = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": f"{name} replacement-parts compatibility",
            "description": f"Manufacturer-source-backed fit notes for {name} dust bags, filters, mop pads, and brushes.",
            "dateModified": "2026-09-14",
            "mainEntityOfPage": f"{BASE}robots/{item['slug']}.html",
            "author": {"@type": "Organization", "name": "US Scene Buy"},
        },
        ensure_ascii=False,
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{esc(name)} replacement parts compatibility</title>
  <meta name="description" content="Which dust bags, filters, mop pads, and brushes fit the {esc(name)}? Check manufacturer-backed compatibility before buying." />
  <link rel="canonical" href="{BASE}robots/{esc(item["slug"])}.html" />
  <link rel="alternate" type="application/atom+xml" title="US Scene Buy updates" href="../feed.xml" />
  <script type="application/ld+json">{schema}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600;7..72,700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../assets/site.css" />
</head>
<body>
{header("../", "models")}
  <main class="wrap article">
    <p class="eyebrow">{esc(item["brand"])} · exact-model fit</p>
    <h1>Compatible replacement parts for {esc(name)}</h1>
    <p class="deck">Use the full model name—not the shape of the part. This page maps the <strong>{esc(item["fit_family"])}</strong> using the manufacturer sources below.</p>
    <p class="hint"><strong>Affiliate disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases.</p>

    <div class="callout"><strong>Easy mix-up:</strong> {esc(item["warning"])}</div>

    <h2>Match the label first</h2>
    <ol>
      <li>Confirm the machine or app says <strong>{esc(name)}</strong>{f" (also written {esc(aliases)})" if aliases else ""}.</li>
      <li>Keep every suffix in the name. “Pro,” “MaxV,” “Plus,” and “Gen 2” can change the fit.</li>
      <li>On Amazon, open the current listing and confirm that it names this exact model before ordering.</li>
    </ol>

    <h2>Compatible consumable lanes</h2>
    <div class="compare-wrap">
      <table class="compare">
        <thead><tr><th>Part</th><th>Fit note</th><th>Current Amazon options</th></tr></thead>
        <tbody>
{rows}
        </tbody>
      </table>
    </div>
    <p class="hint">Amazon results, sellers, stock, and model lists can change. The links above search the exact model and part; they are not a claim that every result fits.</p>

    <section class="pick-box" aria-label="Practical starting bundle">
      <p class="pick-eyebrow">Practical starting bundle</p>
      <h2>Replace only what is due</h2>
      <p class="pick-why">Dust bags and filters are the recurring lane. Add mop pads or brushes only when the app/manual indicates replacement or the part is worn. A larger bundle is not automatically the better buy.</p>
      <p class="actions"><a class="btn primary" href="{esc(amazon_url(name + " replacement accessory kit"))}" target="_blank" rel="noopener noreferrer sponsored" data-umami-event="amazon-outbound" data-umami-event-model="{esc(item["slug"])}" data-umami-event-part="kit">Check current kits on Amazon</a></p>
    </section>

    <h2>Sources used for this fit check</h2>
    <ul>
{sources}
    </ul>
    <p class="hint">Source review: September 14, 2026. Manufacturer pages remain the fit authority; Amazon search results are shopping options, not source evidence.</p>
    <p><a href="index.html">Choose another robot model</a> · <a href="../guides/">Browse the archived kitchen-drain guides</a></p>
  </main>
{footer("../")}
  <script src="../assets/site.js" defer></script>
</body>
</html>
"""


def public_url(page: Path) -> str:
    rel = page.relative_to(ROOT / "site").as_posix()
    if rel == "index.html":
        return BASE
    if rel.endswith("/index.html"):
        return BASE + rel[: -len("index.html")]
    return BASE + rel


def render_sitemap() -> str:
    pages = sorted(
        page
        for page in (ROOT / "site").rglob("*.html")
        if not page.name.startswith("google")
    )
    rows = []
    for page in pages:
        rel = page.relative_to(ROOT / "site").as_posix()
        is_new = rel == "index.html" or rel in {
            "about.html",
            "privacy.html",
            "guides/index.html",
        } or rel.startswith("robots/")
        if rel == "index.html":
            priority = "1.0"
        elif rel == "robots/index.html":
            priority = "0.95"
        elif rel.startswith("robots/"):
            priority = "0.9"
        elif rel == "guides/index.html":
            priority = "0.6"
        elif rel == "quiz.html":
            priority = "0.4"
        else:
            priority = "0.5"
        rows.append(
            "  <url>\n"
            f"    <loc>{public_url(page)}</loc>\n"
            f"    <lastmod>{'2026-09-14' if is_new else '2026-08-17'}</lastmod>\n"
            f"    <changefreq>{'weekly' if rel.startswith('robots/') or rel == 'index.html' else 'monthly'}</changefreq>\n"
            f"    <priority>{priority}</priority>\n"
            "  </url>"
        )
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" + "\n".join(rows) + "\n</urlset>\n"


def render_feed(models: list[dict]) -> str:
    entries = "\n".join(
        f"""  <entry>
    <title>{esc(item["brand"])} {esc(item["model"])} replacement-parts compatibility</title>
    <id>{BASE}robots/{esc(item["slug"])}.html</id>
    <link href="{BASE}robots/{esc(item["slug"])}.html" />
    <updated>2026-09-14T03:00:00Z</updated>
    <summary>Manufacturer-source-backed fit notes for dust bags, filters, mop pads, and brushes.</summary>
  </entry>"""
        for item in models
    )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>US Scene Buy exact-fit updates</title>
  <id>{BASE}</id>
  <link href="{BASE}" />
  <link href="{BASE}feed.xml" rel="self" type="application/atom+xml" />
  <updated>2026-09-14T03:00:00Z</updated>
  <author><name>US Scene Buy</name></author>
{entries}
</feed>
"""


def render_llms(models: list[dict]) -> str:
    model_links = "\n".join(
        f"- [{item['brand']} {item['model']}]({BASE}robots/{item['slug']}.html): {item['fit_family']}; includes an explicit near-model warning."
        for item in models
    )
    return f"""# US Scene Buy — llms.txt
# Site: exact-model shopping compatibility + Amazon Associate links.

> {BASE}

## Primary
- [Home]({BASE}): One-field Roborock / Dreame model selector.
- [Robot replacement parts by model]({BASE}robots/): Dust bags, filters, mop pads, and brushes matched from manufacturer compatibility sources.
- [How compatibility is verified]({BASE}about.html): Full model names, visible sources, explicit mix-up warnings, and no first-hand-testing claims.

## First verified robot models
{model_links}

## Archived experiment
- [Kitchen-drain guide archive]({BASE}guides/): Existing drain pages remain available but are not the current expansion path.
- [Legacy kitchen-drain selector]({BASE}quiz.html): Archived five-question browser-only tool.

## Rules stated on-site
- Keep every model suffix, including Pro, MaxV, Plus, Ultra, and Gen 2.
- Manufacturer pages support fit notes; Amazon links are current shopping options, not source evidence.
- Re-check the exact model in the current Amazon listing before ordering.
- No batteries, internal repairs, safety-critical modifications, copied reviews, or manually published live prices.
- Affiliate disclosure: As an Amazon Associate, we earn from qualifying purchases.

## Discovery
- {BASE}sitemap.xml
- {BASE}feed.xml
"""


def main() -> None:
    models = json.loads(DATA.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    (ROOT / "site" / "index.html").write_text(render_home(models), encoding="utf-8")
    (OUT / "index.html").write_text(render_index(models), encoding="utf-8")
    for item in models:
        (OUT / f"{item['slug']}.html").write_text(render_model(item), encoding="utf-8")
    (ROOT / "site" / "sitemap.xml").write_text(render_sitemap(), encoding="utf-8")
    (ROOT / "site" / "feed.xml").write_text(render_feed(models), encoding="utf-8")
    (ROOT / "site" / "llms.txt").write_text(render_llms(models), encoding="utf-8")
    print(f"Generated homepage, {len(models)} model pages, robots/index.html, and discovery files")


if __name__ == "__main__":
    main()
