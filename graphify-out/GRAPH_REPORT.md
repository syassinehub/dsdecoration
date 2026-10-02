# Graph Report - decoration  (2026-10-02)

## Corpus Check
- 10 files · ~76,848 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 47 nodes · 51 edges · 8 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c95e5622`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 00 - Projet DS DECORATION.md
- Contenu de l'ancien site
- Charte graphique
- DS Décoration, site web
- build.py
- Analyse NotebookLM
- motion.js

## God Nodes (most connected - your core abstractions)
1. `DS Décoration, site web` - 7 edges
2. `Charte graphique` - 7 edges
3. `Contenu de l'ancien site` - 6 edges
4. `enter()` - 4 edges
5. `scrollAnimations()` - 4 edges
6. `Analyse NotebookLM` - 4 edges
7. `splitLines()` - 3 edges
8. `main()` - 3 edges
9. `curtainOut()` - 2 edges
10. `revealImage()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 0 thin omitted)

### Community 0 - "00 - Projet DS DECORATION.md"
Cohesion: 0.28
Nodes (4): Notes, Projet — refonte dsdecoration.com, Architecture technique, À faire

### Community 1 - "Contenu de l'ancien site"
Cohesion: 0.29
Nodes (6): Accueil, Avis clients (page Réalisations), Contact, Contenu de l'ancien site, Mentions légales, Médias récupérés

### Community 2 - "Charte graphique"
Cohesion: 0.29
Nodes (7): Animations (v3), Ce qui a été retiré de la v1, Charte graphique, Palette, Photos, Typographie, Élément signature

### Community 3 - "DS Décoration, site web"
Cohesion: 0.25
Nodes (7): Animations, Avant mise en service, Choix de conception, Documentation, DS Décoration, site web, Modifier le site, Pages

### Community 4 - "build.py"
Cohesion: 0.83
Nodes (3): main(), parse(), render()

### Community 6 - "Analyse NotebookLM"
Cohesion: 0.50
Nodes (4): Analyse NotebookLM, Idées retenues / à valider, Incohérences relevées, Mots-clés locaux suggérés

### Community 17 - "motion.js"
Cohesion: 0.52
Nodes (5): curtainOut(), enter(), revealImage(), scrollAnimations(), splitLines()

## Knowledge Gaps
- **23 isolated node(s):** `Pages`, `Modifier le site`, `Choix de conception`, `Animations`, `Avant mise en service` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Charte graphique` connect `Charte graphique` to `00 - Projet DS DECORATION.md`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Analyse NotebookLM` connect `Analyse NotebookLM` to `00 - Projet DS DECORATION.md`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `Pages`, `Modifier le site`, `Choix de conception` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._