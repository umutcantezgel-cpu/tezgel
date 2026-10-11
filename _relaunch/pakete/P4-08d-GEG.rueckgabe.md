# P4-08d-GEG · Rückgabe · Gegenprüfung Hook F-16 `/blog`

Kennung P4-08d-GEG · Stufe 3 · Opus (frisch) · Kriterium Z-03 (G9).
Geschrieben habe ich nur diese Datei. Proben liegen im Scratchpad `…/scratchpad/p4-08d-geg/` (`alt.jsx`, `probe.cjs`, `mut-*.ts`). Kein Build, kein Server, kein git mit Schreibwirkung, keine POST-Anfrage.

**Vergleichsstand** (nach Hinweis des Orchestrators, die Fassung ist inzwischen committet):
- alt: `git show fd11be7~1:"src/app/(bestand)/blog/page.jsx"`. Das ist byte-gleich mit dem `HEAD`-Stand, den ich vor dem Commit gelesen habe.
- neu: `src/app/(bestand)/blog/page.jsx` und `src/lib/formulare/useBlogListe.ts` im Arbeitsbaum. Sie sind sha256-gleich mit `fd11be7` (page `e2418349…`, Hook `e5308492…`), und `git status` meldet für beide keine Änderung.

## Urteil

**Verhalten gleich: ja.**

Ich habe keine Abweichung gefunden, die ein Besucher sehen oder auslösen kann. Das gilt für Suche, Kategorien, Hervorhebung, Raster, Lesezeit, Leerzustand, „Filter zurücksetzen“, die Seitenleiste und die Datenquelle.

## Befunde

Es gibt keinen Befund der Schwere hoch oder mittel.

| Nr. | Schwere | Fundstelle | Befund | Szenario |
|---|---|---|---|---|
| 1 | niedrig (kein Verhalten) | `useBlogListe.ts:52` gegen alt `page.jsx:119` | `showFeatured` liefert wie der alte Inline-Ausdruck `undefined`, `false` oder `true`. Der Wert ist also nicht in einen Wahrheitswert umgewandelt. | Im JSX zeigen `undefined` und `false` beide nichts. Die Probe ist auf diesen Unterschied scharf: Die Mutation `!!featuredPost` wird in 400 von 900 Fällen erkannt. Gleich ist der Wert also auch auf dieser Ebene. |
| 2 | niedrig (kein Verhalten) | `useBlogListe.ts:65,70` | Der Hook gibt zusätzlich `blogCategories` und `allPosts` zurück. Die Bestandsseite nutzt sie nicht, nur die Kern-Ansicht liest `blogCategories`. | Ohne Wirkung auf den Bestand. |
| 3 | niedrig (kein Verhalten) | `useBlogListe.ts:55–56` | `gridPosts` wird jetzt vor dem `return` berechnet statt mitten im JSX. Der Ausdruck ist rein, er wirft nur dort, wo auch `filteredPosts` schon werfen würde (`post` ist `null`). | Gleiche Ausgabe, gleiches Wurfverhalten. |

## Prüfpunkte im Einzelnen

1. **Logik, Block für Block:**
   - `diff` von alt Zeilen 13–32 gegen Hook Zeilen 30–49: Die einzige Abweichung ist `as BlogInhalt`.
   - Die vier ausgelagerten Ausdrücke stimmen Zeichen für Zeichen mit alt Zeile 119, 151, 177 und 192 überein. Geändert ist nur der Name: `featuredPost` heißt im Lesezeit-Ausdruck jetzt `post`, ein Parameter, an den die Seite `featuredPost` übergibt. `.filter(...)` steht unverändert, am Ende mit `;`.
   - Startwerte `'all'` und `''`, Vorgaben `= []` sowie `|| []` sind gleich.
   - Die Suche nutzt `toLowerCase` auf beiden Seiten, ohne `trim`, nur über Titel und Auszug.
   - Sortierung: Es gibt keine, weder alt noch neu. Es gilt die Reihenfolge der Daten.
   - Datenquelle ist `useContent()` → `dataService` (zuerst localStorage, sonst `config/posts`, `config/blog`), unverändert.
2. **Typangaben:**
   - Es gibt nur `as BlogInhalt` und `(post: BlogBeitrag)`. Beide entfallen beim Übersetzen.
   - `as string`, `as Error`, `SubmitEvent`, `submitter`, `parseFloat`, `Number` und Rundung kommen nicht vor.
   - Klammerung und Vorrang sind unverändert. `showFeatured` ist dieselbe `&&`-Kette ohne neue Klammern.
3. **Handler im Hook:**
   - `resetFilters` ruft wie vorher erst `setActiveCategory('all')`, dann `setSearchQuery('')` auf. Die Mutation mit vertauschter Reihenfolge wird in 900 von 900 Fällen erkannt.
   - Die Closure gehört zum selben Render: Die Funktion wird wie die alte Inline-Arrow-Funktion bei jedem Render neu gebildet und nutzt nur die stabilen Setzer.
   - Das Klick-Ereignis wird alt wie neu ignoriert.
   - Die Eingabewandlung `setSearchQuery(e.target.value)` blieb im Markup und ist unverändert.
4. **Markup** (`git diff fd11be7~1 fd11be7`):
   - Jeder verwendete Bezeichner ist destrukturiert: `activeCategory`, `setActiveCategory`, `searchQuery`, `setSearchQuery`, `visibleCategories`, `filteredPosts`, `featuredPost`, `showFeatured`, `gridPosts`, `getReadTime`, `resetFilters`.
   - Werte bleiben Werte und Funktionen bleiben Funktionen, unter gleichem Namen (neu sind nur die vier Namen).
   - Importe: `React`/`useState` und `useContent` entfallen zu Recht. `React.` kommt in der Seite nicht vor, und `tsconfig` steht auf `"jsx": "react-jsx"`. `useBlogListe` ist neu. Es fehlt kein Import und keiner ist zu viel.
   - `filteredPosts.length === 0` (Leerzustand) und die Props an `BlogSidebar` sind unverändert.
5. **Hook-Folge:**
   - Alt wie neu: `useContext` (in `useContent`), dann `useState('all')`, dann `useState('')`. Es gibt keine Effekte.
   - `BlogSidebar` bekommt dieselben stabilen Setzer. `resetFilters` geht nur an einen DOM-Knopf, und kein Kind ist memoisiert.
6. **Server/Client-Grenze:**
   - `grep -rn useBlogListe src` findet Werte-Importe nur in `(bestand)/blog/page.jsx` (`"use client"`) und `kern/seiten/blog/BlogListe.tsx` (`'use client'`). `ListeAnsicht.tsx` importiert nur Typen.
   - Laut `server-and-client-boundary.md` (Next 16) reicht `'use client'` am Eingang des Client-Teilbaums („Every module imported from that entry becomes part of the client module graph“).
   - Die Server-Seite `_entwurf/blog/page.tsx` gibt nur ein gerendertes Element (`beratung`) an die Insel weiter, keine Funktion.
7. **Kern (ruhend, nur Einordnung):**
   - Die Rückgaben werden nicht verändert. Es gibt kein `sort`, `push`, `splice`, `reverse`, keine Zuweisung an Felder und kein `Object.assign`, nur `map`, `filter`, `find` und Spread in neue Felder.
   - Der eigene `ContentProvider` der Insel ist dieselbe Komponente ohne Props wie in `(bestand)/_dokument.tsx:120`. Sie liest dieselben `dataService`-Quellen, der Inhalt ist also gleich.
   - Die Leerzustand-Bedingung der Vorlage (`beitraege.length === 0 && !hervorhebung`) habe ich nachgerechnet: Sie ist gleichwertig zu `filteredPosts.length === 0`.
   - Die Kategorien der Seitenleiste (`'all'` oder in `visibleCategories`) sind dieselbe Menge wie in `BlogSidebar.jsx:23–25`, denn `visibleCategories` enthält dieselben Objekte.

## Eigene Probe (unabhängig von den Werkzeugen des Pakets)

`probe.cjs`:
- **Aufbau:**
  - Die alte Logik wird zur Laufzeit direkt aus `alt.jsx` herausgeschnitten: der Block in Zeile 13–32 und die Inline-Ausdrücke in Zeile 119, 151, 177 und 192.
  - Der Hook läuft als echter Code (TypeScript-Transpilat) mit Ersatz-`useState` und Ersatz-`useContent`.
  - Echte Daten: 13 Beiträge, Kategorien aus `config/blog.js`.
- **Fälle:** 900, nämlich 9 Inhaltsvarianten × 10 Kategorien × 10 Suchbegriffe.
  - Inhaltsvarianten:
    - echte Daten;
    - Hervorhebung ohne `readTime` mit `reading_time: 7`;
    - ohne beides;
    - ohne Hervorhebung;
    - Hervorhebung am Ende;
    - `null`-Listen, fehlende Listen und leere Listen;
    - doppelte Beitrags-ID.
  - Kategorien: alle, jede einzelne und eine unbekannte.
  - Suchbegriffe: `''`, `' '`, `FLIESEN`, `fliesen `, `Feinsteinzeug`, `xqzwjkpv`, `ß`, `İ`, `wc`, `mythen`.
- **Je Fall verglichen:**
  - Zustand, Kategorien, Treffer, Hervorhebung (roher Wert), Raster, Lesezeit und Leerzustand;
  - dass die Treffer dieselben Objekte sind wie im Inhalt;
  - Setzer-Folge und Ergebnis nach „Filter zurücksetzen“.
- **Ergebnis:** 900 Fälle, **0 ungleich**.
- **Mutationen** (beweisen, dass die Probe scharf ist):

  | Mutation | erkannt (von 900) |
  |---|---|
  | Reihenfolge der Setzer vertauscht | 900 |
  | Suche mit `trim` | 42 |
  | Hervorhebung mit `trim` | 10 |
  | Ersatz `'5'` → `'6'` | 100 |
  | `!!featuredPost` | 400 |

  Zwei Mutationen blieben unerkannt. Beide sind bei diesen Daten gleichwertig, deshalb gelten sie nicht als Lücke der Probe:
  - Ohne `category.id !== 'all'`: Kein Beitrag hat die Kategorie `all`.
  - `featured === true`: Alle `featured`-Werte sind boolesch.

## Bestätigung der Altbefunde (Rückgabe P4-08d, Abschnitt 6)

| Befund | Beleg an der alten Fassung | Urteil |
|---|---|---|
| 1 Suche ohne `trim`, nur Titel und Auszug | alt `page.jsx:27–28` | alt ebenso |
| 2 Ersatz-Lesezeit „5 Min.“ | alt `page.jsx:151`. Alle 13 Beiträge haben `readTime` (`grep` in `config/posts/`), der Fall tritt heute nicht ein. | alt ebenso |
| 3 Zwei Hervorhebungen | `handwerkerbonus-fliesenarbeiten.js:15` und `fliesen-mythen-faktencheck.js:14` haben `featured: true`. `find` nimmt den ersten (alt `page.jsx:32`), der zweite steht im Raster. | alt ebenso |
| 4 „Alle“ setzt die Suche nicht zurück; Meldung „zur Suchanfrage“ | alt `page.jsx:89` (nur `setActiveCategory`), `BlogSidebar.jsx:63`; Meldung alt `page.jsx:189` | alt ebenso |
| 5 Seitenleiste filtert selbst, Kategoriename in `BlogCard` | `BlogSidebar.jsx:20–25`, `BlogCard.jsx:14–15`. Beide Dateien sind vom Paket nicht berührt (letzter Commit `8ca72e0`). | alt ebenso |
| 6 Hervorhebung ohne Bildprüfung | alt `page.jsx:128–129` ohne Prüfung; `BlogCard.jsx:22` prüft | alt ebenso |
| 7 localStorage-Vorrang, Gefahr eines Hydrationsfehlers | `ContentContext.jsx:8–18` liest im Anfangszustand `dataService.get`, `dataService.js:79–99` zuerst localStorage. Beide Dateien sind unverändert. | alt ebenso |

Keiner der Befunde ist durch das Paket entstanden.

## Vorgehen

1. Gelesen habe ich:
   - den Auftrag und die Rückgabe P4-08d;
   - alt und neu der Seite sowie den Hook;
   - `ContentContext.jsx`, `dataService.js`, `BlogSidebar.jsx`, `BlogCard.jsx`, `config/posts*` und `config/blog.js`;
   - die Kern-Dateien `seiten/blog/*`, `_entwurf/blog/page.tsx` und die Leer-Bedingung in `Beitragsliste.tsx`;
   - die Next-16-Anleitung `server-and-client-boundary.md`.
2. Verglichen habe ich mit `diff` (Logikblock) und `git diff fd11be7~1 fd11be7` (Markup), dazu kamen der Hash-Abgleich mit dem Arbeitsbaum und `grep` (Importe, Mutationen, Daten).
3. Dazu kommt die eigene Laufzeitprobe mit fünf Gegenmutationen (siehe oben).
