#!/usr/bin/env python3
"""Génère le site statique DS DECORATION.

Chaque fichier de src/pages/ commence par un bloc de métadonnées :

    ---
    title: Titre de la page
    description: Description SEO
    path: contact/          (dossier de sortie, vide pour l'accueil)
    nav: contact            (élément de menu actif)
    ---

Le corps est inséré entre src/partials/header.html et footer.html.
Remplacements disponibles : {{root}} (chemin relatif vers la racine),
{{icon:nom}} (icône SVG), {{nav:clé}} (aria-current du menu), et les
variables de SITE ci-dessous ({{phone}}, {{email}}, ...).

Usage : python3 build.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"

SITE = {
    "site_url": "https://www.dsdecoration.com/",
    "name": "DS DECORATION SAS",
    "phone": "07 49 150 150",
    "phone_href": "+33749150150",
    "phone_manager": "06 58 14 56 71",
    "phone_manager_href": "+33658145671",
    "email": "ds.decoration@yahoo.fr",
    "address": "291 route de Loex",
    "city": "74380 Nangy",
}

ICONS = {
    "phone": '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    "pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    "building": '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    "arrow": '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.2-6.1 2.5-.5 5-1.9 6.8-3.9"/>',
    "euro": '<path d="M4 10h12M4 14h9M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "file": '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
    "brush": '<path d="m9.1 11.2 7.5-7.5a2.1 2.1 0 1 1 3 3l-7.5 7.5"/><path d="M7 14c-1.7 0-3 1.3-3 3 0 1.3-2 2-2 2 1 1 2.5 2 4 2 2.2 0 4-1.8 4-4 0-1.7-1.3-3-3-3z"/>',
    "home": '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    "star": '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
}


def icon(name):
    return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        + ICONS[name]
        + "</svg>"
    )


def parse(page):
    text = page.read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    meta = dict(
        (k.strip(), v.strip())
        for k, v in (line.split(":", 1) for line in m.group(1).splitlines() if line.strip())
    )
    return meta, text[m.end():]


def render(template, meta, root):
    out = template
    out = re.sub(r"\{\{icon:(\w+)\}\}", lambda m: icon(m.group(1)), out)
    out = re.sub(
        r"\{\{nav:(\w+)\}\}",
        lambda m: ' aria-current="page"' if m.group(1) == meta.get("nav") else "",
        out,
    )
    values = {**SITE, **meta, "root": root}
    return re.sub(r"\{\{(\w+)\}\}", lambda m: values.get(m.group(1), m.group(0)), out)


def main():
    header = (SRC / "partials/header.html").read_text(encoding="utf-8")
    footer = (SRC / "partials/footer.html").read_text(encoding="utf-8")
    for page in sorted((SRC / "pages").glob("*.html")):
        meta, body = parse(page)
        path = meta.get("path", "")
        depth = len([p for p in path.split("/") if p])
        root = meta.get("root") or "../" * depth or "./"
        meta.setdefault("canonical", SITE["site_url"] + path)
        html = render(header + body + footer, meta, root)
        target = ROOT / path / (meta.get("file") or "index.html")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")
        print("→", target.relative_to(ROOT))


if __name__ == "__main__":
    main()
