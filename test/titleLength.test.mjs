import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generatePageMetadata } from '../src/lib/metadata.ts';
import { CITIES } from '../src/config/cities.ts';
import { SERVICES } from '../src/config/services.js';
import { leistungOrtTitel } from '../src/lib/seo/titel.ts';

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
