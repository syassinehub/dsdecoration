# Graph Report - decoration  (2026-10-02)

## Corpus Check
- 16 files · ~79,575 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 326 nodes · 600 edges · 25 communities (24 shown, 1 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.66)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `35a65ded`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Charte graphique
- lenis.min.js
- Flip.min.js
- DS Décoration, site web
- build.py
- gsap.min.js
- ScrollTrigger.min.js
- ce
- s
- t
- lf
- CustomEase.min.js
- Tween
- L
- oc
- Dc
- motion.js
- SplitText.min.js
- na
- Ra
- la
- rb
- ye
- Hd

## God Nodes (most connected - your core abstractions)
1. `Dc()` - 15 edges
2. `s()` - 14 edges
3. `Tween()` - 13 edges
4. `ba()` - 12 edges
5. `r()` - 11 edges
6. `getGlobalMatrix()` - 8 edges
7. `L()` - 8 edges
8. `t()` - 8 edges
9. `v()` - 8 edges
10. `la()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Mp()` --indirect_call--> `o()`  [INFERRED]
  assets/js/vendor/ScrollTrigger.min.js → assets/js/vendor/lenis.min.js
- `scrollAnimations()` --indirect_call--> `p()`  [INFERRED]
  assets/js/motion.js → assets/js/vendor/Flip.min.js
- `stringToRawPath()` --indirect_call--> `w()`  [INFERRED]
  assets/js/vendor/CustomEase.min.js → assets/js/vendor/gsap.min.js
- `stringToRawPath()` --indirect_call--> `P()`  [INFERRED]
  assets/js/vendor/CustomEase.min.js → assets/js/vendor/ScrollTrigger.min.js
- `x()` --indirect_call--> `o()`  [INFERRED]
  assets/js/vendor/Flip.min.js → assets/js/vendor/lenis.min.js

## Import Cycles
- None detected.

## Communities (25 total, 1 thin omitted)

### Community 0 - "Charte graphique"
Cohesion: 0.08
Nodes (21): Notes, Projet — refonte dsdecoration.com, Accueil, Avis clients (page Réalisations), Contact, Contenu de l'ancien site, Mentions légales, Médias récupérés (+13 more)

### Community 1 - "lenis.min.js"
Cohesion: 0.08
Nodes (28): x(), advance(), checkOverflow(), cleanUpClassName(), constructor(), destroy(), emit(), i() (+20 more)

### Community 2 - "Flip.min.js"
Cohesion: 0.11
Nodes (27): A(), Aa(), B(), ba(), ea(), fa(), FlipState(), ga() (+19 more)

### Community 3 - "DS Décoration, site web"
Cohesion: 0.25
Nodes (7): Animations, Avant mise en service, Choix de conception, Documentation, DS Décoration, site web, Modifier le site, Pages

### Community 4 - "build.py"
Cohesion: 0.83
Nodes (3): main(), parse(), render()

### Community 6 - "gsap.min.js"
Cohesion: 0.07
Nodes (13): ia(), ja(), Lc(), Md(), Nc(), Nd(), oa(), Od() (+5 more)

### Community 7 - "ScrollTrigger.min.js"
Cohesion: 0.07
Nodes (5): ic(), Ka(), La(), Mp(), rb()

### Community 8 - "ce"
Cohesion: 0.17
Nodes (16): Ae(), ce(), $d(), ee(), he(), ka(), le(), ma() (+8 more)

### Community 9 - "s"
Cohesion: 0.24
Nodes (12): Ao(), cb(), cc(), ga(), gb(), ha(), hb(), r() (+4 more)

### Community 10 - "t"
Cohesion: 0.24
Nodes (11): _a(), Context(), Db(), Eb(), fb(), Gc(), Gw(), Hc() (+3 more)

### Community 11 - "lf"
Cohesion: 0.27
Nodes (11): jf(), lf(), mf(), N(), nf(), O(), of(), tf() (+3 more)

### Community 12 - "CustomEase.min.js"
Cohesion: 0.29
Nodes (6): arcToSegment(), CustomEase(), n(), q(), r(), stringToRawPath()

### Community 13 - "Tween"
Cohesion: 0.27
Nodes (10): _assertThisInitialized(), ic(), ta(), Timeline(), Tween(), w(), xa(), ya() (+2 more)

### Community 14 - "L"
Cohesion: 0.22
Nodes (10): A(), F(), G(), L(), P(), Q(), r(), rc() (+2 more)

### Community 15 - "oc"
Cohesion: 0.20
Nodes (10): Db(), J(), nb(), oc(), qc(), Tb(), Ua(), Va() (+2 more)

### Community 16 - "Dc"
Cohesion: 0.25
Nodes (9): C(), Dc(), Ia(), Ja(), vc(), Wa(), wc(), yb() (+1 more)

### Community 17 - "motion.js"
Cohesion: 0.52
Nodes (5): curtainOut(), enter(), revealImage(), scrollAnimations(), splitLines()

### Community 18 - "SplitText.min.js"
Cohesion: 0.43
Nodes (4): constructor(), kill(), revert(), split()

### Community 19 - "na"
Cohesion: 0.33
Nodes (6): Aa(), Ca(), na(), Vb(), wb(), Xb()

### Community 20 - "Ra"
Cohesion: 0.53
Nodes (6): Eb(), Ma(), Na(), Oa(), Ra(), z()

### Community 21 - "la"
Cohesion: 0.60
Nodes (5): Animation(), Da(), la(), Ua(), Va()

### Community 22 - "rb"
Cohesion: 0.40
Nodes (5): kb(), ob(), ra(), rb(), Za()

### Community 23 - "ye"
Cohesion: 0.40
Nodes (5): Rd(), Vd(), Wd(), yd(), ye()

## Knowledge Gaps
- **23 isolated node(s):** `Pages`, `Modifier le site`, `Choix de conception`, `Animations`, `Avant mise en service` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `s()` connect `s` to `Flip.min.js`, `gsap.min.js`, `t`, `lf`, `Tween`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **Why does `z()` connect `Flip.min.js` to `s`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `i()` connect `lenis.min.js` to `s`, `rb`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `s()` (e.g. with `z()` and `of()`) actually correct?**
  _`s()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Pages`, `Modifier le site`, `Choix de conception` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Charte graphique` be split into smaller, more focused modules?**
  _Cohesion score 0.07977207977207977 - nodes in this community are weakly interconnected._
- **Should `lenis.min.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07973421926910298 - nodes in this community are weakly interconnected._