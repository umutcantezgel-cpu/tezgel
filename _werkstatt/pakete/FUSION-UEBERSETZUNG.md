# FUSION · Übersetzungsblatt Kern (Relaunch-Sitzung) → KERN v2 (Werkstatt)

Gilt für alle Pakete `E020-F-*`. Ziel: Abschnitte der Kern-Startseite (Vorbild, `src/components/kern/start/*`, gerendert von
`src/app/(kern)/_entwurf/start/page.tsx`) werden **im KERN-v2-System nachgebaut** – gleiche Komposition, gleiche Inhalte, aber
nur mit Klassen aus `src/app/globals.css` und unseren Bausteinen. Das Kern-CSS (`src/styles/kern.css`) ist im Seitenrahmen
`(bestand)` **nicht geladen**: Jede Klasse mit `k-` erzeugt dort nichts. Kern-Dateien werden nie geändert und nie importiert –
Ausnahme: reine Daten- und Logikmodule ohne Klassen (`@/lib/kern/start/daten`, `@/config/*`, `@/lib/formulare/*`, `@/lib/maps/*`).

Bilder des Vorbilds (Fassung A, Desktop/Handy): `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/vergleich/A/start/{d1440,m390}/NN-*.jpg`
Bilder unseres Stands (Fassung B): `…/vergleich/B/start/{d1440,m390}/`. Gutachten: `…/vergleich/gutachten.md`.

## Werte (identische Zahlen, andere Namen)
| Kern | KERN v2 |
|---|---|
| `text-k-1 … text-k-7` | `text-fs-1 … text-fs-7` (gleiche clamp-Werte) |
| `k-anzeige` | `font-anzeige` (74 %, Gewicht 760 – in Überschriften h1–h6 automatisch) |
| `k-text` | `font-text` |
| `k-mono` | `font-mono` |
| Abstand `*-k-1 / k-2 / k-3 / k-4` | `*-1 / 2 / 3 / 4` (4 / 8 / 12 / 16 px) |
| Abstand `*-k-5 / k-6 / k-7 / k-8 / k-9 / k-10` | `*-6 / 8 / 12 / 16 / 24 / 32` (24 / 32 / 48 / 64 / 96 / 128 px) |
| `size-k-3` | `size-3` · `min-h-k-7` → `min-h-12` (48 px; Touch-Ziel mindestens `min-h-11`) |
| Farben `k-kalk, k-fliese, k-fuge, k-strich, k-tinte, k-tinte-2, k-laser, k-laser-tief, k-abnahme, k-nacht-2, k-nacht-fuge` | ohne `k-`: `kalk, fliese, fuge, strich, tinte, tinte-2, laser, laser-tief, abnahme, nacht-2, nacht-fuge` |
| `max-w-(--k-seite) px-(--k-rand)` mit `mx-auto` | `seitenKlassen` aus `@/components/kern/stile` (= `mx-auto w-full max-w-seite px-4 md:px-8 lg:px-12`) |
| `max-w-(--k-mass)` | `max-w-mass` |
| `rounded-k-0` / `rounded-k-1` | `rounded-none` / `rounded-r1` |
| `h-(--k-linie-2)` / `w-(--k-linie-2)` | `h-0.5` / `w-0.5` |
| `py-k-9 lg:py-k-10` (Abschnitt) | `py-24 lg:py-32` – oder den Baustein `Abschnitt` nutzen (siehe unten) |

Freie Werte (`[…]`) und Tailwind-Standardfarben sind verboten (Prüfwerkzeug `werte.mjs`). Rundungen nur `rounded-none`/`rounded-r1`.

## Bausteine (statt der Kern-Bausteine)
| Kern | KERN v2 |
|---|---|
| `basis/Etikett` | `<span className={etikettKlassen}>` (`@/components/kern/stile`); mit Kreuz: `<Fugenkreuz className="size-3 text-strich" />` davor; Ton „tinte“: `etikettForm` + `text-tinte` |
| `basis/Zeichen` `Fugenkreuz` | `@/components/kern/Fugenkreuz` (default export) |
| `basis/Knopf` (`art`, `vorne`, `hinten`) | `@/components/kern/Knopf` (`variante` haupt/neben/text/hell, `icon` rechts, `iconLinks` links, `extern`) – Element trägt `data-motion="druck"` selbst |
| `basis/Feldraster` + `Rasterfeld` (12er-Raster mit Fugen) | eigenes Raster: `grid grid-cols-4 gap-px border border-fuge bg-fuge md:grid-cols-8 lg:grid-cols-12`, Felder `bg-fliese` (oder `bg-kalk`) mit `col-span-*`/`md:col-span-*`/`lg:col-span-*` (wörtliche Klassen) – oder `Feldraster`/`Feld` aus `@/components/kern/Feldraster` |
| `basis/klassen` `verbinde` / `fokus()` | `clsx` / nichts (Fokus regelt `globals.css` global) |
| `icons/Icon` (Namen `pfeil`, `stern-voll`, `whatsapp` …, `groesse` 16/20/24) | `@/components/icons/Icon` (Namen siehe `src/components/icons/namen.ts`, z. B. `pfeil-rechts`, `stern`, `telefon`, `haken`, `ort`, `kalender`; `groesse` 4/5/6 = 16/20/24 px). WhatsApp-Markenzeichen: `@/components/ui/WhatsAppLogo` |
| Abschnittskopf (Etikett + h2 + Einleitung) | `@/components/kern/Abschnitt` (`id`, `titelId`, `etikett`, `titel`, `einleitung`, `flaeche` kalk/fliese, `kopf` gestapelt/seitlich) – oder gleichwertig von Hand |

## Bewegung (Register K-007)
Nur die Kennungen unseres Registers (`src/app/bewegung.css`): `auftritt` (Eintritt beim Scrollen; Staffel über `style={{'--staffel-nr': n}}` nur wenn unser CSS das kennt – sonst ohne Staffel), `anriss`, `druck` (Knöpfe), `zustand` (Links/Zeilen mit Farbwechsel), `sig-plan`. Kein `data-ausloeser`, kein `data-sichtbar`, kein `--k-staffel-nr`. Jedes Element mit `transition-*` trägt eine Register-Kennung (`zustand` für Farbwechsel), sonst meldet das Werkzeug eine Lücke.

## Unverhandelbar
- **Wortlaut** aller Überschriften, Texte, Links, Knöpfe wie im Bestand (`src/app/(bestand)/page.tsx`) bzw. wie im Vorbild, wo es denselben Bestandstext nutzt. Nichts erfinden, nichts umformulieren.
- **Anker und IDs** wie heute auf `/`: `#vertrauen`, `#portal-netzwerk`/`portal-heading`, `#kosten-rechner`/`rechner-heading`, `#leistungen`/`leistungen-heading`, `#ablauf`/`ablauf-heading`, `spotlight-heading`, `bewertungen-heading`, `#servicegebiet`/`map-heading`, `#faq`/`home-faq-heading`, `#express-anfrage`/`anfrage-heading`.
- **Keine generierten Fotos** (Leitplanke, M-19): Wo das Vorbild ein Foto zeigt, steht eine gezeichnete Darstellung (`@/components/kern/Verlegeplan`).
- Je Bildschirmhöhe **höchstens ein rotes Element** (Laser).
- Serverkomponenten, wo kein Zustand nötig ist; Client-Inseln nur, wo das Vorbild Zustand hat.
- Nur die Dateien deines Pakets anlegen/ändern. Keine Tests, keine gemeinsamen Dateien (`globals.css`, Layouts, `page.tsx`, `next.config.ts`, `package.json`, `src/config/*`), kein Commit, kein Build, kein Server.

## Prüfen (Pflicht, im Probe-Worktree)
```
P=/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/merge-probe
cd $P && flock /tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/tsc.lock npx tsc --noEmit -p .   # 0 Fehler
cd $P && npx eslint <deine Dateien>                                                                                                 # 0 Fehler
grep -n "k-" <deine Dateien>     # darf keine Kern-Klasse mehr zeigen (Ausnahme: Wörter wie „Rück-“ in Texten)
```
Rückgabe: angelegte/geänderte Dateien, exportierte Komponenten mit Props, offene Punkte, Prüfergebnisse wörtlich.
