import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generatePageMetadata } from '../src/lib/metadata.ts';
import { CITIES } from '../src/config/cities.ts';
import { SERVICES } from '../src/config/services.js';
import { leistungOrtTitel } from '../src/lib/seo/titel.ts';
import { DESCRIPTION_PX_HOECHSTENS, TITEL_PX_HOECHSTENS, beschreibungBreite, pixelbreite, titelBreite } from '../src/lib/seo/pixelbreite.ts';
import { TEILENBILDER } from '../src/lib/seo/teilenbild.ts';
import { SITE_URL } from '../src/lib/schema.ts';
import { RATING_SUMMARY, REVIEWS } from '../src/config/reviews.js';
import { GALERIE } from '../src/components/momente/galerie-filter/daten.ts';

const TEILEN_URLS = new Set(TEILENBILDER.map((b) => `${SITE_URL}${b.pfad}`));

test('1. Title Budget: Long raw titles are strictly clamped to <= 58 chars (SERP Budget)', () => {
  const meta = generatePageMetadata({
    title: 'Exklusive Fliesenverlegung und barrierefreie Badsanierung vom Meisterbetrieb in ganz Mittelhessen und Aßlar',
    description: 'Hochwertige Fliesenverlegung in Aßlar und Wetzlar.',
    path: '/test-long-title',
  });

  const titleStr = typeof meta.title === 'object' && meta.title && 'absolute' in meta.title
    ? String(meta.title.absolute)
    : String(meta.title);

  assert.ok(titleStr.length <= 58, `Title length ${titleStr.length} must be <= 58 chars: "${titleStr}"`);
});

test('2. Title Budget: City Landing Page titles satisfy 58-char budget', () => {
  for (const city of CITIES) {
    const meta = generatePageMetadata({
      title: `Fliesenverlegung & Badsanierung in ${city.name} | Fliesenverlegung Tezgel`,
      description: `Fachbetrieb für Fliesenverlegung und Badsanierung in ${city.name}.`,
      path: `/standorte/${city.slug}`,
    });

    const titleStr = typeof meta.title === 'object' && meta.title && 'absolute' in meta.title
      ? String(meta.title.absolute)
      : String(meta.title);

    assert.ok(
      titleStr.length <= 58,
      `City ${city.name} title "${titleStr}" (${titleStr.length} chars) exceeds 58-char budget!`
    );
  }
});

test('3. Title Budget: Service x City matrix titles satisfy 58-char budget', () => {
  for (const service of SERVICES) {
    for (const city of CITIES.slice(0, 5)) {
      const meta = generatePageMetadata({
        title: `${service.name} in ${city.name} | Fliesenverlegung Tezgel`,
        description: `${service.shortDescription} in ${city.name}.`,
        path: `/leistungen/${service.id}/${city.slug}`,
      });

      const titleStr = typeof meta.title === 'object' && meta.title && 'absolute' in meta.title
        ? String(meta.title.absolute)
        : String(meta.title);

      assert.ok(
        titleStr.length <= 58,
        `Service ${service.id} x ${city.name} title "${titleStr}" (${titleStr.length} chars) exceeds 58-char budget!`
      );
    }
  }
});

test('4. Legal Routes: index: false, follow: true is correctly configured', () => {
  const meta = generatePageMetadata({
    title: 'Impressum | Fliesenverlegung Tezgel',
    description: 'Impressum und rechtliche Anbieterkennzeichnung.',
    path: '/impressum',
    robots: { index: false, follow: true },
  });

  assert.equal(meta.robots?.index, false);
  assert.equal(meta.robots?.follow, true);
});

test('5. Markenzusatz (SEO-Runde T10): Auffüllung nur mit „| Fliesenverlegung Tezgel“ oder „· Tezgel“, nichts erfunden', () => {
  const titel = (t) => {
    const m = generatePageMetadata({ title: t, description: 'x', path: '/gibt-es-nicht' });
    return typeof m.title === 'object' && m.title && 'absolute' in m.title ? String(m.title.absolute) : String(m.title);
  };
  assert.equal(titel('Sind Fliesen gut für Allergiker?'), 'Sind Fliesen gut für Allergiker? | Fliesenverlegung Tezgel');
  assert.equal(titel('Fliesen auf Fußbodenheizung verlegen'), 'Fliesen auf Fußbodenheizung verlegen · Tezgel');
  assert.equal(titel('Impressum'), 'Impressum | Fliesenverlegung Tezgel');
  // bewusst gesetzte Titel mit Marke und 45 bis 58 Zeichen bleiben, wie sie sind
  assert.equal(titel('Großformatfliesen verlegen | Fliesenverlegung Tezgel'), 'Großformatfliesen verlegen | Fliesenverlegung Tezgel');
  const woerter = 'Fliesen Bad Dusche Treppe Balkon Terrasse verlegen sanieren abdichten Naturstein Fugen Küche Flur Wohnraum Neubau'.split(' ');
  for (let n = 1; n <= 9; n += 1) {
    const t = titel(woerter.slice(0, n).join(' '));
    assert.ok(t.length <= 58, `${t} (${t.length})`);
    assert.doesNotMatch(t, /Fachbetrieb Tezgel|Fliesen Tezgel|Hessen|[–—]/, t);
    if (/Tezgel/.test(t)) assert.match(t, /( \| Fliesenverlegung Tezgel| · Tezgel)$/, t);
  }
});

const absoluterTitel = (m) => (typeof m.title === 'object' && m.title && 'absolute' in m.title ? String(m.title.absolute) : String(m.title));

test('7. Leistung × Ort (SEO-Runde): alle Leistungen in allen Orten mit Titel von 45 bis 58 Zeichen und „Tezgel“', () => {
  for (const service of SERVICES) {
    for (const city of CITIES) {
      const titel = absoluterTitel(generatePageMetadata({ title: leistungOrtTitel(service, city), description: 'x', path: `/leistungen/${service.id}/${city.slug}` }));
      assert.ok(titel.length >= 45 && titel.length <= 58 && titel.includes('Tezgel'), `${service.id} × ${city.slug}: „${titel}“ (${titel.length})`);
    }
  }
});

// SEO-Runde (Gesamtprobe, docs/seo/arbeit/plan-p2-bis-p8.md, Abschnitt 7): Die Hausregeln gelten für jede gebaute Seite,
// auch für Seiten mit noindex. Ausgenommen ist nur die interne Fehlerseite von Next (/_global-error, ohne eigene Adresse).
// Der Test prüft nur einen Bau, der jünger ist als die Quellen; sonst läuft er beim nächsten npm test nach npm run build.
// Gezählt werden auch Ordner (gelöschte oder umbenannte Dateien); lstat, damit ein kaputter Link den Lauf nicht abbricht.
const WURZEL = fileURLToPath(new URL('..', import.meta.url));
const APP = path.join(WURZEL, '.next/server/app');
function neuesteAenderung(ordner) {
  let neueste = fs.lstatSync(ordner).mtimeMs;
  for (const eintrag of fs.readdirSync(ordner, { withFileTypes: true })) {
    const voll = path.join(ordner, eintrag.name);
    neueste = Math.max(neueste, eintrag.isDirectory() ? neuesteAenderung(voll) : fs.lstatSync(voll).mtimeMs);
  }
  return neueste;
}
const BAU_ID = path.join(WURZEL, '.next/BUILD_ID');
function bauZustand() {
  try {
    if (!fs.existsSync(path.join(APP, 'index.html')) || !fs.existsSync(BAU_ID)) return 'kein Produktionsbau (.next/server/app/index.html fehlt)';
    const quellen = Math.max(neuesteAenderung(path.join(WURZEL, 'src')), fs.lstatSync(path.join(WURZEL, 'next.config.ts')).mtimeMs);
    return fs.lstatSync(BAU_ID).mtimeMs >= quellen ? false : 'Produktionsbau älter als src/ (nach npm run build erneut npm test)';
  } catch (fehler) {
    return `Alter des Baus nicht feststellbar (${fehler.code ?? fehler.message})`;
  }
}
const ENTITAETEN = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
const entschluesseln = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
  return ENTITAETEN[e.toLowerCase()] ?? m;
});
function htmlDateien(ordner) {
  const liste = [];
  for (const eintrag of fs.readdirSync(ordner, { withFileTypes: true })) {
    const voll = path.join(ordner, eintrag.name);
    if (eintrag.isDirectory()) liste.push(...htmlDateien(voll));
    else if (eintrag.name.endsWith('.html')) liste.push(voll);
  }
  return liste;
}

test('6. Gebaute Seiten: Titel 45 bis 58 mit „Tezgel“, Descriptions 120 bis 155 ohne &, ! und …, kein Gedankenstrich, eine H1, Alt-Texte bis 125 Zeichen', {
  skip: bauZustand(),
}, () => {
  const STRICH = /[–—]|\s-\s/;
  const fehler = [];
  let seiten = 0;
  for (const datei of htmlDateien(APP)) {
    const seite = '/' + path.relative(APP, datei).split(path.sep).join('/').replace(/\.html$/, '').replace(/^index$/, '');
    if (seite === '/_global-error') continue;
    seiten += 1;
    const html = fs.readFileSync(datei, 'utf8');
    const titel = entschluesseln(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '').trim();
    const roh = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const beschreibung = roh === undefined ? null : entschluesseln(roh);
    if (titel.length < 45 || titel.length > 58 || !titel.includes('Tezgel') || STRICH.test(titel)) fehler.push(`${seite}: Titel „${titel}“ (${titel.length})`);
    if (beschreibung === null) fehler.push(`${seite}: Description fehlt`);
    else if (beschreibung.length < 120 || beschreibung.length > 155 || /[&!…]|\.\.\./.test(beschreibung) || STRICH.test(beschreibung)) {
      fehler.push(`${seite}: Description „${beschreibung}“ (${beschreibung.length})`);
    }
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1 !== 1) fehler.push(`${seite}: ${h1} H1`);
    for (const [, alt] of html.matchAll(/<img[^>]*?\salt="([^"]*)"/g)) {
      const text = entschluesseln(alt);
      if (text.length > 125 || STRICH.test(text)) fehler.push(`${seite}: Alt-Text „${text}“ (${text.length})`);
    }
  }
  assert.ok(seiten > 100, `nur ${seiten} gebaute Seiten gefunden`);
  assert.deepEqual(fehler, []);
});

// SEO-Runde T08 (03.11.2026, docs/seo/KONTEXT.md Abschnitt 13): Jede indexierbare Seite teilt ein echtes Foto 1200 × 630 mit
// Maßen und Alt-Text (src/lib/seo/teilenbild.ts) statt des Logos.
const seitenpfad = (datei) => '/' + path.relative(APP, datei).split(path.sep).join('/').replace(/\.html$/, '').replace(/^index$/, '');
const noindex = (html) => /noindex/.test(html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '');
test('8. Indexierbare Seiten: echtes Teilen-Bild 1200 × 630 mit Alt-Text', {
  skip: bauZustand(),
}, () => {
  const fehler = [];
  let indexierbar = 0;
  for (const datei of htmlDateien(APP)) {
    const seite = seitenpfad(datei);
    if (seite === '/_global-error') continue;
    const html = fs.readFileSync(datei, 'utf8');
    // Seiten mit noindex (Rechtstexte, Login, Fehlerseite) erscheinen nicht im Suchergebnis
    if (noindex(html)) continue;
    indexierbar += 1;
    const og = (feld) => entschluesseln(html.match(new RegExp(`<meta property="og:${feld}" content="([^"]*)"`))?.[1] ?? '');
    if (!TEILEN_URLS.has(og('image')) || og('image:width') !== '1200' || og('image:height') !== '630' || og('image:alt').length < 20) {
      fehler.push(`${seite}: Teilen-Bild „${og('image')}“ ${og('image:width')} × ${og('image:height')}`);
    }
  }
  assert.ok(indexierbar > 100, `nur ${indexierbar} indexierbare Seiten gefunden`);
  assert.deepEqual(fehler, []);
});

// Snippet-Runde (03.11.2026, docs/seo/KONTEXT.md Abschnitt 10): Google kürzt nach Breite. Die Seiten der Runde bleiben unter
// 561 px im Titel und 985 px in der Description (src/lib/seo/pixelbreite.ts), nutzen den Platz (Titel 50 bis 58 Zeichen,
// Description 140 bis 155 Zeichen) und tragen den Markenzusatz in einer der zwei Formen (T10). Die Liste wächst mit der
// Runde, bis sie alle indexierbaren Seiten umfasst; zuerst die 26 Kernseiten (Live 4).
const SNIPPET_SEITEN = new Set([
  '/', '/standorte', '/standorte/wetzlar', '/standorte/asslar', '/kontakt', '/termin', '/preise', '/referenzen', '/leistungen',
  '/leistungen/bad', '/leistungen/wohnen', '/leistungen/aussen', '/leistungen/untergrund', '/ueber-uns', '/unternehmen', '/team',
  '/beratung', '/faq', '/foerderung', '/ausstellung/wetzlar', '/ausstellung/giessen', '/karriere', '/karriere/ausbildung',
  '/downloads', '/partner', '/barrierefreiheit',
]);
test('8b. Seiten der Snippet-Runde: Titel bis 561 px und ab 50 Zeichen, Description bis 985 px und ab 140 Zeichen, Markenzusatz', {
  skip: bauZustand(),
}, () => {
  const fehler = [];
  const gefunden = new Set();
  for (const datei of htmlDateien(APP)) {
    const seite = seitenpfad(datei);
    if (!SNIPPET_SEITEN.has(seite)) continue;
    gefunden.add(seite);
    const html = fs.readFileSync(datei, 'utf8');
    const titel = entschluesseln(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '').trim();
    const roh = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const beschreibung = roh === undefined ? '' : entschluesseln(roh);
    if (noindex(html)) fehler.push(`${seite}: noindex`);
    if (titelBreite(titel) > TITEL_PX_HOECHSTENS) fehler.push(`${seite}: Titel ${titelBreite(titel)} px „${titel}“`);
    if (beschreibungBreite(beschreibung) > DESCRIPTION_PX_HOECHSTENS) fehler.push(`${seite}: Description ${beschreibungBreite(beschreibung)} px „${beschreibung}“`);
    if (titel.length < 50) fehler.push(`${seite}: Titel mit ${titel.length} Zeichen „${titel}“`);
    if (beschreibung.length < 140) fehler.push(`${seite}: Description mit ${beschreibung.length} Zeichen „${beschreibung}“`);
    if (!/ \| Fliesenverlegung Tezgel$| · Tezgel$/.test(titel)) fehler.push(`${seite}: Markenzusatz „${titel}“`);
  }
  assert.deepEqual([...SNIPPET_SEITEN].filter((s) => !gefunden.has(s)), [], 'Seiten fehlen im Bau');
  assert.deepEqual(fehler, []);
});

// Snippet-Runde: Zahlen im Suchergebnis folgen ihrer Quelle. Die Bewertung pflegt src/config/reviews.js von Hand (Freigabe
// nötig), Stimmen und Fotos zählt die Seite selbst. Ändert sich eine Quelle, fällt dieser Test, bis Titel und Description
// nachgezogen sind; so zeigt das Suchergebnis nie eine andere Zahl als die Seite.
test('8c. Gebaute Seiten: Bewertung, Zahl der Stimmen und der Fotos in Titel und Description wie in ihrer Quelle', {
  skip: bauZustand(),
}, () => {
  const g = RATING_SUMMARY.google;
  const fehler = [];
  let mitBewertung = 0;
  for (const datei of htmlDateien(APP)) {
    const seite = seitenpfad(datei);
    const html = fs.readFileSync(datei, 'utf8');
    const titel = entschluesseln(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '').trim();
    const og = entschluesseln(html.match(/<meta property="og:description" content="([^"]*)"/)?.[1] ?? '');
    const beschreibung = entschluesseln(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
    for (const [feld, text] of [['Titel', titel], ['Description', beschreibung], ['og:description', og]]) {
      for (const m of text.matchAll(/(\d,\d)(?: von (\d+))?(?= Sternen| bei Google)/g)) {
        mitBewertung += 1;
        if (m[1] !== g.displayRating || (m[2] !== undefined && Number(m[2]) !== g.maxRating)) fehler.push(`${seite} ${feld}: „${m[0]}“ statt ${g.displayRating} von ${g.maxRating}`);
      }
      for (const m of text.matchAll(/(\d+) Stimmen/g)) {
        if (Number(m[1]) !== REVIEWS.length) fehler.push(`${seite} ${feld}: ${m[1]} Stimmen statt ${REVIEWS.length}`);
      }
      if (seite === '/referenzen') {
        for (const m of text.matchAll(/(\d+) Fotos/g)) {
          if (Number(m[1]) !== GALERIE.length) fehler.push(`${seite} ${feld}: ${m[1]} Fotos statt ${GALERIE.length}`);
        }
      }
    }
  }
  assert.ok(mitBewertung > 0, 'keine Bewertung im Suchergebnis gefunden, Muster prüfen');
  assert.deepEqual(fehler, []);
});

test('9. Pixelbreite: Arial-Maße wie im Suchergebnis (Stichproben)', () => {
  // Werte aus den Zeichenbreiten von Liberation Sans (2048 Einheiten je Geviert), von Hand nachgerechnet
  assert.equal(pixelbreite('M', 20), 16.7);
  assert.equal(pixelbreite('i', 20), 4.4);
  assert.equal(pixelbreite('Aßlar', 20), 47.8);
  assert.equal(titelBreite('Fliesenleger Wetzlar und Aßlar | Fliesenverlegung Tezgel'), 508.8);
  assert.ok(pixelbreite('☃', 20) === pixelbreite('M', 20), 'unbekannte Zeichen zählen wie „M“');
});
