# P3-00l-GEG · Rückgabe · Gegenprüfung Formular-Hooks F-01, F-02, F-03, F-12

Kennung P3-00l-GEG · Rolle Gegenprüfer · Stufe 3 · Opus (frisch) · Schreibrechte: nur diese Datei · Umfang: Commit `56fd0dd` (vier Komponenten, vier neue Hooks unter `src/lib/formulare/`), alte Fassungen aus `56fd0dd~1`. Kein Build, kein Server, kein `tsc` (könnte `tsbuildinfo` schreiben), kein git mit Schreibwirkung. Arbeitsbaum = Commit für alle acht Dateien (`git diff --stat` leer).

## Urteil
**Verhalten gleich: ja.** Keine Abweichung in Zuständen, Ableitungen, Prüfungen, Texten, Nutzlast, Netzwerkaufrufen, Effekten, Handlern, Reset-Logik oder Markup gefunden. Es bleibt kein offener Befund.

## Vorgehen
Für jede Komponente habe ich die alte und neue Fassung vollständig gelesen (Kopien im Scratchpad). Dann habe ich blockweise per `diff` verglichen:
1. die Logik vorher (Komponente) gegen nachher (Hook),
2. das Markup vorher gegen nachher,
3. die Körper der sieben neuen Handler gegen die alten Inline-Körper.

Zusätzlich habe ich per Skript geprüft, ob jeder Bezeichner, den das Markup nutzt, in der neuen Komponente destrukturiert oder importiert ist.

| Formular | Logik (diff) | Markup (diff) | Konstanten |
|---|---|---|---|
| F-01 HeroContactForm | alt 24–105 = `useHeroKontakt.ts` 15–96, byte-gleich | alt 107–374 ↔ neu 40–294: nur `:85` `onClick={handleNewRequest}`, `:283` `onClick={handleWhatsAppClick}` | `PROJECT_OPTIONS` gleich, nur `export` hinzu |
| F-02 PricingCalculator | alt 43–177 = `usePreisrechner.ts` 17–151, byte-gleich | alt 179–641 ↔ neu 73–528: nur `:120` `() => selectService(srv.id)`, `:169` `() => selectRoomSize(size.id)` | `SERVICE_ICONS` gleich; `export { PricingCalculator }` bleibt |
| F-03 TezgelAnfrageFunnel | alt 86–174 = `useAnfrageFunnel.ts` 59–147, byte-gleich | alt 176–620 ↔ neu 77–507: nur `:125` `handleNewRequest`, `:155` `handleBackToOverview`, `:266` `() => selectArea(opt)` | `PROJECT_TYPES`/`AREA_OPTIONS`/`TIMING_OPTIONS` gleich, nur `export`; `STEPS`/`inputClass`/`optionClass` gleich |
| F-12 MapConsentGate | alt 22–34 + 45 = `useKartenEinwilligung.ts` 7–21 | alt 36–43, 47–115 ↔ neu 23–30, 32–100: gleich | – |

## Einzelpunkte
- **Handler (7):** Die Körper sind wörtlich gleich, nur die Einrückung ist anders.
  - `handleNewRequest` und `handleBackToOverview` bekommen jetzt das Klick-Ereignis als Argument, ignorieren es aber, wie vorher der Pfeil ohne Parameter.
  - `handleWhatsAppClick(e)` ruft `e.preventDefault()` im selben Zweig (`isMobileDevice()`) auf wie vorher.
  - `selectService`, `selectRoomSize` und `selectArea` bekommen `srv.id`, `size.id` und `opt` wie vorher aus der Map-Iteration beim Rendern.
  - Alle Funktionen entstehen bei jedem Rendern neu im Hook und werden bei jedem Rendern frisch destrukturiert. Es gibt also keine veralteten Closures und keine Memoisierung: kein `useCallback`/`useMemo` und kein React Compiler (`next.config.ts` ohne `reactCompiler`).
- **Hook-Regeln:** Jeder Hook wird unbedingt am Anfang der Komponente aufgerufen, vor allen frühen `return`. Die Hook-Reihenfolge in der Fiber ist gleich:
  - F-01: 11 × `useState`.
  - F-02: 17 × `useState` (7 + 5 + 5).
  - F-03: 15 × `useState`.
  - F-12: `useConsent` → 2 × `useState` → `useEffect([])`.
  Bedingte Aufrufe gibt es nicht.
- **Effekte:** Es gibt nur F-12 `setIsHydrated(true)` mit `[]`. Er ist unverändert, und der `eslint-disable` ist mitgewandert. Abhängigkeitslisten mit Funktionen gibt es nicht.
- **F-12 `hasConsent`:** Der Wert wird jetzt vor dem `!isHydrated`-Return berechnet. Das ist ein reiner Ausdruck (`manualAccepted || consent?.marketing`) ohne Nebenwirkung; der Typ `boolean | undefined` ist unverändert.
- **Nutzlast:** In allen drei `fetch('/api/anfrage', …)` sind Feldnamen, Werte, `trim`-Stellen, Fallbacks, `honeypot: honeypot || undefined` und `_t: formInitTime` byte-gleich. Ein Feld `source` gibt es in keiner der drei Nutzlasten, weder vorher noch nachher.
- **Analyse-Ereignisse:** Es gibt kein `gtag`/`dataLayer`/Tracking, weder vorher noch nachher. `triggerHaptic`-Aufrufe (F-02): Stärken und Reihenfolge sind gleich.
- **Importe:**
  - Alle neuen Pfade nutzen `@/`.
  - `./pricing.constants` → `@/components/pricing/pricing.constants` ist dasselbe Modul (tsconfig `@/*` → `./src/*`); kein Zyklus.
  - Die relative Ladereihenfolge der Module mit Seiteneffekt-Potenzial (`company`, `whatsapp`, `haptics`) bleibt gleich.
  - Die Hooks werden nur aus den vier `'use client'`-Komponenten importiert; die Client-Grenze ist unverändert.
- **Exporte:** Alle sind gleich: HeroContactForm (default), PricingCalculator (default + benannt), TezgelAnfrageFunnel (default), MapConsentGate (benannt + default).

## Hinweise (keine Verhaltenswirkung)
- Die Zeilenangaben in `P3-00l.rueckgabe.md` stimmen mit den Stichproben überein (Komponenten-Zeilen der sieben `onClick`-Stellen).
- Die OFFENEN FRAGEN des Bauers betreffen Bestandslogik, die im Commit unverändert ist. Ich habe sie nicht bewertet.
