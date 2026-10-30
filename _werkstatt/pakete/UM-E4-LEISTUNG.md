# UM-E4-LEISTUNG · BUDGETS auf allen Hauptansichten · Rolle Kundschafter und Baumeister (Arbeitskopie) · Modell Opus · Kern-Version 4.4.1 · Kostenklasse L

## Ziel (PLAN-Zeile UM-E4-LEISTUNG, KERN K-012, AUFTRAG BUDGETS, Abnahme Z-10)
Auf allen zwölf Hauptansichten (`_werkstatt/HAUPTANSICHTEN.json`), Lighthouse mobil:
- Leistung ≥ 90, LCP ≤ 2,5 s, CLS ≤ 0,1, TBT ≤ 200 ms;
- Reaktion (INP) ≤ 200 ms;
- keine Hauptansicht schlechter als in E0 um mehr als die Spanne der drei E0-Läufe.

Kein Inhalt fällt weg. Einwilligung, Tracking-Verhalten, Logo und `/api/anfrage` bleiben in Inhalt und Verhalten gleich (G8).

## Ausgangslage
- **Grundmessung:** HEAD nach E4-W3, alle zwölf Ansichten, mobil und Desktop, je 1 Aufwärmlauf und 3 gezählte Läufe, allein auf dem Rechner. Der Orchestrator misst als Skript.
  - Zusammenfassung: `…/leist4/grund/lighthouse.json` (Pfad im Workflow-Briefing).
  - Rohberichte: `_werkstatt/cache/lighthouse/<satz>/<seite>-<form>-<k>.report.json`.
- **`/` (E-097):** Seit UM-E4-START liefert `/` zwei render-blockierende Stylesheets statt einem.
  - Das Haupt-CSS wuchs von 129,0 auf 135,8 KB; die Schrift-Deklarationen (478 B) stehen jetzt in einer eigenen Datei.
  - Lighthouse mobil: FCP in allen sechs Läufen rund 150 ms später, LCP-Median 2816 → 2997 ms, Leistung 95 → 94.
  - Rohberichte: `_werkstatt/cache/lighthouse/lh-{1,2}-{4324,4325}/` (4324 = vorher, 4325 = nachher).
- **Aus PLAN und E-085:**
  - `/standorte/wetzlar` (Leistung mobil 81) und `/blog` (87);
  - Platzhalterhöhe von `spaet-zeichnen` (50rem) für lange Abschnitte wie die Galerie auf `/referenzen` (axe-Messartefakt, E-087);
  - Restmaßnahmen aus E-085: Inline-Kopfskript vor dem Stylesheet; App-Stück der Einwilligung, nur ohne Verhaltensänderung; Bildbreite und `sizes` für m390 bei DPR 3.
- **Methode aus E-085:**
  - Lighthouse rechnet mobil simuliert (Lantern), aus dem Ende des letzten Knotens im LCP-Graphen.
  - `lcpLoadDelay` und `lcpLoadDuration` sind skalierte Zeitstempel, keine Dauern.
  - Brotli-Zweitmessung über `werkzeuge/brotli-proxy.mjs`.

## Schritt 1 · Ursachen belegen (Kundschafter)
- Je Hauptansicht aus den Rohberichten:
  - LCP-Element und Phasen;
  - render-blockierende Anfragen (Anzahl, Bytes);
  - Kette bis zum LCP (`network-dependency-tree-insight`, `critical-request-chains`);
  - Dokumentgröße, JS vor dem LCP, Schriften, TBT-Verursacher (`bootup-time`, Long Tasks);
  - unbenutztes CSS und JS.
- Ergebnis `…/leist4/ursache.md`:
  - Tabelle je Ansicht (Ist gegen Budget);
  - je Ansicht unter Budget die belegte Ursache in einem Satz;
  - eine nach Wirkung geordnete Liste der Maßnahmen, mit erwarteter Wirkung in ms bzw. Punkten und betroffenen Ansichten.

## Schritt 2 · Bauen (Baumeister)
**Maßnahme 1 ist verbindlich:** `/` wieder mit einem render-blockierenden Stylesheet.
- Wege:
  - (a) `experimental.cssChunking` in `next.config.ts`; für Turbopack nur `true` oder `'graph'` mit `requestCost`, siehe `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cssChunking.md`;
  - (b) ein kleineres Haupt-Stylesheet (totes CSS entfernen, seltene Regeln in Komponenten- oder Seiten-CSS);
  - (c) ein anderer belegter Weg.
- Für (a) gilt G6, ein schriftlicher Entscheidungsvermerk in der Notiz:
  - Ziel und Alternativen;
  - Wirkung auf alle Routen: Zahl und Größe der Stylesheets je Hauptansicht vorher und nachher, aus dem Build-Manifest bzw. dem ausgelieferten HTML;
  - Risiko der Reihenfolge der Regeln;
  - Rückweg.
- Ein Weg, der nur unter einer Schwelle bleibt und beim nächsten Paket wieder kippt, braucht eine Absicherung: einen Test in `test/`, der die Zahl der Stylesheets von `/` im Build prüft, oder die Begründung, warum das nicht geht.

**Danach die Maßnahmen aus Schritt 1** mit der größten belegten Wirkung, zuerst für die Ansichten unter Budget.
- Nur, was die Daten tragen. Keine weiteren experimentellen Schalter ohne Entscheidungsvermerk (G6).
- Die Dokumentation von Next 16 liegt in `node_modules/next/dist/docs/` (AGENTS.md).

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/leist4/baum` (Abzug von HEAD, `node_modules` verlinkt).
- Vor dem ersten Edit `vor` anlegen:
  `mkdir -p …/leist4/vor && (cd …/leist4/baum && tar --exclude=./node_modules --exclude=./.next -cf - .) | (cd …/leist4/vor && tar -xf -)`
- Am Ende:
  - `cd …/leist4 && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor baum > UM-E4-LEISTUNG.diff`
  - Notiz `UM-E4-LEISTUNG.notiz.md` mit Ursachen, Maßnahmen, Entscheidungsvermerken (G6), Prüfzahlen und Erwartung je Ansicht.
- Bauen: Turbopack folgt dem Verweis `node_modules` nicht aus dem Projekt heraus. Für den Bau den Verweis durch eine echte Kopie mit dem Namen `node_modules` ersetzen (eine Kopie unter anderem Namen behandelt Turbopack als Projektcode, Hinweis aus UM-E4-NBSP), danach Verweis zurück und `.next` löschen. Speicher ist knapp.
- Kein Lighthouse und keine Zeitmessung durch Agenten (E-076). Das Messen macht der Orchestrator danach als Skript, allein auf dem Rechner, im Wechsel vorher und nachher.
  - Gib eine nachprüfbare Erwartung je Ansicht an.
  - Prüfe selbst nur, was nicht von der Last abhängt: Zahl und Größe der Stylesheets und Skripte je Hauptansicht im ausgelieferten HTML eines eigenen Baus (`npx next start -p 4460 -H 127.0.0.1`, per Prozessgruppe beenden), Dokumentgröße, Vorladehinweise.
- Prüfen in der Arbeitskopie:
  - `npm test`, `npx eslint`, `npx tsc --noEmit` mit vorübergehender `next-env.d.ts`;
  - `werte.mjs --arbeitsbaum --dateien …` mit 0 Befunden;
  - `npx next build`: läuft durch; HTML und First-Load-JS je Hauptansicht.
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Leitplanken
- B-01 bleibt eingefroren (E-078). Der Eingang (E-081) darf das Foto nicht verdecken. Bewegungsschalter (E-080) und Register bleiben.
- Einwilligung, Tracking-Verhalten, Logo, Rechtstexte, Firmendaten, Formulare und `/api/anfrage` bleiben unberührt (G8). Ein früheres Zeichnen des Banners nur, wenn Wortlaut, Knöpfe und Wirkung gleich bleiben (E-067).
- Keine sichtbare Änderung im Ruhezustand, außer sie ist die Maßnahme und in der Notiz begründet (Pixelvergleich durch den Orchestrator).

## Rückgabe
- Ursachen je Ansicht in einem Satz, Maßnahmen mit erwarteter Wirkung
- Entscheidungsvermerke (G6)
- Prüfzahlen
- Diff-Pfad und Dateien
- offene Fragen
