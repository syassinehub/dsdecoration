# DS DECORATION — site web

Refonte du site [dsdecoration.com](https://www.dsdecoration.com) (anciennement IONOS MyWebsite) :
site statique HTML/CSS/JS, sans dépendance, prêt pour GitHub Pages ou n'importe quel hébergeur.

## Pages

| URL | Source |
| --- | --- |
| `/` | `src/pages/index.html` |
| `/nos-realisations/` | `src/pages/realisations.html` |
| `/contact/` | `src/pages/contact.html` |
| `/mentions-legales/` | `src/pages/mentions-legales.html` |
| `/404.html` | `src/pages/404.html` |

## Modifier le site

1. Éditer les fichiers dans `src/` (en-tête et pied de page communs dans `src/partials/`).
   Les coordonnées (téléphone, e-mail, adresse) sont centralisées dans `SITE` en haut de `build.py`.
2. Régénérer les pages : `python3 build.py`
3. Prévisualiser : `python3 -m http.server 8000` puis http://localhost:8000
4. Commiter les fichiers `src/` **et** les pages générées.

Styles : `assets/css/style.css` (couleurs du logo dans `:root`). Scripts : `assets/js/main.js`.

## Mise en ligne (GitHub Pages)

Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`.
Pour le domaine `www.dsdecoration.com` : ajouter le domaine dans Settings → Pages
(cela crée un fichier `CNAME`), puis pointer le DNS `www` en CNAME vers `syassinehub.github.io`.

## À savoir

- **Formulaire de contact** : il ouvre la messagerie du visiteur avec la demande pré-remplie
  (aucun serveur requis). Pour un envoi direct, brancher un service type Formspree / Web3Forms
  dans `assets/js/main.js`.
- **Mentions légales** : l'hébergeur indiqué est GitHub — à adapter si le site est hébergé ailleurs.
- Les images proviennent de l'ancien site ; la bannière d'accueil (960 px) gagnerait à être
  remplacée par une photo plus grande.
