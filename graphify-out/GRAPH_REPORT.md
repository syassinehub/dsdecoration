# Graph Report - decoration  (2026-10-02)

## Corpus Check
- 9 files · ~73,649 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 38 nodes · 38 edges · 7 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2916d989`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 00 - Projet DS DECORATION.md
- Analyse NotebookLM
- Contenu de l'ancien site
- DS Décoration, site web
- build.py
- Charte graphique

## God Nodes (most connected - your core abstractions)
1. `DS Décoration, site web` - 6 edges
2. `Contenu de l'ancien site` - 6 edges
3. `Charte graphique` - 6 edges
4. `Analyse NotebookLM` - 4 edges
5. `main()` - 3 edges
6. `parse()` - 2 edges
7. `render()` - 2 edges
8. `Projet — refonte dsdecoration.com` - 2 edges
9. `Pages` - 1 edges
10. `Modifier le site` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (7 total, 0 thin omitted)

### Community 0 - "00 - Projet DS DECORATION.md"
Cohesion: 0.28
Nodes (4): Notes, Projet — refonte dsdecoration.com, Architecture technique, À faire

### Community 1 - "Analyse NotebookLM"
Cohesion: 0.50
Nodes (4): Analyse NotebookLM, Idées retenues / à valider, Incohérences relevées, Mots-clés locaux suggérés

### Community 2 - "Contenu de l'ancien site"
Cohesion: 0.29
Nodes (6): Accueil, Avis clients (page Réalisations), Contact, Contenu de l'ancien site, Mentions légales, Médias récupérés

### Community 3 - "DS Décoration, site web"
Cohesion: 0.29
Nodes (6): Avant mise en service, Choix de conception, Documentation, DS Décoration, site web, Modifier le site, Pages

### Community 4 - "build.py"
Cohesion: 0.83
Nodes (3): main(), parse(), render()

### Community 6 - "Charte graphique"
Cohesion: 0.33
Nodes (6): Ce qui a été retiré de la v1, Charte graphique, Palette, Photos, Typographie, Élément signature

## Knowledge Gaps
- **21 isolated node(s):** `Pages`, `Modifier le site`, `Choix de conception`, `Avant mise en service`, `Documentation` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Charte graphique` connect `Charte graphique` to `00 - Projet DS DECORATION.md`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `Analyse NotebookLM` connect `Analyse NotebookLM` to `00 - Projet DS DECORATION.md`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **What connects `Pages`, `Modifier le site`, `Choix de conception` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._