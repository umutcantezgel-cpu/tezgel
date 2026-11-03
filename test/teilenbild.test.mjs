import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { TEILENBILDER, teilenbild, teilenbildId, teilenbildPfad } from '../src/lib/seo/teilenbild.ts';
import { generatePageMetadata } from '../src/lib/metadata.ts';
import { SITE_URL } from '../src/lib/schema.ts';
import { posts } from '../src/config/posts.js';
import { SERVICES } from '../src/config/services.js';
import sitemap, { BILDER_JE_SEITE } from '../src/app/sitemap.ts';

// SEO-Runde T08 (03.11.2026, docs/seo/KONTEXT.md Abschnitt 13): echte Fotos als Teilen-Bild statt Logo und Generatorbildern,
// dazu die Bild-Sitemap mit festen Adressen (T13). Erwartungen aus der Zuordnung in src/lib/seo/teilenbild.ts.

function jpegMasse(puffer) {
  if (puffer[0] !== 0xff || puffer[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < puffer.length) {
    if (puffer[i] !== 0xff) return null;
    const marke = puffer[i + 1];
    if (marke === 0xff) { i += 1; continue; }
    const laenge = puffer.readUInt16BE(i + 2);
    if (marke >= 0xc0 && marke <= 0xcf && marke !== 0xc4 && marke !== 0xc8 && marke !== 0xcc) {
      return { hoehe: puffer.readUInt16BE(i + 5), breite: puffer.readUInt16BE(i + 7) };
    }
    i += 2 + laenge;
  }
  return null;
}
const datei = (pfad) => new URL(`../public${pfad}`, import.meta.url);

test('Teilen 1: jedes Teilen-Bild liegt als JPEG 1200 × 630 in public, Alt-Text bis 125 Zeichen ohne Strich', () => {
  assert.equal(TEILENBILDER.length, 7);
  for (const b of TEILENBILDER) {
    assert.match(b.pfad, /^\/images\/arbeiten\/teilen\/[a-z0-9-]+\.jpg$/, b.id);
    const masse = jpegMasse(readFileSync(datei(b.pfad)));
    assert.deepEqual(masse && [masse.breite, masse.hoehe], [1200, 630], `${b.id}: Maße von ${b.pfad}`);
    assert.ok(b.alt.length > 20 && b.alt.length <= 125, `${b.id}: Alt-Text ${b.alt.length} Zeichen`);
    assert.doesNotMatch(b.alt, /[–—]|\s-\s/, b.id);
  }
});

test('Teilen 2: Zuordnung nach ganzen Abschnitten der Adresse, sonst das Bad', () => {
  assert.equal(teilenbildId('/'), 'bad');
  assert.equal(teilenbildId('/standorte/wetzlar'), 'bad');
  assert.equal(teilenbildId('/fliesenreparatur'), 'bad', '„/fliesen“ trifft nicht „/fliesenreparatur“');
  assert.equal(teilenbildId('/fliesen'), 'boden');
  assert.equal(teilenbildId('/fliesen/kueche'), 'boden');
  assert.equal(teilenbildId('/fliesen/fugensanierung'), 'bad', 'die längere Regel gewinnt');
  assert.equal(teilenbildId('/fliesen/verlegetechnik'), 'untergrund');
  assert.equal(teilenbildId('/balkon-terrasse/stelzlager'), 'balkon');
  assert.equal(teilenbildId('/leistungen/aussen/giessen'), 'balkon');
  assert.equal(teilenbildId('/leistungen/bad/giessen'), 'bad');
  assert.equal(teilenbildId('/treppen/innentreppe'), 'treppe');
  // Gegenprüfung Live 4: das Foto in Travertinoptik ist kein bestätigter Naturstein, die Natursteinseiten teilen das Bad
  assert.equal(teilenbildId('/naturstein/granit'), 'bad');
  assert.equal(teilenbildId('/blog/feinsteinzeug-oder-naturstein-vergleich'), 'travertinoptik');
  // die Seiten über die Dusche ohne Stufe teilen eine Dusche ohne Stufe, nicht die Duschwanne des Bads
  for (const pfad of ['/bad/barrierefreies-bad', '/foerderung', '/referenzen/barrierefreies-duschbad', '/blog/duschrinne-oder-punktablauf']) {
    assert.equal(teilenbildId(pfad), 'dusche', pfad);
  }
  assert.equal(teilenbildId('/untergrund-abdichtung/din-18534'), 'untergrund');
  assert.equal(teilenbildId('/blog/fliesen-reinigen-pflegen'), 'boden');
  assert.deepEqual(teilenbild('/', SITE_URL), {
    url: `${SITE_URL}/images/arbeiten/teilen/bad-dusche-glaswand-beige.jpg`,
    width: 1200,
    height: 630,
    alt: TEILENBILDER.find((b) => b.id === 'bad').alt,
  });
});

test('Teilen 3: Metadaten nennen das Teilen-Bild der Adresse mit Maßen und Alt-Text, nie das Logo', () => {
  for (const pfad of ['/', '/bad/badsanierung', '/treppen', '/leistungen/wohnen/solms', '/kontakt']) {
    const meta = generatePageMetadata({ title: 'Prüfseite Fliesenverlegung Tezgel in Aßlar', description: 'x', path: pfad });
    assert.deepEqual(meta.openGraph.images, [teilenbild(pfad, SITE_URL)], pfad);
    const { url, alt } = teilenbild(pfad, SITE_URL);
    assert.deepEqual(meta.twitter.images, [{ url, alt }], pfad);
  }
  const fremd = generatePageMetadata({ title: 'Prüfseite Fliesenverlegung Tezgel in Aßlar', description: 'x', path: '/x', image: '/images/irgendwas.jpg' });
  assert.deepEqual(fremd.openGraph.images, [{ url: `${SITE_URL}/images/irgendwas.jpg` }], 'fremdes Bild ohne erfundene Maße');
});

test('Teilen 4: Blogartikel und Leistungen nutzen echte Fotos, keine Generatorbilder aus /images/bad', () => {
  assert.equal(posts.length, 13);
  for (const post of posts) {
    assert.equal(post.image, teilenbildPfad(teilenbildId(`/blog/${post.slug}`)), post.slug);
  }
  for (const service of SERVICES) {
    assert.ok(service.heroImage && existsSync(datei(service.heroImage)), `${service.id}: ${service.heroImage}`);
    assert.doesNotMatch(service.heroImage, /^\/images\/bad\//, service.id);
  }
});

test('Bild-Sitemap: feste Adressen der Fotos je Seite, Dateien vorhanden, Galerie auf /referenzen', () => {
  const eintraege = sitemap();
  const mitBildern = eintraege.filter((e) => e.images && e.images.length > 0);
  for (const pfad of ['', '/referenzen', '/standorte/wetzlar', '/standorte/giessen', '/bad/badsanierung']) {
    const e = eintraege.find((x) => x.url === `${SITE_URL}${pfad}`);
    assert.ok(e && e.images && e.images.length > 0, `${pfad || '/'}: keine Bilder`);
    assert.deepEqual(e.images, BILDER_JE_SEITE.get(pfad), pfad);
  }
  assert.ok(BILDER_JE_SEITE.get('/referenzen').length >= 100, 'Galerie fehlt');
  for (const e of mitBildern) {
    assert.equal(new Set(e.images).size, e.images.length, `${e.url}: Bild doppelt`);
    for (const bild of e.images) {
      // Next schreibt die Adressen ohne XML-Maskierung in <image:loc>: nur Zeichen, die keine Maskierung brauchen
      assert.match(bild, /^https:\/\/www\.tezgel\.de\/images\/arbeiten\/[a-z0-9/._-]+\.(jpg|webp|png)$/, bild);
      assert.ok(existsSync(datei(bild.slice(SITE_URL.length))), `${e.url}: ${bild} fehlt`);
    }
  }
});

test('Leistungsbeispiele (T11): je drei echte Fotos ähnlicher Arbeiten, jedes Foto nur einmal, Satz ohne Ort und ohne Strich', async () => {
  const { PORTFOLIO_PROJECTS } = await import('../src/config/projects.js');
  const { ARBEITEN } = await import('../src/config/arbeiten.ts');
  const { CITIES } = await import('../src/config/cities.ts');
  const gesehen = new Set();
  for (const p of PORTFOLIO_PROJECTS.filter((x) => x.placeholder)) {
    assert.equal(p.beispielFotos?.length, 3, p.id);
    for (const id of p.beispielFotos) {
      assert.ok(ARBEITEN[id], `${p.id}: ${id} fehlt in ARBEITEN`);
      assert.ok(!gesehen.has(id), `${p.id}: ${id} schon auf einem anderen Leistungsbeispiel`);
      gesehen.add(id);
    }
    assert.match(p.fotoSatz, /^Die Fotos zeigen .+ aus unserer Arbeit\.$/, p.id);
    assert.ok(p.fotoSatz.split(/\s+/).length <= 25, `${p.id}: Satz zu lang`);
    assert.doesNotMatch(p.fotoSatz, /[–—]|\s-\s/, p.id);
    for (const city of CITIES) assert.ok(!p.fotoSatz.includes(city.name), `${p.id}: Ort ${city.name} im Satz`);
    assert.deepEqual(
      BILDER_JE_SEITE.get(`/referenzen/${p.id}`),
      p.beispielFotos.map((id) => `${SITE_URL}${ARBEITEN[id].src}`),
      `${p.id}: Bild-Sitemap`,
    );
  }
  assert.equal(gesehen.size, 18);
});
