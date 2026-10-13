# Vorlage · Kern-Baumeister (P3) · Kern v1.2

> **Abgelöst (E-038, E6-ORCH-01 Schritte 5 und 10):** Das Klassensystem `k-*` und seine Ordner (`src/app/(kern)`, die
> Unterordner von `src/components/kern/`, `src/lib/kern`, `src/styles/kern*.css`) sind abgebaut (81d3016, 51f2cad, 2026cd2), Vorschau-Kandidaten
> (`-v`) gibt es nicht mehr. Diese Vorlage nicht mehr für neue Aufträge verwenden; es gelten `_seitenregeln.md` und
> `_werkstatt/KERN.md` (KERN v2). Die Pfade unten sind Geschichte und keine Vorlage und kein erlaubter Import mehr.

## 2 Rollenbriefing
Du baust Teile des neuen Gestaltungssystems der Website von Fliesenverlegung Tezgel (Next.js 16 App Router, React 19, Tailwind 4.3, TypeScript). Du arbeitest nach `_relaunch/KERN.md` (v1.2) – lies ihn ganz, besonders „Das Projekt in fünf Sätzen“, K-003 bis K-012. Häufige Fehler, die du vermeidest: freie Werte (`p-[13px]`, Hex im Code, Inline-`style` außer CSS-Variablen, Dauern als Zahl); Standard-Look von Komponentenbibliotheken (abgerundete Karten, Schatten, Pillen); fehlende Zustände (Hover, Fokus, aktiv, deaktiviert, lädt, Fehler, Erfolg); Information nur über Farbe; Texte erfinden; Sonderwege für Tests.

## 3 Technik
- Nur Kern-Tokens als Tailwind-Klassen: Farben `*-k-kalk|fliese|fuge|strich|tinte-2|tinte|laser|laser-tief|abnahme|nacht-2|nacht-fuge`, Abstände `*-k-1 … *-k-10`, Schrift `text-k-1 … text-k-7`, `font-k-text`/`font-k-mono`, Radien `rounded-k-0|k-1`, Kurven `ease-k-setzen|laser|weg`, Dauern über `duration-(--k-dauer-1)` usw. Satzklassen `.k-anzeige`, `.k-text`, `.k-mono` aus `src/styles/kern.css`. Bewegung nur über das Register (`data-motion="…"` aus K-009, CSS in `kern.css`).
- Ablage nur in den Ordnern der Schreibrechte. Imports nur über `@/`. Server-Komponenten, wo keine Interaktion nötig ist; `'use client'` nur wo nötig.
- Bestandsdateien (alles außerhalb von `src/components/kern/`, `src/lib/kern/`, `src/lib/motion/`, `src/app/(kern)/`, `src/app/fonts/`, `src/styles/kern*.css`) sind eingefroren und werden nicht geändert (Plan Runde 3, Bauregel 1). Logik aus Bestandskomponenten nicht kopieren.
- Vor Code zu Next.js die passende Seite in `node_modules/next/dist/docs/` lesen.

## 4 Das Projekt in fünf Sätzen
(wortgleich aus `_relaunch/KERN.md`.)

## 8 Grenzen
Nur Dateien der Schreibrechte. Kein git mit Schreibwirkung, kein `npm install/uninstall`, kein `next build`/`next start`, keine POST-Anfragen. Erlaubt: `cd /home/user/tezgel && npx tsc --noEmit -p tsconfig.json` und `npx eslint <deine Dateien>`.

## 9 Vorschau
Lege eine Vorschau-Seite unter `src/app/(kern)/_entwurf/<deine-kennung>/page.tsx` an, die alle deine Teile in allen Zuständen zeigt (sie wird nie freigeschaltet). Der Orchestrator baut daraus einen Vorschau-Kandidaten und fotografiert; wenn er dir Fotos gibt, prüfe sie und bessere nach.

## 11 Ausgabeformular (Rückgabe `_relaunch/pakete/<Kennung>.rueckgabe.md`)
Kopfzeile · gebaute Teile mit Datei, Aufgabe und Zuständen · verwendete Tokens/Register-Kennungen · Abweichungen vom KERN mit Grund · OFFENE FRAGEN · RISIKEN · Selbstprüfung.

## 12 Selbstprüfung
tsc und eslint grün? Keine freien Werte (grep nach `-[`, `#[0-9a-fA-F]{3,6}`, `style=` ohne `--k-`)? Jeder Teil hat alle zutreffenden Zustände? Fokus 2 px, Kontrast 3:1? Touch-Ziele ≥ 44 px? Funktioniert ohne JavaScript, wo es kann?
