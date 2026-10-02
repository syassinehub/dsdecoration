# DS Décoration, site web

Refonte du site de DS DECORATION SAS (peinture, papiers peints, plâtrerie, sols ; Nangy, Haute-Savoie).
Site statique en HTML, CSS et JavaScript, sans dépendance ni service externe.

## Pages

| Adresse | Source |
| --- | --- |
| `/` | `src/pages/index.html` |
| `/nos-realisations/` | `src/pages/realisations.html` |
| `/contact/` | `src/pages/contact.html` |
| `/mentions-legales/` | `src/pages/mentions-legales.html` |
| `/404.html` | `src/pages/404.html` |

## Modifier le site

1. Éditer les fichiers de `src/` (en-tête et pied de page communs dans `src/partials/`).
   Téléphones, e-mail et adresse sont réunis dans `SITE`, en haut de `build.py`.
2. Régénérer les pages : `python3 build.py`
3. Voir le résultat : `python3 -m http.server 8000`, puis http://localhost:8000

Styles : `assets/css/style.css` (palette en tête de fichier). Scripts : `assets/js/main.js`.

## Choix de conception

- Photos : uniquement celles des chantiers de l'entreprise (`assets/img/photos/` pour les recadrages,
  `assets/img/realisations/` pour les originaux avec vignettes avant travaux).
- Palette : blanc, gris plâtre `#eef0f1`, bleu ardoise `#3d4b5a` (la teinte des soubassements
  peints sur leurs chantiers) et l'orange du logo `#f6821f`, réservé aux actions.
- Typographie : Jost, une seule famille, hébergée dans `assets/fonts/` (licence OFL).
- Les trois formes du logo, redessinées en SVG, sont le seul élément décoratif de la page d'accueil.
- Aucun cookie ni appel externe : la carte Google n'est chargée qu'au clic.

## Avant mise en service

- Mentions légales : compléter l'hébergeur.
- Formulaire : il prépare un e-mail dans la messagerie du visiteur. Pour un envoi direct,
  brancher un service d'envoi de formulaires dans `assets/js/main.js`.

## Documentation

- `docs/` : coffre Obsidian (contenu de l'ancien site, charte, architecture, analyse NotebookLM, tâches).
- `graphify-out/` : graphe du projet (`graph.html`). Mise à jour : `graphify update .`
