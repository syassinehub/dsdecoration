# Graph Report - decoration  (2026-10-02)

## Corpus Check
- 9 files · ~73,773 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 33 nodes · 34 edges · 6 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cfab2d7b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 00 - Projet DS DECORATION.md
- Analyse NotebookLM
- Contenu de l'ancien site
- DS DECORATION — site web
- build.py

## God Nodes (most connected - your core abstractions)
1. `Contenu de l'ancien site` - 6 edges
2. `DS DECORATION — site web` - 5 edges
3. `Analyse NotebookLM` - 4 edges
4. `render()` - 3 edges
5. `main()` - 3 edges
6. `icon()` - 2 edges
7. `parse()` - 2 edges
8. `Projet — refonte dsdecoration.com` - 2 edges
9. `Pages` - 1 edges
10. `Modifier le site` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (6 total, 0 thin omitted)

### Community 0 - "00 - Projet DS DECORATION.md"
Cohesion: 0.29
Nodes (4): Notes, Projet — refonte dsdecoration.com, Charte graphique, Architecture technique

### Community 1 - "Analyse NotebookLM"
Cohesion: 0.29
Nodes (5): Analyse NotebookLM, Idées retenues / à valider, Incohérences relevées, Mots-clés locaux suggérés, À faire

### Community 2 - "Contenu de l'ancien site"
Cohesion: 0.33
Nodes (6): Accueil, Avis clients (page Réalisations), Contact, Contenu de l'ancien site, Mentions légales, Médias récupérés

### Community 3 - "DS DECORATION — site web"
Cohesion: 0.33
Nodes (5): DS DECORATION — site web, Mise en ligne (GitHub Pages), Modifier le site, Pages, À savoir

### Community 4 - "build.py"
Cohesion: 0.70
Nodes (4): icon(), main(), parse(), render()

## Knowledge Gaps
- **16 isolated node(s):** `Pages`, `Modifier le site`, `Mise en ligne (GitHub Pages)`, `À savoir`, `Notes` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Contenu de l'ancien site` connect `Contenu de l'ancien site` to `00 - Projet DS DECORATION.md`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **What connects `Pages`, `Modifier le site`, `Mise en ligne (GitHub Pages)` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._