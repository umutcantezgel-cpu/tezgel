import assert from 'node:assert';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/** Datei lesen, Zeilenenden vereinheitlicht (CRLF wie LF) */
const lies = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

console.log('🔍 [QA] Starting JSON-LD Knowledge Graph & Schema Verification...');

// 1. Static Verification of Schema Source
const schemaPath = join(process.cwd(), 'src/lib/schema.ts');
const pyramidPath = join(process.cwd(), 'src/lib/schemaPyramid.ts');
const siteConfigPath = join(process.cwd(), 'src/shared/config/site.ts');

assert(existsSync(schemaPath), 'src/lib/schema.ts must exist');
assert(existsSync(pyramidPath), 'src/lib/schemaPyramid.ts must exist');
assert(existsSync(siteConfigPath), 'src/shared/config/site.ts must exist');

const schemaContent = lies(schemaPath);
const pyramidContent = lies(pyramidPath);
const siteContent = lies(siteConfigPath);

// Test 1: Verification of Country Wikidata Q183 Node
console.log('  ✓ Verifying Germany Country node (Wikidata Q183)...');
assert(schemaContent.includes('Q183'), 'Country node must link to Wikidata Q183');
assert(schemaContent.includes('PLACE_DE_ID'), 'PLACE_DE_ID constant must be declared');

// Alle Quelldateien unter src/ (für die Prüfungen, die nicht nur schema.ts betreffen)
function quelldateien(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...quelldateien(p));
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(name)) out.push(p);
  }
  return out;
}
const srcDateien = quelldateien(join(process.cwd(), 'src')).map((p) => ({
  pfad: relative(process.cwd(), p).split(sep).join('/'),
  inhalt: lies(p),
}));

/** Werte aller `'@type'`-Angaben einer Datei (einzeln oder als Liste), damit Kommentare und Texte nicht zählen */
function typen(inhalt) {
  const out = [];
  for (const m of inhalt.matchAll(/["']@type["']\s*:\s*(\[[^\]]*\]|["'][^"']*["'])/g)) {
    for (const w of m[1].matchAll(/["']([^"']+)["']/g)) out.push(w[1]);
  }
  return out;
}

/** LocalBusiness und Untertypen, die für einen Fliesenbetrieb in Frage kommen (schema.org) */
const BETRIEBSTYPEN = new Set([
  'LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor', 'HousePainter', 'Plumber', 'Electrician',
  'RoofingContractor', 'HVACBusiness', 'Locksmith', 'MovingCompany', 'ProfessionalService', 'Store', 'HomeGoodsStore',
]);
const BEWERTUNGSTYPEN = new Set(['Product', 'AggregateRating', 'Review']);

// Test 2: Keine Bewertungssterne in den strukturierten Daten (SEO-Runde T02, docs/seo/KONTEXT.md Abschnitt 5).
// Beleg: Google Search Central, Richtlinien für Rezensions-Snippets
// (https://developers.google.com/search/docs/appearance/structured-data/review-snippet): Bewertungen nicht von anderen
// Websites übernehmen; Seiten mit LocalBusiness oder Organization sind für Sterne nicht zugelassen, wenn der Betrieb die
// Bewertungen über sich selbst einbindet. Bis 01.11.2026 stand ein `Product` mit den von Google übernommenen Sternen und
// drei Rezensionen auf jeder Seite. Diese Prüfung verlangte früher genau diesen Knoten; jetzt verlangt sie sein Fehlen.
console.log('  ✓ Verifying no review stars in structured data (T02)...');
for (const { pfad, inhalt } of srcDateien) {
  const verboten = typen(inhalt).filter((x) => BEWERTUNGSTYPEN.has(x));
  assert.deepStrictEqual(verboten, [], `${pfad}: Typ ${verboten.join(', ')} darf in den strukturierten Daten nicht mehr vorkommen (T02)`);
  assert(!/["']?\baggregateRating["']?\s*:/.test(inhalt), `${pfad}: Eigenschaft aggregateRating darf nicht mehr vorkommen (T02)`);
  assert(!/buildMainProductOfferNode|MAIN_SERVICE_PACKAGE_ID/.test(inhalt), `${pfad}: alter Product-Baustein (T02)`);
}
// `review:` ist in Komponenten ein gewöhnlicher Prop-Name; in den Schema-Bausteinen darf die Eigenschaft nicht stehen
for (const [pfad, inhalt] of [['src/lib/schema.ts', schemaContent], ['src/lib/schemaPyramid.ts', pyramidContent]]) {
  assert(!/["']?\breview["']?\s*:/.test(inhalt), `${pfad}: Eigenschaft review darf in den strukturierten Daten nicht mehr vorkommen (T02)`);
}
// T09: kein Ablaufdatum für Preise in den Bausteinen (lief am 31.12.2026 ab)
assert(!/priceValidUntil/.test(schemaContent), 'src/lib/schema.ts: priceValidUntil entfällt (T09)');
assert(!/priceValidUntil/.test(pyramidContent), 'src/lib/schemaPyramid.ts: priceValidUntil entfällt (T09)');

// Ensure Organization does not directly declare aggregateRating in root definition
const orgBlockMatch = schemaContent.match(/buildOrganizationNode[\s\S]*?return\s*\{[\s\S]*?\};/);
if (orgBlockMatch) {
  assert(!orgBlockMatch[0].includes('aggregateRating'), 'CRITICAL: aggregateRating must NOT be on Organization node!');
}

// Test 3: Genau ein Betrieb, keine vorgetäuschten Filialen (SEO-Runde T04, docs/seo/KONTEXT.md Abschnitt 5).
// Beleg: Google-Doku zu strukturierten Daten für lokale Unternehmen
// (https://developers.google.com/search/docs/appearance/structured-data/local-business), Typdefinition: „Define each local
// business location as a LocalBusiness type“, address = „The physical location of the business“. Bis 01.11.2026 meldete jede Ortsseite ein zweites LocalBusiness „Fliesenverlegung Tezgel – <Ort>“ mit der
// Aßlarer Anschrift. Die Ortsseite beschreibt jetzt die Leistung für den Ort als Service mit provider auf den einen Betrieb
// und areaServed auf den Ort. Früher prüfte diese Stelle „Hohwardstraße 14“ in schemaPyramid.ts; das traf nur einen
// Kommentar. Die echte Anschrift steht im einen LocalBusiness in schema.ts und wird dort geprüft.
console.log('  ✓ Verifying single LocalBusiness and city pages as Service (T04)...');
assert(pyramidContent.includes('getCityLandingPageSchema'), 'getCityLandingPageSchema must be exported');
assert(/'@type':\s*(\[\s*)?'Service'/.test(pyramidContent), 'Ortsseite: Leistung als Service');
// provider und areaServed als Eigenschaften genau des Service-Knotens der Ortsseite (je eine Zeile, keine zweite Angabe)
const dienstBlock = pyramidContent.match(/const serviceNode[\s\S]*?\n  };/)?.[0];
assert(dienstBlock, 'Ortsseite: Service-Knoten (const serviceNode) in schemaPyramid.ts');
const zeilenMit = (feld) => (dienstBlock.match(new RegExp(`^\\s*${feld}:.*$`, 'gm')) || []).map((z) => z.trim());
assert.deepStrictEqual(zeilenMit('provider'), ["provider: { '@id': LOCAL_BUSINESS_ID },"], 'Ortsseite: Service mit provider auf LOCAL_BUSINESS_ID');
assert.deepStrictEqual(zeilenMit('areaServed'), ["areaServed: { '@id': cityId },"], 'Ortsseite: Service mit areaServed auf den City-Knoten der Seite');
const mitBetriebsTyp = srcDateien.filter(({ inhalt }) => typen(inhalt).some((x) => BETRIEBSTYPEN.has(x))).map(({ pfad }) => pfad);
assert.deepStrictEqual(mitBetriebsTyp, ['src/lib/schema.ts'], `LocalBusiness nur in src/lib/schema.ts, gefunden: ${mitBetriebsTyp.join(', ')}`);
const betriebsKnoten = [...schemaContent.matchAll(/["']@type["']\s*:\s*(\[[^\]]*\]|["'][^"']*["'])/g)]
  .filter((m) => [...m[1].matchAll(/["']([^"']+)["']/g)].some((w) => BETRIEBSTYPEN.has(w[1])));
assert.strictEqual(betriebsKnoten.length, 1, 'genau ein LocalBusiness-Knoten in src/lib/schema.ts');
// Den Baustein des Betriebs ruft nur der Wurzelgraph in schema.ts auf (sonst entstünde eine Filiale per Spread)
const mitBausteinAufruf = srcDateien.filter(({ inhalt }) => /buildLocalBusinessNode\s*\(/.test(inhalt)).map(({ pfad }) => pfad);
assert.deepStrictEqual(mitBausteinAufruf, ['src/lib/schema.ts'], `buildLocalBusinessNode nur in src/lib/schema.ts, gefunden: ${mitBausteinAufruf.join(', ')}`);
assert.strictEqual((schemaContent.match(/buildLocalBusinessNode\s*\(/g) || []).length, 2, 'buildLocalBusinessNode: eine Definition, ein Aufruf im Wurzelgraph');
const lbBlock = schemaContent.match(/export function buildLocalBusinessNode[\s\S]*?\n}\n/);
assert(lbBlock, 'buildLocalBusinessNode must exist');
assert(lbBlock[0].includes('LOCAL_BUSINESS_ID'), 'LocalBusiness trägt LOCAL_BUSINESS_ID');
assert(lbBlock[0].includes('Hohwardstraße 14'), 'LocalBusiness trägt die echte Anschrift in Aßlar (Hohwardstraße 14)');

// Test 5: Wikidata-Kennungen der Orte und Kreise (SEO-Runde T03, docs/seo/KONTEXT.md Abschnitt 5).
// Beleg: Abfrage der Wikidata-API (wbgetentities) am 01.11.2026, je Kennung Bezeichnung, Beschreibung und Postleitzahl
// geprüft. Vorher zeigten unter anderem Hessen auf Q1198 (Nordrhein-Westfalen), Aßlar auf Q547844 (eine Rakete) und
// Gießen auf Q3870 (Nairobi).
console.log('  ✓ Verifying Wikidata IDs of places (T03)...');
const wikidataSoll = {
  Hessen: 'Q1199', 'Lahn-Dill-Kreis': 'Q7905', 'Aßlar': 'Q558494', Wetzlar: 'Q4178', Herborn: 'Q18998',
  Dillenburg: 'Q517381', Haiger: 'Q516448', Braunfels: 'Q525612', Solms: 'Q566156', 'Landkreis Gießen': 'Q7904',
  'Gießen': 'Q3874', 'Landkreis Marburg-Biedenkopf': 'Q7902', Marburg: 'Q3869', 'Landkreis Limburg-Weilburg': 'Q7906',
  'Limburg an der Lahn': 'Q16026', Wetteraukreis: 'Q7910', 'Bad Nauheim': 'Q16105', 'Friedberg (Hessen)': 'Q516485',
  Butzbach: 'Q569680',
};
const wikidataIst = {};
for (const m of pyramidContent.matchAll(/name:\s*'([^']+)',\s*\n\s*slug:\s*'[^']+',[^{}]*?wikidataId:\s*'(Q\d+)'/g)) {
  assert(!(m[1] in wikidataIst), `HESSEN_GEO_HIERARCHY: ${m[1]} steht doppelt`);
  wikidataIst[m[1]] = m[2];
}
assert.deepStrictEqual(wikidataIst, wikidataSoll, 'Wikidata-Kennungen in HESSEN_GEO_HIERARCHY');
// die falschen Kennungen vor dem 01.11.2026 (Abschnitt 13 von docs/seo/KONTEXT.md) dürfen nirgends mehr stehen
const wikidataAlt = ['Q1198', 'Q547844', 'Q4161', 'Q516801', 'Q516804', 'Q516808', 'Q516812', 'Q516816', 'Q7901', 'Q3870',
  'Q7898', 'Q3935', 'Q6856', 'Q487053', 'Q490204', 'Q490208'];
for (const q of wikidataAlt) assert(!new RegExp(`'${q}'|/${q}'`).test(pyramidContent), `alte, falsche Wikidata-Kennung ${q}`);
assert(!pyramidContent.includes('Q1198'), 'Q1198 ist Nordrhein-Westfalen, nicht Hessen');
assert(pyramidContent.includes("sameAs: 'https://www.wikidata.org/wiki/Q1199'"), 'Ortsseite: Hessen verweist auf Q1199');

// Test 4: Verification of Master Site Configuration
console.log('  ✓ Verifying master entity site-config constants...');
assert(siteContent.includes('35614'), 'HQ postal code must be 35614');
assert(siteContent.includes('Aßlar'), 'HQ locality must be Aßlar');
assert(siteContent.includes('Deniz Tezgel'), 'Founder must be Deniz Tezgel');

// Test 6: die ausgelieferten Seiten im Produktionsbau (SEO-Runde P1, Gegenprüfung): Die Prüfungen oben lesen den Quelltext;
// diese liest das JSON-LD, das wirklich ausgeliefert wird. Läuft, wenn ein Bau vorliegt (Prüfkette: npm run build vor
// npm run qa:graph); ohne Bau meldet sie das ausdrücklich.
const appWurzel = join(process.cwd(), '.next/server/app');
if (!existsSync(join(appWurzel, 'index.html'))) {
  console.log('  ⚠ Kein Produktionsbau (.next/server/app/index.html fehlt): Prüfung der ausgelieferten Seiten übersprungen. Zuerst npm run build.');
} else {
  console.log('  ✓ Verifying delivered JSON-LD in the production build...');
  const htmlDateien = (function alle(dir) {
    const out = [];
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) out.push(...alle(p));
      else if (name.endsWith('.html')) out.push(p);
    }
    return out;
  })(appWurzel);
  let seiten = 0;
  let ortsseiten = 0;
  for (const datei of htmlDateien) {
    const pfad = '/' + relative(appWurzel, datei).split(sep).join('/').replace(/\.html$/, '').replace(/^index$/, '');
    const html = lies(datei);
    const knoten = [];
    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      const j = JSON.parse(m[1]);
      knoten.push(...(j['@graph'] || [j]));
    }
    if (!knoten.length) continue;
    seiten++;
    const ids = new Map();
    const verweise = [];
    const lauf = (o) => {
      if (Array.isArray(o)) return o.forEach(lauf);
      if (!o || typeof o !== 'object') return;
      const keys = Object.keys(o);
      if (keys.length === 1 && keys[0] === '@id') verweise.push(o['@id']);
      else if (o['@id']) ids.set(o['@id'], o);
      assert(!('aggregateRating' in o) && !('review' in o), `${pfad}: aggregateRating oder review im JSON-LD (T02)`);
      const t = [].concat(o['@type'] || []);
      assert(!t.some((x) => BEWERTUNGSTYPEN.has(x)), `${pfad}: Typ ${t.join(', ')} im JSON-LD (T02)`);
      Object.values(o).forEach(lauf);
    };
    knoten.forEach(lauf);
    for (const v of verweise) assert(ids.has(v), `${pfad}: Verweis ohne Ziel ${v}`);
    const betriebe = [...ids.values()].filter((o) => [].concat(o['@type'] || []).some((x) => BETRIEBSTYPEN.has(x)));
    assert.strictEqual(betriebe.length, 1, `${pfad}: genau ein LocalBusiness, gefunden ${betriebe.length}`);
    assert(betriebe[0]['@id'].endsWith('/#local-business'), `${pfad}: LocalBusiness mit @id …/#local-business`);
    if (/^\/standorte\/[^/]+$/.test(pfad)) {
      ortsseiten++;
      const dienste = [...ids.values()].filter((o) => [].concat(o['@type'] || []).includes('Service') && o.url?.endsWith(pfad));
      assert.strictEqual(dienste.length, 1, `${pfad}: ein Service der Ortsseite`);
      assert.strictEqual(dienste[0].provider?.['@id'], betriebe[0]['@id'], `${pfad}: Service mit provider auf den einen Betrieb`);
      const ort = ids.get(dienste[0].areaServed?.['@id']);
      assert(ort && [].concat(ort['@type']).includes('City'), `${pfad}: areaServed verweist auf einen City-Knoten der Seite`);
      assert(/^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$/.test(ort.sameAs || ''), `${pfad}: City mit Wikidata-Kennung`);
    }
  }
  assert(seiten > 100, `nur ${seiten} Seiten mit JSON-LD im Bau gefunden`);
  assert(ortsseiten >= 13, `nur ${ortsseiten} Ortsseiten im Bau gefunden`);
  console.log(`    ${seiten} Seiten, davon ${ortsseiten} Ortsseiten: je ein LocalBusiness, kein Product, alle Verweise mit Ziel`);
}

console.log('✅ [QA SUCCESS] All Knowledge Graph, Linked Data & Schema checks passed with 0 errors.');
