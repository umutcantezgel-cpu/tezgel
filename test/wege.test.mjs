import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ENTFERNTE_BEREICHE, ENTFERNTE_SEITEN, istEntfernt } from '../src/lib/wege.ts';
import nextConfig from '../next.config.ts';
import { posts } from '../src/config/posts.js';
import { PORTFOLIO_PROJECTS } from '../src/config/projects.js';

// Wege alter Adressen (P4-07): 410-Liste, Proxy-matcher und 308-Weiterleitungen gegen die echten Seiten von Tezgel.

const APP = path.resolve(process.cwd(), 'src/app');

/** Routenmuster aller Seitendateien (Routen-Gruppen und `_`-Ordner wie in Next; ruhende Entwürfe zählen nicht). */
function seitenMuster() {
  const muster = [];
  (function lauf(ordner, teile) {
    for (const e of fs.readdirSync(ordner, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (e.name.startsWith('_')) continue;
        const gruppe = /^\(.+\)$/.test(e.name);
        lauf(path.join(ordner, e.name), gruppe ? teile : [...teile, e.name]);
      } else if (/^page\.(js|jsx|ts|tsx)$/.test(e.name)) {
        muster.push(`/${teile.join('/')}`);
      }
    }
  })(APP, []);
  return muster;
}

/** Konkrete Adressen: statische Seiten direkt, Blog und Referenzen über ihre Daten; übrige dynamische Seiten als Muster. */
function seitenAdressen() {
  const adressen = new Set();
  for (const m of seitenMuster()) {
    if (m === '/blog/[slug]') posts.forEach((p) => adressen.add(`/blog/${p.slug}`));
    else if (m === '/referenzen/[id]') PORTFOLIO_PROJECTS.forEach((p) => adressen.add(`/referenzen/${p.id}`));
    else adressen.add(m.replace(/\[[^\]]+\]/g, 'beispiel'));
  }
  return [...adressen];
}

test('1. Wege: keine Seite von Tezgel gilt als entfernt', () => {
  const adressen = seitenAdressen();
  assert.ok(adressen.length > 60, `zu wenige Seiten gefunden (${adressen.length})`);
  const getroffen = adressen.filter((a) => istEntfernt(a === '/' ? '/' : a.replace(/\/$/, '')));
  assert.deepEqual(getroffen, []);
});

test('2. Wege: jede entfernte Adresse ist entfernt und hat keine Seitendatei', () => {
  const adressen = new Set(seitenAdressen());
  for (const a of [...ENTFERNTE_BEREICHE, ...ENTFERNTE_SEITEN]) {
    assert.equal(istEntfernt(a), true, a);
    assert.equal(adressen.has(a), false, `${a} ist eine Seite`);
  }
  for (const b of ENTFERNTE_BEREICHE) assert.equal(istEntfernt(`${b}/unterseite/tiefer`), true, b);
});

test('3. Wege: Grenzfälle bleiben unberührt', () => {
  for (const a of ['/', '/heizungen', '/energie-sparen', '/notdienste', '/Heizung', '/blog', '/blog/fliesen-reinigen-pflegen',
    '/referenzen', '/referenzen/project-007', '/referenzen/badsanierung-grossformat', '/bad/barrierefreies-bad']) {
    assert.equal(istEntfernt(a), false, a);
  }
});

test('4. Wege: matcher in src/proxy.ts entspricht genau der Liste', () => {
  const quelle = fs.readFileSync(path.resolve(process.cwd(), 'src/proxy.ts'), 'utf8');
  const block = quelle.slice(quelle.indexOf('matcher:'));
  const literale = [...block.matchAll(/'([^']+)'/g)].map((m) => m[1]);
  const erwartet = [...ENTFERNTE_BEREICHE.map((b) => `${b}/:pfad*`), ...ENTFERNTE_SEITEN];
  assert.deepEqual([...literale].sort(), [...erwartet].sort());
});

test('5. Wege: zwei dauerhafte Weiterleitungen (308) auf bestehende Seiten', async () => {
  const wege = await nextConfig.redirects();
  assert.deepEqual(
    wege.map(({ source, destination, permanent }) => ({ source, destination, permanent })),
    [
      { source: '/bad/budgetkalkulator', destination: '/bad/projekt-check', permanent: true },
      { source: '/blog/barrierefreies-bad-planung-zuschuesse', destination: '/bad/barrierefreies-bad', permanent: true },
    ],
  );
  const adressen = new Set(seitenAdressen());
  for (const w of wege) {
    assert.equal(adressen.has(w.destination), true, `Ziel ${w.destination} fehlt`);
    assert.equal(adressen.has(w.source), false, `Quelle ${w.source} ist noch eine Seite`);
    assert.equal(istEntfernt(w.source), false, `Quelle ${w.source} steht auch in der 410-Liste`);
  }
});
