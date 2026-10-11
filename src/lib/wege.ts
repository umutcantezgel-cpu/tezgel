// Wege alter Adressen (P4-07, V-04, Z-06). Reine Daten und eine reine Prüffunktion – genutzt von `src/proxy.ts`
// und `test/wege.test.mjs`. Die Weiterleitungen (308) stehen in `next.config.ts` (`redirects()`).
//
// 410 „dauerhaft entfernt“ für Adressen der Vorgängerfirma (Heizung, Lüftung, Energie, Gewerbe, Haustechnik), die
// nie zu Tezgel gehörten; Beleg: Seitendateien und `src/config/posts.js` / `projects.js` im Stand 757d8a9~1.
// Wer eine dieser Adressen ändert, ändert auch den `matcher` in `src/proxy.ts` (dort müssen Literale stehen).

/** Ganze Bereiche: die Adresse selbst und alles darunter. */
export const ENTFERNTE_BEREICHE = [
  '/energie',
  '/energieberatung',
  '/gewerbe',
  '/haustechnik',
  '/heizung',
  '/lueftung',
  '/notdienst',
] as const;

/** Einzelne Adressen unter Bereichen, die es weiter gibt (Blog, Referenzen). */
export const ENTFERNTE_SEITEN = [
  '/blog/waermepumpen-foerderung-2024',
  '/blog/wasserschaden-vermeiden-tipps',
  '/blog/solarthermie-vs-photovoltaik-vergleich',
  '/blog/heizungswartung-pflicht-oder-kuer',
  '/blog/smart-home-heizungssteuerung-nachruesten',
  '/blog/heizkoerper-richtig-entlueften',
  '/blog/legionellen-trinkwasser-vermeiden',
  '/blog/klimaanlage-reinigen-allergiker',
  '/blog/solarpflicht-deutschland-hausbesitzer',
  '/blog/waermepumpen-mythen-faktencheck',
  '/blog/smart-bad-wellness-hightech',
  '/blog/team-verstaerkung-gesucht-jobs',
  '/referenzen/project-001',
  '/referenzen/project-002',
  '/referenzen/project-003',
  '/referenzen/project-004',
  '/referenzen/project-005',
  '/referenzen/project-006',
] as const;

/** Genau diese Adressen (ohne abschließenden Schrägstrich, Groß-/Kleinschreibung wie gespeichert) sind entfernt. */
export function istEntfernt(pfad: string): boolean {
  if ((ENTFERNTE_SEITEN as readonly string[]).includes(pfad)) return true;
  return ENTFERNTE_BEREICHE.some((bereich) => pfad === bereich || pfad.startsWith(`${bereich}/`));
}

/**
 * Antwortseite für 410: eigenständiges, kleines Dokument ohne Skripte und ohne Stylesheet-Dateien
 * (der Proxy kennt die gebauten CSS-Namen nicht). Systemfarben und -schriften statt Markenwerten; Wortlaut nach der 404.
 */
export const SEITE_ENTFERNT = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>Seite entfernt (410) | Fliesenverlegung Tezgel</title>
<style>
body{margin:0;background:Canvas;color:CanvasText;font:1.0625rem/1.6 "Archivo","Helvetica Neue",Arial,sans-serif}
main{max-width:40rem;margin:0 auto;padding:4rem 1.25rem}
p.etikett{font:0.875rem/1.4 "IBM Plex Mono","Courier New",ui-monospace,monospace;letter-spacing:0.04em;text-transform:uppercase;margin:0}
h1{font-size:2.25rem;line-height:1.15;margin:1rem 0 1.25rem}
nav{display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:2rem}
nav a{display:inline-block;padding:0.75rem 1.25rem;border:1px solid currentColor;color:inherit;text-decoration:none}
nav a:hover{text-decoration:underline}
nav a:focus-visible{outline:2px solid currentColor;outline-offset:2px}
</style>
</head>
<body>
<main>
<p class="etikett">Fehler 410</p>
<h1>Seite dauerhaft entfernt</h1>
<p>Die von Ihnen aufgerufene Seite gibt es nicht mehr. Kehren Sie zur Startseite zurück oder informieren Sie sich über unsere Fachleistungen.</p>
<nav aria-label="Weiter">
<a href="/">Zur Startseite</a>
<a href="/leistungen">Zur Leistungsübersicht</a>
</nav>
</main>
</body>
</html>
`;
