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
{{nav:clé}} (aria-current du menu), et les
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
