<!-- Technikgutachten zur Planung (23.10.2026, Opus 5.5, nur lesend, Quellen per Web). Unverändert. -->

**Basis:** Ich habe am exakten Tag v16.3.6 geprüft. Abkürzung N = https://github.com/vercel/next.js/blob/v16.3.6/packages/next/src. Der App Router läuft nicht mit react@19.2.4, sondern mit dem von Next mitgelieferten React `19.3.0-canary-cbb046ab-20260731` (npm next@16.3.6, `dist/compiled/react/cjs/react.production.js:565`).

**1. Prüft Link `e.defaultPrevented`? Gibt es onNavigate?**
- Ja. `onClick` ruft zuerst das eigene onClick auf (N/client/app-dir/link.tsx#L677-L678), dann folgt `if (e.defaultPrevented) return` (#L692).
- Warum ein früherer Capture-Listener greift: Die React-Wurzel ist `document` (N/client/app-index.tsx#L40, #L419). Reacts onClick läuft im Bubble-Listener auf document, also nach jedem Capture-Listener auf window oder document. Das SyntheticEvent übernimmt `defaultPrevented` vom nativen Event (react v19.2.4, `react-dom-bindings/src/events/SyntheticEvent.js:60-80, :156`).
- onNavigate gibt es seit v15.3.0 (docs/01-app/03-api-reference/02-components/link.mdx#L1376).
  - Es läuft nur bei lokaler Client-Navigation ohne Modifier, `target` oder `download` (link.tsx#L240-L302).
  - Sein `preventDefault` bricht die Navigation ab, es schiebt sie nicht auf. Danach ruft man selbst `router.push` auf.
- Robuster ist onNavigate in einem zentralen Link-Wrapper (74 Dateien importieren next/link). Der Wrapper kennt `replace`, `scroll` und `transitionTypes`.
  - Der document-Listener sieht `transitionTypes` nicht, weil Link sie nicht ins DOM schreibt. Betroffen sind /home/user/tezgel/src/components/leistungen/Gewerk.tsx:94 und /home/user/tezgel/src/components/kern/Knopf.tsx:44. `router.push` würde `transitionTypes` zwar annehmen (N/client/components/app-router-instance.ts#L458-L475).
  - Außerdem bleibt `useLinkStatus` bei der Listener-Lösung im Leerlauf.
  - Vorteil des Listeners: Er erfasst auch reine `<a>`, etwa ServiceMapWrapper.tsx:103 und die Markdown-Links in blog/[slug]/page.jsx:203.

**2. Wie behandelt der App Router popstate?**
- Registrierung: `window.addEventListener('popstate', onPopState)`, ohne capture, in `useEffect(…, [])` der Komponente `Router` (N/client/components/app-router.tsx#L303, #L379-L402).
- Was der Handler aus dem Event liest:
  - `!event.state` → return, Next tut nichts (#L380-L383).
  - `!event.state.__NA` → `location.reload()` (#L386-L389).
  - Sonst `dispatchTraverseAction(window.location.href, event.state.__PRIVATE_NEXTJS_INTERNALS_TREE)` in startTransition (#L393-L398).
  - Aufbau des State: `{__NA:true, __PRIVATE_NEXTJS_INTERNALS_TREE:{tree, renderedSearch}}` (#L73-L86).
- Ein synthetisches `new PopStateEvent` mit demselben state funktioniert. Next prüft `isTrusted` nicht und nimmt die URL aus `location.href`.
- React rendert Transitionen während eines popstate (`window.event.type`) synchron, auch bei dispatchEvent (`dist/compiled/react-dom/cjs/react-dom-client.production.js:15403-15413`).
- Fallen:
  - **Fehlender state:** Native Fragment-Einträge, z. B. SkipNav `#…`, haben keinen state. Dann muss die Komponente das Event durchlassen.
  - **Reload:** `history.state` überlebt den Reload, und HistoryUpdater schreibt beim Hydrieren neu (#L64-L101). Der state ist also vorhanden.
  - **Race:** Committet während der Verzögerung irgendein Router-Update, schreibt HistoryUpdater per `replaceState` die alte canonicalUrl über den neuen Eintrag (#L87-L98). Die Adresse springt dann zurück.
  - **Doppeltes Zurück:** Beim Dispatch den aktuellen `history.state` verwenden, nicht den gemerkten.

**3. Feuern Capture-Listener am Ziel zuerst?**
- Laut DOM-Spezifikation ja: erst Capture-, dann Nicht-Capture-Listener (whatwg/dom#916, #926).
  - Safari hat das schon länger so gemacht.
  - Chromium hat es über crbug 1052152 umgesetzt (Dezember 2020). Ob das Version 89 war, ist nicht gesichert (OFFENE FRAGE), für das Ziel ≥111 aber unerheblich.
  - Firefox erst ab **116** (bugzilla 1731504).
- **Firefox 111–115 (inklusive ESR 115) liegt im browserslist** und nutzt dort die Registrierungsreihenfolge.
  - Dort klappt es nur, weil Effekte von Kindern vor denen der Eltern laufen.
  - Das bricht bei lazy/dynamic-Import oder Remount.
  - Gegenmaßnahme: den Listener auf Modulebene registrieren.
- Ist die Reihenfolge gesichert, stoppt `stopImmediatePropagation` alle weiteren Listener auf window, auch Analytics.

**4. Scroll**
- **router.push mit scroll: true:** `ScrollBehavior.Default` (app-router-instance.ts#L466-L470) gibt neuen Segmenten eine scrollRef (segment-cache/navigation.ts#L773-L819).
  - Standard ist der neue Handler (server/config-shared.ts#L2159 `appNewScrollHandler: true`).
  - Er läuft in useLayoutEffect. Ist die Oberkante des neuen Segments sichtbar, scrollt er nicht, sonst setzt er `scrollTop = 0` (client/components/layout-router.tsx#L330-L440, #L416-L425).
  - Smooth-Scroll wird über `data-scroll-behavior` kurz abgeschaltet (shared/lib/router/utils/disable-smooth-scroll.ts#L16-L48).
  - Der Handler setzt **keinen Fokus** (#L406-L407). Der eigene Fokus auf die H1 ist also berechtigt.
- **Zurück/Vor:** Next scrollt nicht selbst, `focusAndScrollRef` bleibt unverändert (navigation.ts#L853-L871). Die native Wiederherstellung trifft das neue DOM, weil React synchron rendert.
- **history.scrollRestoration:** Der App Router setzt es nie. Nur der Pages Router tut das (`dist/esm/shared/lib/router/router.js:221, :597`).
- Risiko:
  - Mit Verzögerung stellt der Browser bei 'auto' die Position auf dem alten DOM her. Der Trick erzwingt also 'manual'.
  - 'manual' wird von pushState-Einträgen übernommen. Reload und dokumentübergreifendes Zurück landen dann oben, solange man nicht selbst wiederherstellt.
  - Eigenes `scrollTo` braucht `behavior:'instant'`, weil /home/user/tezgel/src/app/globals.css:158 smooth setzt.
  - Ob 'manual', gesetzt im popstate-Handler, die Wiederherstellung desselben Schritts noch unterdrückt, ist je Engine offen (OFFENE FRAGE).

**5. Routen-Ansager**
- Er existiert noch: client/components/app-router-announcer.tsx#L5-L70, gerendert in app-router.tsx#L494.
- Aufbau: `<next-route-announcer>` mit Shadow-DOM, `role=alert`, assertive.
- Er sagt `document.title` an (Ersatz: H1), sobald sich `tree` ändert und der Titel anders ist als vorher. Beim Erstaufruf sagt er nichts (#L47-L67).
- Risiko: Zusammen mit dem H1-Fokus droht eine Doppelansage, das muss mit einem Screenreader getestet werden.
- Ob der Titel zum Effektzeitpunkt schon neu ist, ist offen (OFFENE FRAGE).

**6. Offizielle Möglichkeit, den Commit zu verzögern**
Es gibt keine.
- onNavigate bricht nur ab (link.tsx#L290-L302).
- `useLinkStatus` liest nur den Zustand (link.tsx#L806-L808).
- `onRouterTransitionStart` benachrichtigt nur, auch bei 'traverse' (client/components/router-transition.ts#L46-L74).
- `gestureTransition`/`gesturePush` ist experimentell und erzwingt React experimental (lib/needs-experimental-react.ts#L4-L9; app-router-instance.ts#L326-L381).
- Die Navigation API nutzt Next nicht (app-router.tsx#L78, „TODO“). In Safari 16.4 und Firefox 111 fehlt sie ohnehin.
- ViewTransition läuft auch bei Zurück/Vor (docs/01-app/02-guides/view-transitions.mdx#L266), aber React bestimmt den Zeitpunkt.

Nichts davon ersetzt den popstate-Trick eins zu eins.

**7. ViewTransition**
- Verfügbar ohne Flag: „work in the App Router with no configuration“ (view-transitions.mdx#L50). Das mitgelieferte React exportiert `ViewTransition` (react.production.js:395).
- Ein Schlüssel `viewTransition` steht in config-schema.ts nicht mehr. Ob ein alter Schlüssel nur ignoriert wird, ist offen (OFFENE FRAGE).
- Konflikte:
  - (a) Ein Push ohne `transitionTypes` lässt den Morph `plan-vor` ausfallen.
  - (b) Bei einer laufenden View Transition liegen benannte Elemente in der Top-Layer über der festen Überlagerung, unabhängig vom z-index. Während der Aufnahme pausiert das Rendern, die Fliesen stocken.
  - React blendet die Wurzel aus, wenn sie nicht betroffen ist (react-dom-client.production.js:10950-10990). Die Überlagerung selbst bleibt also live sichtbar.
- Gegenmaßnahme: Links mit `transitionTypes` von „Verlegen“ ausnehmen.

**8. Urteil**
Für Klicks ist der Plan mit Änderungen tragfähig. Die schwächste Stelle ist der popstate-Teil.

- **Risiko 1: popstate-Aufschub.** Er hängt an Interna, hat das Race mit HistoryUpdater, wackelt in Firefox ≤115 und erzwingt 'manual'.
  - **Robustere Variante:** Zurück/Vor ohne Aufschub. Im Capture-Listener den Boden synchron auf „liegt“ setzen (Fliesen statisch, keine Animation) und das Event *nicht* stoppen.
  - Next und React rendern dann synchron im selben Task, der Browser stellt den Scroll nativ wieder her, danach folgt „Weiterziehen“. Kein Re-Dispatch, kein 'manual'.
  - Falls der Aufschub bleibt:
    - Listener auf Modulebene registrieren.
    - Bei `!state?.__NA` und reinem Hash-Wechsel durchlassen.
    - Mit dem aktuellen `history.state` dispatchen.
    - Abbrechen, wenn sich `location` geändert hat.
- **Risiko 2: Abschlusserkennung.** `useSearchParams` im Root-Layout ohne Suspense lässt alles bis zur nächsten Suspense-Grenze clientseitig rendern (docs/01-app/03-api-reference/04-functions/use-search-params.mdx#L80-L88). Das schadet LCP und SEO. Außerdem hängen gleiche URL und Redirect bis zu 3 s.
  - `<Suspense fallback={null}>` um die Komponente legen.
  - Als Abschluss `isPending` von `useTransition` um `router.push` nutzen. Ob isPending bis zum Commit hält, muss getestet werden (OFFENE FRAGE).
  - Ein Zeitlimit behalten, gleiche URL ausnehmen und beim Klick sofort `router.prefetch(href)` aufrufen.
- **Risiko 3: Semantikverlust und Eingaben unter der Decke.** `transitionTypes`, `replace` und `scroll={false}` gehen verloren. `inert` macht die Überlagerung für Treffertests durchlässig, die Seite darunter bleibt klickbar.
  - onNavigate-Wrapper oder data-Attribut zum Abschalten verwenden.
  - Während des Wechsels die Überlagerung auf `pointer-events:auto` und aria-hidden setzen, `inert` stattdessen auf header, main und footer.
  - Die 80 Fliesen erst bei der ersten Interaktion erzeugen, damit DOM-Größe und TBT im Budget bleiben.

### Critical Files for Implementation
- /home/user/tezgel/src/app/(bestand)/_dokument.tsx
- /home/user/tezgel/src/components/leistungen/Gewerk.tsx
- /home/user/tezgel/src/components/kern/Knopf.tsx
- /home/user/tezgel/src/app/globals.css
- /home/user/tezgel/src/components/leistungen/uebersicht/PlanUebergang.jsx

Quellen zu Frage 3: [whatwg/dom#916](https://github.com/whatwg/dom/issues/916), [whatwg/dom#926](https://github.com/whatwg/dom/issues/926), [Mozilla-Bug 1731504](https://bugzilla.mozilla.org/show_bug.cgi?id=1731504), [Mozilla-Bug 1492446](https://bugzilla.mozilla.org/show_bug.cgi?id=1492446), [public-webapps-github 2020Nov/0447](https://lists.w3.org/Archives/Public/public-webapps-github/2020Nov/0447.html)
