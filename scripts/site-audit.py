#!/usr/bin/env python3
"""Fail CI when the static affiliate site loses basic trust or crawl signals."""

from __future__ import annotations

import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
EXPECTED_TAG = "usscenebuy-20"
FORBIDDEN_COPY = (
    "add to cart within 24 hours",
    "attribution can stick",
    "want this click to count",
)


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        values = dict(attrs)
        if values.get("href"):
            self.links.append(values["href"] or "")


def local_target(page: Path, href: str) -> Path | None:
    parsed = urlparse(href)
    if parsed.scheme or parsed.netloc or href.startswith(("#", "mailto:", "tel:")):
        return None
    path = parsed.path
    if not path:
        return None
    target = (page.parent / path).resolve()
    if path.endswith("/"):
        target /= "index.html"
    return target


def main() -> int:
    errors: list[str] = []
    pages = [p for p in SITE.rglob("*.html") if not p.name.startswith("google")]

    for page in pages:
        text = page.read_text(encoding="utf-8")
        rel = page.relative_to(ROOT)
        lower = text.lower()

        for signal in ('name="description"', 'rel="canonical"'):
            if signal not in lower:
                errors.append(f"{rel}: missing {signal}")
        if 'assets/favicon.svg' not in text:
            errors.append(f"{rel}: missing favicon link")
        if 'assets/site.js' not in text:
            errors.append(f"{rel}: missing site.js")
        if "as an amazon associate" not in lower:
            errors.append(f"{rel}: missing Amazon disclosure")
        for phrase in FORBIDDEN_COPY:
            if phrase in lower:
                errors.append(f"{rel}: attribution-directed copy remains: {phrase}")

        parser = LinkParser()
        parser.feed(text)
        for href in parser.links:
            if "amazon.com" in href:
                if f"tag={EXPECTED_TAG}" not in href:
                    errors.append(f"{rel}: Amazon link missing expected tag: {href}")
                continue
            target = local_target(page, href)
            if target is not None and SITE not in target.parents and target != SITE:
                errors.append(f"{rel}: local link escapes site/: {href}")
            elif target is not None and not target.exists():
                errors.append(f"{rel}: broken local link: {href}")

    sitemap = ET.parse(SITE / "sitemap.xml")
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = {node.text for node in sitemap.findall("s:url/s:loc", ns)}
    base = "https://van0710-source.github.io/us-scene-buy/"
    for page in pages:
        rel = page.relative_to(SITE).as_posix()
        if rel == "index.html":
            url = base
        elif rel.endswith("/index.html"):
            url = base + rel[: -len("index.html")]
        else:
            url = base + rel
        if url not in urls:
            errors.append(f"{page.relative_to(ROOT)}: missing from sitemap")

    if errors:
        print("\n".join(f"ERROR: {item}" for item in errors))
        return 1
    print(f"OK: {len(pages)} HTML pages; crawl, disclosure, and local-link checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
