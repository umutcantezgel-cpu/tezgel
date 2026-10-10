# W0 · Löschliste „Aufräumen“ (Entwurf zur Gegenprüfung)

Freigabe durch den Auftraggeber (E-000): (a) Reste der Vorgängerfirma · (b) Prompt-/Pipeline-Dokumente · (c) Export-Ordner · (d) Logs, Vorlagen, Altkonfig.
Belege: `git log --diff-filter=A` (54038a2 = „Initial commit of Vite SPA“ der Vorgängerfirma Batherm/Bariş Haustechnik), knip (`_relaunch/werkzeuge/knip.json`), grep auf Importe. Archiv = Commit 5a7a7b0 (Ausgangsstand) – jede Datei ist dort vollständig erhalten.

## (a) Reste der Vorgängerfirma – nur ungenutzte Dateien (kein Import, knip „unused file“)
| Datei | Herkunft | Beleg „ungenutzt“ |
|---|---|---|
| src/components/blog/BlogComments.jsx | 54038a2 (Vite-SPA Vorgängerfirma) | knip; kein Import |
| src/components/blog/Lightbox.jsx | 54038a2 | knip; kein Import |
| src/components/ui/button.jsx | 54038a2 | knip; kein Import |
| src/components/ui/input.jsx | 54038a2 | knip; nur von BlogComments importiert (wird mit gelöscht) |
| src/components/ui/textarea.jsx | 54038a2 | knip; nur von BlogComments importiert |
| src/config/routes.js | 54038a2 (englische Alt-Routen /services, /about …) | knip; kein Import |
| src/hooks/useBusinessStatus.js | 54038a2 | knip; kein Import |
| src/services/logger.js | 54038a2 | knip; kein Import |
| src/styles/index.css | 54038a2 (Navy-Primärfarbe, Lenis, Google-Fonts-Import) | kein Import |
| `createPageUrl` in src/utils/index.js (nur die Funktion, `cn` und Re-Export bleiben) | 54038a2 (mappt `/energieberatung`) | knip „unused export“ |
| SECURITY.md | beschreibt SHA-256-Login, ProtectedRoute, SafeHTML – existiert nicht mehr (Login deaktiviert, 10199cc) | Inhalt veraltet/fremd |

Nicht gelöscht, obwohl aus 54038a2 – **noch in Benutzung** (Funktion/Bestand): `src/utils/index.js` (cn), `src/schemas/validation.js`, `src/services/dataService.js`, `src/services/authService.js`, `src/contexts/ContentContext.jsx`, `src/contexts/AuthContext.jsx`, `src/components/SEO.jsx` (Widerruf-Seite), `src/components/common/CalendlySection.jsx` (/beratung, Inhalt bereits Tezgel), `src/components/common/ConsentManager.jsx`.

## Abhängigkeiten ohne Import (Altkonfig)
`motion`, `vanilla-cookieconsent`, `@radix-ui/react-slot`, `class-variance-authority`, `@tanstack/react-query`, `dompurify` – knip „unused dependencies“, grep ohne Treffer in `src/`. Entfernen per `npm uninstall` (Lockfile nur Entfernungen). `next.config.ts` `optimizePackageImports`: Eintrag `'motion'` entfernen.
Bleiben: `@googlemaps/js-api-loader` (Abhängigkeit von `@vis.gl/react-google-maps`), `@types/google.maps`, `tailwindcss` (von `@import "tailwindcss"` aufgelöst).

## (b) Prompt- und Pipeline-Dokumente
`Pipeline Kopie 5/` (93 Dateien + context_documents), `.jules/` (ledger.ndjson, state-summary.json), `UPGRADE_BACKLOG.md`.

## (c) Export-Ordner
`K-Aqua-Cursor-Animation/`, `WhatsApp-Button-Export/`, `CookieConsentExport/` (Letzterer stammt aus einem fremden Projekt „MS Schlüsseldienst“). Laufzeit-Kopien in `src/` bleiben unberührt (Gestaltungsentscheidung in P4).

## (d) Logs, Vorlagen, Altkonfig
- `build_error_2.txt`, `build_error_log.txt`, `build_log.txt`, `build_log_2.txt`, `build_log_full.txt`, `build_output.txt` (Vite-Logs „baris-haustechnik“)
- `.gitignore.old` (Vite-Vorlage), `netlify.toml` (Vite-SPA-Rewrite auf `/index.html`, `dist`), `Dockerfile`, `.dockerignore` (Vite-SPA)
- `fonts.css` (Wurzel; IBM Plex/Inter von gstatic, nirgends importiert)
- `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` (Next-Vorlage, nirgends referenziert)
- `public/llms.txt` – veraltetes Duplikat der Route `src/app/llms.txt/route.ts`; Vercel liefert live bereits die Route, lokal überschattet die Datei sie (Abweichung lokal/live) und ist inhaltlich veraltet.
- `.github/workflows/deploy.yml` (Node 18, lädt `dist/` hoch, das es nicht gibt; scheitert bei jedem `v*`-Tag; deployt nichts)
- Ignore-Einträge in `eslint.config.mjs`/`tsconfig.json` für die gelöschten Ordner

## Nicht löschen (Schutzliste)
Coday-Credits (Agentur des Auftraggebers), `public/4c6796df61f5479387fc4f56b1ed6b19.txt` (IndexNow-Schlüssel), `public/google831a76ab6f34b9f6.html` (Search Console), `public/humans.txt`, `public/images/logo/**`, `src/lib/email/**`, `public/icon.png`/`src/app/icon.png`, `.github/workflows/security.yml`, `.env.example`, `.vscode/settings.json`, `docs/DESIGN_SYSTEM.md` und `README.md` (werden in P7 ehrlich nachgezogen), Formularoptionen wie „Fußbodenheizung“ (Fliesenthema), verwaiste Tezgel-Komponenten (Entscheidung in P4/P5).

## Tor
Reinraum-Build, Routentabelle identisch, Texte-/SEO-Vergleich (erwartet: einzige Abweichung `/llms.txt`), CSS-Selektoren-Diff (nur Wegfall von Klassen, die nur in gelöschten Dateien vorkamen), Pixelvergleich aller 120 Seiten in 4 Ansichten gegen P0.
