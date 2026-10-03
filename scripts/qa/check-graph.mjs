import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

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

// Test 2: Verification of Google Filter Guard (AggregateRating on Product, not Organization)
console.log('  ✓ Verifying Google SERP star filter protection...');
assert(schemaContent.includes('MAIN_SERVICE_PACKAGE_ID'), 'MAIN_SERVICE_PACKAGE_ID constant must be defined');
assert(schemaContent.includes('buildMainProductOfferNode'), 'buildMainProductOfferNode must be defined');
assert(schemaContent.includes('aggregateRating'), 'aggregateRating must be present in product node');

// Ensure Organization does not directly declare aggregateRating in root definition
const orgBlockMatch = schemaContent.match(/buildOrganizationNode[\s\S]*?return\s*\{[\s\S]*?\};/);
if (orgBlockMatch) {
  assert(!orgBlockMatch[0].includes('aggregateRating'), 'CRITICAL: aggregateRating must NOT be on Organization node!');
}

// Test 3: Verification of 3-Tier Pyramid Anti-Fake-Location Model
console.log('  ✓ Verifying 3-tier local SEO pyramid & anti-fake-location model...');
assert(pyramidContent.includes('areaServed'), 'Local schema pyramid must bind cities via areaServed');
assert(pyramidContent.includes('getCityLandingPageSchema'), 'getCityLandingPageSchema must be exported');
assert(pyramidContent.includes('Hohwardstraße 14'), 'Pyramid must preserve real Aßlar headquarters address');

// Test 4: Verification of Master Site Configuration
console.log('  ✓ Verifying master entity site-config constants...');
assert(siteContent.includes('35614'), 'HQ postal code must be 35614');
assert(siteContent.includes('Aßlar'), 'HQ locality must be Aßlar');
assert(siteContent.includes('Deniz Tezgel'), 'Founder must be Deniz Tezgel');

console.log('✅ [QA SUCCESS] All Knowledge Graph, Linked Data & Schema checks passed with 0 errors.');
