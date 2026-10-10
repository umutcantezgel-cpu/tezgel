# P3-00pq-GEG · Rückgabe · Gegenprüfung Kanal-, Banner- und Kurzformular-Hooks F-10, F-11, F-09

Kennung P3-00pq-GEG · Rolle Gegenprüfer · Stufe 3 · Opus (frisch) · Schreibrechte: nur diese Datei · Umfang: Commits `70a77a8` (P3-00p) und `8319525` (P3-00q), alte Fassungen aus `<commit>~1`. Kein Build, kein Server, kein `tsc`, kein git mit Schreibwirkung, keine POST-Anfrage. Die sechs betroffenen Dateien sind in HEAD (`3497c49`) und im Arbeitsbaum unverändert gegenüber den Commits (`git diff --stat` leer).

## Urteil
- **`70a77a8` (F-10, F-11): Verhalten gleich: ja.**
- **`8319525` (F-09): Verhalten gleich: ja.**

Ich habe keinen Befund mit Wirkung in Produktion gefunden. Es bleiben nur Hinweise der Schwere „niedrig“ ohne Verhaltenswirkung (siehe „Befunde“).

## Vorgehen
Für jede Datei habe ich die alte und die neue Fassung vollständig gelesen. Dann habe ich verglichen:
1. die Logik alt (Komponente) gegen den Hook, blockweise,
2. das Markup alt gegen neu, über die Hunks des Commit-Diffs,
3. die Handler-Körper,
4. die Reihenfolge von Hooks und Effekten, die Abhängigkeitslisten, die Closures, die Rückgabewerte und die Importe.

Zusätzlich habe ich `src/hooks/useConsent.ts` (E0), `widgetPhysicsCoordinator.registerBox`, `next.config.ts` (`reactStrictMode: true`, kein `reactCompiler`) und alle Stellen in `src` gelesen, die `openCookieSettings` oder `#cookie-settings` verwenden.

## F-10 · FloatingWhatsAppWidget → `useWhatsAppKanal.ts`
- **`getContextualMessage`:** Alle 11 Zweige und Texte sind gleich, in derselben Reihenfolge (`/bad` vor `/fliesen…`). Hinzugekommen ist nur `export`.
- **`trackClick`:** Hook `:43–54` gleich alt `:384–395`, Deps `[pathname]`.
- **`lastActionTimeRef` und `triggerWhatsAppAction`:** Hook `:56–73` gleich alt `:397–414`, mit der 450-ms-Sperre und Deps `[pathname, trackClick]`. Der Weg ist mobil `openWhatsApp`, am Desktop `buildWhatsAppUrl` + `window.open(…, "noopener,noreferrer")`.
- **Hook-Folge der Fiber:** Der Aufruf `useWhatsAppKanal(pathname)` steht genau an der alten Stelle (`FloatingWhatsAppWidget.tsx:350`), also bleibt die Folge `useCallback`, `useRef`, `useCallback` gleich. `pathname` ist weiterhin `usePathname() || ""` (`:102`) und wird vor dem Aufruf definiert.
- **Verwender:** `triggerWhatsAppAction` wird weiterhin in `onPointerUp` (`:472`, Deps `:475`) und im Klick-/Tastatur-Handler (`:530`, Deps `:532`) verwendet. Das ist dieselbe Referenz mit derselben Stabilität wie vorher.
- **Markup:** kein Hunk im Diff, also unverändert.

## F-11 · CookieConsent → `useEinwilligungsBanner.ts`
- **Logik:** `useConsent()`-Destrukturierung, die 4 × `useState`, der Effekt E7 (`#cookie-settings`, `openCookieSettings`, `replaceState`, Deps `[consent, setShowBanner]`) und die fünf Handler sind byte-gleich verschoben.
- **`handleShieldClick`:** Der Körper ist gleich dem alten Inline-`onClick` (alt `:781–786`), mit derselben Reihenfolge der Setzer. Er entsteht wie vorher in jedem Render neu und liest `consent` aus demselben Render, deshalb gibt es keine veraltete Closure.
- **Markup:** Die einzige Änderung ist `onClick={handleShieldClick}` (`CookieConsent.tsx:722`). `setShowBanner` wurde vorher nur dort verwendet. Alle übrigen Bezeichner im Markup sind destrukturiert.
- **Hook-Folge:** vorher `useConsent` (2 `useState`, E0, 4 `useCallback`), dann 4 `useState`, dann Komponente (E1–E6), E7 zuletzt. Nachher: `useConsent`, 4 `useState`, **E7**, dann E1–E6. Nur E7 wandert.

### Gegenprüfung der Begründung zur Effekt-Reihenfolge (Rückgabe P3-00p)
Ich halte die Begründung für zutreffend. Geprüft habe ich sie einzeln je Szenario:

- **Allgemein.** React führt passive Effekte je Fiber zusammenhängend aus: zuerst alle Aufräumfunktionen des Baums, dann alle Erzeugungen. Der Hook ist kein eigener Fiber. Deshalb kann die Verschiebung nur die Reihenfolge *innerhalb* von `CookieConsent` ändern, nicht die gegenüber anderen Komponenten.
  - E1–E6 lesen weder `window.location` noch `history`, noch die Zustände, die E7 setzt.
  - `registerBox` (`widgetPhysicsCoordinator.ts:46–51`) setzt nur `this.box` und löst nichts synchron aus.
  - E3 weist nur eine Funktion zu.
  - In E7 werden die Setzer gebündelt, das Neu-Rendern folgt erst nach dem Commit. `replaceState` löst kein `hashchange` aus.
  - Es gibt keine gemeinsame Ressource.
- **Erstbesuch ohne gespeicherte Einwilligung.**
  - E0 startet einen 400-ms-Timer und registriert keine Listener. E7 registriert `hashchange` und `openCookieSettings`.
  - Der Ablauf ist alt und neu identisch. Nach 400 ms wird `setShowBanner(true)` aufgerufen, danach laufen E1, E2 und E4 mit `showBanner=true` in unveränderter relativer Folge.
- **Rückkehr mit Einwilligung.**
  - E0 registriert `hashchange`, `openCookieSettings` und `cookie_consent_updated`, danach registriert E7 seine Listener. E0 läuft in beiden Fassungen vor E7, also ist die Listener-Folge je Ereignistyp gleich.
  - Wenn sich `consent` ändert (Speichern oder externes Update), wird nur E7 neu angemeldet (E0 hat die Deps `[]`). Die Folge „E0 vor E7“ bleibt also auch nach Updates erhalten.
- **Aufruf mit `#cookie-settings` in der URL.**
  - Der Initialisierer von `showBanner` liefert sofort `true`.
  - Beim Mount ruft E7 `handleHashChange` auf. Die Setzer laufen, `replaceState` entfernt den Hash.
  - Mit Cookie werden die Häkchen aus `consent` übernommen, ohne Cookie bleiben sie `false`. Das ist alt und neu gleich.
  - E1–E6 sind davon unabhängig.
- **React StrictMode (dev, `reactStrictMode: true`).**
  - Beim Mount läuft die Folge „alle Effekte erzeugen → alle aufräumen → alle erneut erzeugen“, je Fiber in Deklarationsreihenfolge.
  - Im ersten Durchlauf verbraucht E7 den Hash (`replaceState`), im zweiten Durchlauf ist kein Hash mehr da, und es werden nur Listener angemeldet. Das gilt alt und neu gleich, weil E7 in beiden Fassungen nach E0 läuft und E1–E6 keinen Bezug zum Hash haben.
  - Der doppelte Aufruf der `useState`-Initialisierer findet in der Render-Phase statt, also vor `replaceState`. Er liefert in beiden Fassungen `true`.
- **`openCookieSettings` aus dem Fußbereich.**
  - In `src` löst niemand `openCookieSettings` aus. Der Fuß nutzt den Anker `#cookie-settings` (Kommentar `Fuss.tsx:69`).
  - Wird das Ereignis von außen ausgelöst, laufen mit Einwilligung zuerst E0 (`setShowBanner(true)`) und dann E7. Ohne Einwilligung läuft nur E7. In beiden Fassungen ist das gleich.
- **Fast Refresh (nur dev):** Die Slot-Folge ändert sich, deshalb wird `CookieConsent` beim ersten HMR einmal neu gemountet. Für Produktion ist das ohne Belang, die Rückgabe hat es bereits dokumentiert.

## F-09 · LeadQuickForm → `useSchnellanfrage.ts`
- **Logik:** Die 5 × `useState` (inklusive `mountTime` mit Initialisierer `Date.now()`) und `handleSubmit` sind byte-gleich: Honeypot, Prüfung, Nutzlast `/api/anfrage`, Fehlertexte und `onSuccess`. Vergleich: Hook `:6–77` gegen alt `:34–105`.
- **Aufruf:** Der Hook wird unbedingt vor dem frühen `return` (Erfolg) aufgerufen, die Hook-Folge ist gleich.
- **`sourceTag`:** Der Standardwert `'schnellanfrage-leistungsseite'` wird weiterhin in der Komponente gesetzt und dann an den Hook übergeben. `onSuccess` wird unverändert durchgereicht.
- **Closures:** `handleSubmit` entsteht weiterhin in jedem Render neu, ohne Memoisierung. Es gibt keine veraltete Closure auf `formData`, `sourceTag` oder `onSuccess`.
- **Rückgabe:** Die Komponente braucht `formData`, `setFormData`, `status`, `errorMessage`, `referenceId` und `handleSubmit`, und alle sechs werden zurückgegeben. `mountTime` bleibt intern.
- **Markup:** kein Hunk im Diff, also unverändert.
- **Importe:** In der Komponente ist `useState` entfallen. `React` bleibt, weil es weiter verwendet wird. Der Hook importiert `React` für den Typ `React.FormEvent`.
- **Verwender:** `FinalCTA.tsx:148` ist unberührt.

## Befunde (alle niedrig, ohne Verhaltenswirkung)
1. **niedrig · `useEinwilligungsBanner.ts:24`.** E7 rückt auf einen früheren Hook-Slot. Wirkung: Beim ersten Fast Refresh im Entwicklungsmodus wird `CookieConsent` einmal neu gemountet (Szenario: Entwickler speichert, der Banner-Zustand wird zurückgesetzt). In Produktion gibt es keine Wirkung. Die Rückgabe hat das bereits dokumentiert.
2. **niedrig · `useWhatsAppKanal.ts:76`, `useEinwilligungsBanner.ts:1`, `useSchnellanfrage.ts:1`.**
   - `contextMessage` wird in jedem Render zusätzlich als reine Funktion berechnet, ohne Nebenwirkung, und der Bestand nutzt es nicht.
   - Die Hook-Dateien haben keine `'use client'`-Direktive. Würde ein Hook künftig direkt aus einer Server-Komponente importiert, schlüge der Build fehl. Heute importieren ihn nur Client-Komponenten.
3. **niedrig · `useSchnellanfrage.ts:5`.** `sourceTag` ist Pflicht und hat im Hook keinen Standardwert. Eine künftige Kern-Ansicht muss den Wert selbst übergeben. Am Bestand ändert sich nichts.
