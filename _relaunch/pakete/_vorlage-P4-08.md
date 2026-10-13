# Vorlage P4-08 · Entwurf einer Hauptseite im Kern (ruhend, für das P4-Tor nach E-017)

> **Abgelöst (E-038, E6-ORCH-01 Schritte 5 und 10):** Der ruhende Kern-Baum (`src/app/(kern)`, die Unterordner von
> `src/components/kern/`, `src/lib/kern`, `src/styles`) ist abgebaut (81d3016, 51f2cad, 2026cd2), `freischalten.sh` ist gelöscht. Diese Vorlage
> nicht mehr für neue Aufträge verwenden; Seitenaufträge folgen `_seitenregeln.md` (Formulare zusätzlich `_formularregeln.md`).
> Die Pfade unten sind Geschichte und keine Vorlage und kein erlaubter Import mehr.

Gilt für P4-08a bis P4-08f. Das Einzelbriefing nennt Route, Seitenart, Quellen, Funktionen und Besonderheiten.

## Aufgabe
Baue die Hauptseite als ruhenden Entwurf unter `src/app/(kern)/_entwurf/<route>/`. Die Seite geht erst in ihrer Welle live (Freischaltung mit `freischalten.sh`). Ihr Inhalt ist der Bestand der Seite, in Kern-Erscheinung, nach dem Vorbild der freigeschalteten Startseite `/`.

## Pflichtlektüre
- `_relaunch/pakete/_vorlage-kern-P3.md` (Rollenbriefing, Technik, Grenzen, Ausgabe) und `_relaunch/pakete/_lehren-P3.md` (**verbindlich**, alle 12 Lehren)
- `_relaunch/KERN.md`: K-002 (Vertrauen in 2 Bildschirmhöhen), K-003 (ein Rot je Ansicht), K-007, K-009 (Register, Signaturmomente), K-010, K-011 (Erzähl- und Arbeitsseite), K-012 (Mikrotext-Klassen), K-013 (Budgets)
- `_relaunch/ENTSCHEIDUNGEN.md`: E-015 (Bauweise), E-020, E-021, E-026, E-027
- **Vorbild `/`:** `src/app/(kern)/page.tsx` und `src/components/kern/start/*`
- **Vorlagen:** `src/components/kern/vorlagen/teile/*` (gemeinsame Teile, P4-10a) sowie `fachseite/`, `uebersicht/`, `liste/`, `artikel/`, `detail/`; Pläne `src/components/kern/motive/plaene/*` (P4-03); Formular-Inseln `src/components/kern/formulare/*`
- `_relaunch/MIKROTEXTE.md`, `_relaunch/FUNKTIONSLISTE.md`, `_relaunch/GRUNDMENGE.json` (`seitenart`)

## Wortlaut, Metadaten, Struktur
- **Jeder Text der Live-Seite steht genau einmal im Entwurf**, wörtlich und in derselben Lesefolge, mit derselben Überschriftenebene (h1–h3).
  - Klasse 3 (Form neu, Wortlaut gleich) ist frei.
  - Mikrotexte ändern sich nur über eine Zeile in `MIKROTEXTE.md`. Neue Zeilen schlägst du in der Rückgabe vor; die Vorschau zeigt den Bestandswortlaut.
  - Überschriften und Fließtext sind unantastbar.
  - Der Orchestrator prüft mit `texte2.mjs` (rot: fehlender, doppelter oder geänderter Text, neue Überschrift).
- **Metadaten:** Die wirksamen Metadaten der Live-Seite (aus `layout` und `page` zusammen: Titel, Beschreibung, Canonical, Open Graph, `robots`) exportiert der Entwurf selbst als `metadata`, wörtlich.
  - Dasselbe gilt für JSON-LD, das Layout oder Seite rendern (`@/components/seo/JsonLd` mit denselben Schema-Bausteinen): Der Hash muss gleich bleiben.
  - Hinweis: Das Bestands-Layout eines Segments gilt nicht für die Kern-Route, deshalb gehört alles in den Entwurf.
- **IDs, Anker und Ziele** bleiben (Sprungmarken, `#…`, Formular-IDs, `name`, `autocomplete`). Interne Links zeigen auf dieselben Adressen.

## Gestaltung
- Seitenart laut `GRUNDMENGE.json`:
  - **Erzählseite:** eigene Komposition, Rhythmus und Dichte wechseln, höchstens ein Signaturmoment.
  - **Arbeitsseite:** ruhig, dicht, Aufgabe zuerst.
- **Kein KI-Einheitslook:**
  - Kein Badge über der H1, kein zentrierter Einstieg mit zwei Knöpfen, keine Icon-Kachel-Raster, keine Glow-Orbs (Slop-Katalog S-01 bis S-14).
  - Kein Abschnitt darf wie der vorige gebaut sein.
- **Bilder:** generierte Bilder nur mit ehrlichem Alt-Text „(generierte Darstellung)“ (MIKROTEXTE-Zeile vorschlagen, M-17); kein Zuschnitt, der ein Generator-Zeichen abschneidet.
- **Wortbruch:** 0 bei 320, 375, 768, 1024, 1440, 1920 px (`wortbruch.mjs`, Lehre 6, `stufeNachWort`).
- **Reflow:** Kein Überlauf bei 320 px.

## Technik
- Server-Komponenten, wo möglich; Client nur für Bedienung.
- Seitenteile, die es noch nicht gibt, legst du unter `src/components/kern/seiten/<seite>/` an.
- **Gemeinsame Dateien sind tabu**, weil andere Agenten parallel arbeiten: `vorlagen/teile/*`, `basis/*`, `formulare/*`, `kern.css`, Kopf, Fuß, `start/*`, Layout. Brauchst du dort eine Änderung, schreib sie als Vorschlag mit Begründung in die Rückgabe.
- Nur `@/`-Importe für Bausteine außerhalb, relative Importe für Nachbardateien im Entwurfsordner (Lehre 12).
- Kein `<Suspense>` um statischen Inhalt (Lehre 3), keine `:has(:popover-open)`-Varianten, keine Testerkennung.

## Grenzen
- Wie Vorlage §8: kein Build, Start oder Dev; kein `npm install`; kein git mit Schreibwirkung; keine POST-Anfrage; keine Teständerung.
- Keine Bestandsdatei ändern, außer das Einzelbriefing erlaubt es ausdrücklich (dann mit Nachweis wie P4-05a).

## Rückgabe (`_relaunch/pakete/<Kennung>.rueckgabe.md`)
Nach Vorlage §11, zusätzlich:
1. **Textabgleich** Bestand → Entwurf: jeder Text genau einmal, mit Fundstelle.
2. **Metadaten- und JSON-LD-Abgleich.**
3. **Funktionen** der Seite (F-xx) mit der Insel, die sie trägt, und welche Testschritte greifen.
4. Abschnittsfolge mit Begründung der Komposition.
5. MIKROTEXTE-Vorschläge und Vorschläge für gemeinsame Dateien.
6. Offene Fragen und Risiken.
