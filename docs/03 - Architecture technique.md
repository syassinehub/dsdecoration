---
tags: [tech]
---
# Architecture technique
Retour : [[00 - Projet DS DECORATION]]

- HTML/CSS/JS statique, aucune dépendance npm.
- `src/pages/*.html` + `src/partials/{header,footer}.html` → `python3 build.py` → pages à la racine.
- Coordonnées centralisées dans `SITE` (build.py).
- URLs propres : `/`, `/nos-realisations/`, `/contact/`, `/mentions-legales/`, `404.html`.
- `assets/js/main.js` : menu mobile, animations d'apparition, visionneuse photo (clavier + flèches), formulaire `mailto:`.
- SEO : balises title/description/OG, JSON-LD `HousePainter`, `sitemap.xml`, `robots.txt`.
- Images en WebP + JPEG de secours.
- Déploiement : GitHub Pages depuis `main` / racine (`.nojekyll` présent).

Voir aussi [[02 - Charte graphique]].
