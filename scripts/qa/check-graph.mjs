import assert from 'node:assert';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

console.log('🔍 [QA] Starting JSON-LD Knowledge Graph & Schema Verification...');

// 1. Static Verification of Schema Source
const schemaPath = join(process.cwd(), 'src/lib/schema.ts');
const pyramidPath = join(process.cwd(), 'src/lib/schemaPyramid.ts');
const siteConfigPath = join(process.cwd(), 'src/shared/config/site.ts');

assert(existsSync(schemaPath), 'src/lib/schema.ts must exist');
assert(existsSync(pyramidPath), 'src/lib/schemaPyramid.ts must exist');
assert(existsSync(siteConfigPath), 'src/shared/config/site.ts must exist');

const schemaContent = readFileSync(schemaPath, 'utf8');
const pyramidContent = readFileSync(pyramidPath, 'utf8');
const siteContent = readFileSync(siteConfigPath, 'utf8');

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
  pfad: relative(process.cwd(), p),
  inhalt: readFileSync(p, 'utf8'),
}));

// Test 2: Keine Bewertungssterne in den strukturierten Daten (SEO-Runde T02, docs/seo/KONTEXT.md Abschnitt 5).
// Beleg: Google Search Central, Richtlinien für Rezensions-Snippets
// (https://developers.google.com/search/docs/appearance/structured-data/review-snippet): Bewertungen nicht von anderen
// Websites übernehmen; Seiten mit LocalBusiness oder Organization sind für Sterne nicht zugelassen, wenn der Betrieb die
// Bewertungen über sich selbst einbindet. Bis 01.11.2026 stand ein `Product` mit den von Google übernommenen Sternen und
// drei Rezensionen auf jeder Seite. Diese Prüfung verlangte früher genau diesen Knoten; jetzt verlangt sie sein Fehlen.
console.log('  ✓ Verifying no review stars in structured data (T02)...');
const bewertungsMuster = [
  [/['"]Product['"]/, "Typ 'Product'"],
  [/['"]AggregateRating['"]/, "Typ 'AggregateRating'"],
  [/['"]Review['"]/, "Typ 'Review'"],
  [/\baggregateRating\s*:/, 'Eigenschaft aggregateRating'],
  [/buildMainProductOfferNode|MAIN_SERVICE_PACKAGE_ID/, 'alter Product-Baustein'],
];
for (const { pfad, inhalt } of srcDateien) {
  for (const [muster, was] of bewertungsMuster) {
    assert(!muster.test(inhalt), `${pfad}: ${was} darf in den strukturierten Daten nicht mehr vorkommen (T02)`);
  }
}
// `review:` ist in Komponenten ein gewöhnlicher Prop-Name; in den Schema-Bausteinen darf die Eigenschaft nicht stehen
for (const [pfad, inhalt] of [['src/lib/schema.ts', schemaContent], ['src/lib/schemaPyramid.ts', pyramidContent]]) {
  assert(!/\breview\s*:/.test(inhalt), `${pfad}: Eigenschaft review darf in den strukturierten Daten nicht mehr vorkommen (T02)`);
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
// Beleg: Google-Richtlinien für lokale Unternehmen
// (https://developers.google.com/search/docs/appearance/structured-data/local-business): LocalBusiness beschreibt einen
// realen Standort. Bis 01.11.2026 meldete jede Ortsseite ein zweites LocalBusiness „Fliesenverlegung Tezgel – <Ort>“ mit der
// Aßlarer Anschrift. Die Ortsseite beschreibt jetzt die Leistung für den Ort als Service mit provider auf den einen Betrieb
// und areaServed auf den Ort. Früher prüfte diese Stelle „Hohwardstraße 14“ in schemaPyramid.ts; das traf nur einen
// Kommentar. Die echte Anschrift steht im einen LocalBusiness in schema.ts und wird dort geprüft.
console.log('  ✓ Verifying single LocalBusiness and city pages as Service (T04)...');
assert(pyramidContent.includes('areaServed'), 'Local schema pyramid must bind cities via areaServed');
assert(pyramidContent.includes('getCityLandingPageSchema'), 'getCityLandingPageSchema must be exported');
assert(/'@type':\s*'Service'/.test(pyramidContent), 'Ortsseite: Leistung als Service');
assert(/provider:\s*\{\s*'@id':\s*LOCAL_BUSINESS_ID\s*\}/.test(pyramidContent), 'Ortsseite: Service mit provider auf LOCAL_BUSINESS_ID');
const betriebsTyp = /['"](LocalBusiness|HomeAndConstructionBusiness|GeneralContractor)['"]/;
const mitBetriebsTyp = srcDateien.filter(({ inhalt }) => betriebsTyp.test(inhalt)).map(({ pfad }) => pfad);
assert.deepStrictEqual(mitBetriebsTyp, ['src/lib/schema.ts'], `LocalBusiness nur in src/lib/schema.ts, gefunden: ${mitBetriebsTyp.join(', ')}`);
const betriebsTypZeilen = schemaContent.split('\n').filter((z) => betriebsTyp.test(z));
assert.strictEqual(betriebsTypZeilen.length, 1, 'genau ein LocalBusiness-Knoten in src/lib/schema.ts');
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
for (const m of pyramidContent.matchAll(/name:\s*'([^']+)',\s*\n\s*slug:\s*'[^']+',[\s\S]*?wikidataId:\s*'(Q\d+)'/g)) {
  if (!(m[1] in wikidataIst)) wikidataIst[m[1]] = m[2];
}
assert.deepStrictEqual(wikidataIst, wikidataSoll, 'Wikidata-Kennungen in HESSEN_GEO_HIERARCHY');
assert(!pyramidContent.includes('Q1198'), 'Q1198 ist Nordrhein-Westfalen, nicht Hessen');
assert(pyramidContent.includes("sameAs: 'https://www.wikidata.org/wiki/Q1199'"), 'Ortsseite: Hessen verweist auf Q1199');

// Test 4: Verification of Master Site Configuration
console.log('  ✓ Verifying master entity site-config constants...');
assert(siteContent.includes('35614'), 'HQ postal code must be 35614');
assert(siteContent.includes('Aßlar'), 'HQ locality must be Aßlar');
assert(siteContent.includes('Deniz Tezgel'), 'Founder must be Deniz Tezgel');

console.log('✅ [QA SUCCESS] All Knowledge Graph, Linked Data & Schema checks passed with 0 errors.');
