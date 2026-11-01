# Code-Stellen für P2 und P3

Stand 01.11.2026, `seo/lokal` ddc084e8. Wo Titel, Description und H1 der Seiten aus dem Plan (`plan-p2-bis-p8.md`, Abschnitte 4 und 5) im Code stehen. Gefunden per Textsuche nach dem ausgelieferten Wortlaut; Zeilen verschieben sich mit jeder Änderung, dann nach dem Wortlaut suchen.

Hinweise zur Technik:

- **Titel** gehen durch `sanitizeTitle` in `src/lib/metadata.ts`. Titel mit 45 bis 58 Zeichen und „Tezgel“ bleiben unverändert.
- **Descriptions:** Ein Eintrag zur Adresse in `src/inhalte/meta/*.ts` gewinnt immer (`src/lib/beschreibung.ts`). Wer die Description ändert, ändert den Eintrag dort; der Wert auf der Seite selbst wird dann nicht gelesen.
- **Seiten aus `src/inhalte/*.ts`** (Vorlagen der Werkstatt): `meta.titel`, `meta.beschreibung`, `worum.titel` (H1).
- **Doppelte Treffer** (zum Beispiel Titel in `layout.tsx` und `page.jsx`): Die Metadaten der Seite gehen vor die des Layouts. Beide Stellen gleich ziehen oder die wirkungslose entfernen.

| Seite | Titel | Description | H1 |
|---|---|---|---|
| `/` | `src/inhalte/start.ts:12`; Ersatzwerte in `src/app/(bestand)/_dokument.tsx` (KONTEXT.md A01) | `src/inhalte/start.ts:13` | geschützt: `src/inhalte/start.ts:19` |
| `/standorte/wetzlar` | Vorlage `src/inhalte/orte.ts` (`meta.titel`) | neuer Eintrag `'/standorte/wetzlar'` in `src/inhalte/meta/seiten.ts` (gewinnt vor `orte.ts`) | Vorlage `src/inhalte/orte.ts` (`worum.titel`) |
| `/leistungen` | `src/inhalte/leistungen.ts:13` (gilt); `src/app/(bestand)/leistungen/layout.tsx:4` wirkungslos | `src/inhalte/leistungen.ts:14` | `src/inhalte/leistungen.ts:19` |
| `/bad` | `src/inhalte/bad.ts:13` | `src/inhalte/bad.ts:15` | `src/inhalte/bad.ts:22` |
| `/bad/badsanierung` | `src/inhalte/bad-badsanierung.ts:16` | `src/inhalte/bad-badsanierung.ts:18` | geschützt: `src/inhalte/bad-badsanierung.ts:23` |
| `/bad/barrierefreies-bad` | `src/inhalte/barrierefreies-bad.ts:10` | `src/inhalte/barrierefreies-bad.ts:12` | `src/inhalte/barrierefreies-bad.ts:16` |
| `/bad/fliesen` | `src/app/(bestand)/bad/fliesen/page.jsx:28` | `src/inhalte/meta/seiten.ts:4` | `src/app/(bestand)/bad/fliesen/page.jsx:60` |
| `/bad/bad-aus-einer-hand` | `src/app/(bestand)/bad/bad-aus-einer-hand/page.jsx:28` | `src/inhalte/meta/seiten.ts:5` | `src/app/(bestand)/bad/bad-aus-einer-hand/page.jsx:59` |
| `/balkon-terrasse` | `src/inhalte/balkon-terrasse.ts:14` | `src/inhalte/balkon-terrasse.ts:16` | `src/inhalte/balkon-terrasse.ts:22` |
| `/balkon-terrasse/balkonsanierung` | `src/app/(bestand)/balkon-terrasse/balkonsanierung/page.jsx:32` | `src/inhalte/meta/bauteile.ts:11` | `page.jsx:129` |
| `/treppen` | `src/app/(bestand)/treppen/page.jsx:32` | `src/inhalte/meta/bauteile.ts:15` | `page.jsx:136` |
| `/naturstein` | `src/app/(bestand)/naturstein/page.jsx:36` | `src/inhalte/meta/leistungen.ts:11` | `page.jsx:186` |
| `/fliesenreparatur` | `src/app/(bestand)/fliesenreparatur/page.tsx:31`, `layout.tsx:14` | `src/inhalte/meta/bauteile.ts:20` | in `page.tsx` (Vorlage) |
| `/fliesen/kueche` | `src/app/(bestand)/fliesen/kueche/page.jsx:32` und Seitendaten `:91` | `src/inhalte/meta/fliesen.ts:7` | `page.jsx:96` |
| `/fliesen/fugensanierung` | `src/app/(bestand)/fliesen/fugensanierung/page.jsx:27` | `src/inhalte/meta/fliesen.ts:13` | `page.jsx:82` |
| `/fliesen/neubau` | `src/app/(bestand)/fliesen/neubau/page.jsx:34` | `src/inhalte/meta/fliesen.ts:12` | `page.jsx:121` |
| `/kontakt` | `src/inhalte/kontakt.ts:44` | `src/inhalte/kontakt.ts:46` | `src/inhalte/kontakt.ts:49` |
| `/ueber-uns` | `src/inhalte/ueber-uns.ts:18` | `src/inhalte/ueber-uns.ts:20` | `src/inhalte/ueber-uns.ts:24` |
| `/team` | `src/app/(bestand)/team/page.jsx:25` (`TITEL`) | `src/inhalte/meta/seiten.ts:16` | `page.jsx:43` |
| `/leistungen/bad`, `/wohnen`, `/aussen`, `/untergrund` | `src/app/(bestand)/leistungen/[id]/layout.jsx:11-14` (`serviceHubTitles`) | `src/inhalte/meta/leistungen.ts:4-7` | `src/app/(bestand)/leistungen/[id]/page.jsx:62-71` |
| `/beratung` | `src/app/(bestand)/beratung/layout.tsx:6` | `src/inhalte/meta/seiten.ts:13` | `src/app/(bestand)/beratung/page.jsx:81` |
| `/termin` | `src/app/(bestand)/termin/layout.tsx:7` | `src/inhalte/meta/seiten.ts:20` | `src/app/(bestand)/termin/page.jsx:79` |
| `/karriere` | `src/app/(bestand)/karriere/layout.tsx:7`, `page.jsx:90` | `src/inhalte/meta/seiten.ts:18` | `page.jsx:92` |
| `/bad/musterbaeder` | `src/app/(bestand)/bad/musterbaeder/page.jsx:22` (`TITEL`) | `src/inhalte/meta/seiten.ts:6` | Brotkrume `page.jsx:43`; H1 im Kopf der Seite |
| Musterbäder (12) | `src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx:31` (Vorlage) | `src/inhalte/meta/beispiele.ts` | in `[slug]/page.jsx` (Vorlage mit „–“) |
| `/bad/badanfrage` | `src/app/(bestand)/bad/badanfrage/page.jsx:18` | `src/inhalte/meta/leistungen.ts:8` | `page.jsx:39` |
| `/standorte` | `src/app/(bestand)/standorte/page.tsx:37` | `src/inhalte/meta/seiten.ts:9` | `page.tsx:51` |
| `/preise` | `src/app/(bestand)/preise/page.jsx:35` | neuer Eintrag `'/preise'` in `src/inhalte/meta/seiten.ts` (heute `page.jsx:37`, über 155 Zeichen und deshalb abgeschnitten) | `page.jsx:66` |
| `/faq` | `src/app/(bestand)/faq/layout.tsx:7` | `src/inhalte/meta/seiten.ts:12` | `src/app/(bestand)/faq/page.jsx:111` |
| `/referenzen` | `src/inhalte/referenzen.ts:33` | `src/inhalte/referenzen.ts:35` | `src/inhalte/referenzen.ts:42` |
| `/unternehmen` | `src/app/(bestand)/unternehmen/page.jsx:22` (`TITEL`) | `src/inhalte/meta/seiten.ts:15` | im Kopf der Seite |
| `/blog/barrierefreier-balkonaustritt` | `src/config/posts/barrierefreier-balkonaustritt.js:6` | `src/inhalte/meta/blog.ts:8` | aus dem Beitrag (`title`) |

Weitere Stellen für P2:

- Markenzusatz und Auffüllung: `src/lib/metadata.ts` (`sanitizeTitle`), Tests `test/titleLength.test.mjs`, `test/meta.test.mjs`.
- Seiten Leistung × Ort: Titel in `src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx:130-139` (S3).
- Links „Fliesenleger in Wetzlar“: `src/components/vorlagen/teile/Einsatzorte.tsx`, `src/config/navigation.js`, `src/components/kern/Einzugsband.tsx`, `src/components/momente/karte/Einsatzkarte.tsx`.
- S2 (`/standorte/asslar` per 308): `next.config.ts`, `test/wege.test.mjs`, Helfer in `src/config/cities.ts`, `src/app/sitemap.ts`, `src/lib/seo/indexnow.ts` (KONTEXT.md Abschnitt 6).
