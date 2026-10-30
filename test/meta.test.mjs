import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { META_BESCHREIBUNGEN, META_TEILE } from '../src/inhalte/meta/index.ts';
import { generatePageMetadata } from '../src/lib/metadata.ts';
import { LOCAL_BUSINESS_ID, ORDNER_DIENSTE, SITE_URL, buildOrdnerServiceNode } from '../src/lib/schema.ts';
import { zeigtOrdnerKnoten } from '../src/lib/ordnerdienst.ts';

// Eigene Meta-Beschreibungen (E3-SEO-META, E-050): vollständig, ohne Kürzung, in Alltagssprache (K-010).
const eintraege = Object.entries(META_BESCHREIBUNGEN);

test('Meta 1: Adressen beginnen mit „/“, ohne Schrägstrich am Ende', () => {
  for (const [pfad] of eintraege) assert.match(pfad, /^\/[a-z0-9\-/_]*[a-z0-9_]$/, pfad);
});

test('Meta 2: 120 bis 155 Zeichen, ohne Auslassung, Gedankenstrich, „&“ und Ausrufezeichen', () => {
  for (const [pfad, text] of eintraege) {
    assert.ok(text.length >= 120 && text.length <= 155, `${pfad}: ${text.length} Zeichen`);
    assert.doesNotMatch(text, /\.\.\.|…|\s[–—-]\s|&|!/, pfad);
    assert.equal(text, text.trim().replace(/\s+/g, ' '), `${pfad}: Leerraum`);
  }
});

test('Meta 3: generatePageMetadata liefert den Eintrag zur Adresse unverändert, auch bei langer Datenbeschreibung', () => {
  for (const [pfad, text] of eintraege) {
    const meta = generatePageMetadata({ title: 'Prüfseite Fliesenverlegung Tezgel in Aßlar', description: 'x '.repeat(120), path: pfad });
    assert.equal(meta.description, text, pfad);
    assert.equal(meta.openGraph?.description, text, pfad);
  }
});

test('Meta 4: ohne Eintrag bleibt die übergebene Beschreibung maßgeblich', () => {
  const beschreibung = 'Wir verlegen Fliesen in Bad, Küche und Flur. Der Termin bei Ihnen vor Ort ist kostenfrei, das Angebot bekommen Sie danach schriftlich.';
  assert.equal(generatePageMetadata({ title: 'Prüfseite Fliesenverlegung Tezgel in Aßlar', description: beschreibung, path: '/gibt-es-nicht' }).description, beschreibung);
});

test('Meta 5: jede Adresse steht in genau einer Teildatei (sonst überschreibt die spätere still die frühere)', () => {
  const gesehen = new Map();
  for (const [teil, eintraege] of Object.entries(META_TEILE)) {
    for (const pfad of Object.keys(eintraege)) {
      assert.ok(!gesehen.has(pfad), `${pfad} in ${gesehen.get(pfad)} und ${teil}`);
      gesehen.set(pfad, teil);
    }
  }
  assert.equal(gesehen.size, Object.keys(META_BESCHREIBUNGEN).length);
});

// Service-Knoten der Ordner-Layouts (UM-E4-EP4, E-068): wie in E0 steht der Knoten der Leistung im Layout des Ordners und geht an
// alle Unterseiten; die Ordnerseite trägt ihren Knoten selbst und bekommt keinen zweiten. Erwartungen aus der Spezifikation.
const SEITEN = fileURLToPath(new URL('../src/app/(bestand)', import.meta.url));
const ORDNER = Object.keys(ORDNER_DIENSTE);
const verzeichnis = (ordner) => path.join(SEITEN, ordner.slice(1));
const quelle = (datei) => fs.readFileSync(datei, 'utf8');
/** Alle Dateien unter einem Ordner (rekursiv) */
const dateien = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? dateien(path.join(dir, e.name)) : [path.join(dir, e.name)]));
/** Die Seitendatei direkt im Ordner (page.jsx, page.tsx …) */
const ordnerSeite = (ordner) => {
  const treffer = fs.readdirSync(verzeichnis(ordner)).filter((n) => /^page\.(jsx?|tsx?)$/.test(n));
  assert.equal(treffer.length, 1, `${ordner}: genau eine Seitendatei im Ordner`);
  return path.join(verzeichnis(ordner), treffer[0]);
};

test('Strukturdaten 1: jeder Ordner gibt einen Service-Knoten auf die Adresse seiner Ordnerseite, ohne Preis, Bild oder Bewertung', () => {
  assert.deepEqual(ORDNER, ['/bad', '/balkon-terrasse', '/fliesen', '/naturstein', '/treppen', '/untergrund-abdichtung']);
  for (const ordner of ORDNER) {
    const knoten = JSON.parse(JSON.stringify(buildOrdnerServiceNode(ordner)));
    assert.equal(knoten['@type'], 'Service', ordner);
    assert.equal(knoten['@id'], `${SITE_URL}${ordner}#service`, ordner);
    assert.equal(knoten.url, `${SITE_URL}${ordner}`, ordner);
    assert.deepEqual(knoten.provider, { '@id': LOCAL_BUSINESS_ID }, ordner);
    // nur Angaben aus ORDNER_DIENSTE (E-091): kein Angebot, kein Preis, kein Bild, keine Bewertung
    assert.deepEqual(Object.keys(knoten).sort(), ['@id', '@type', 'areaServed', 'description', 'name', 'provider', 'serviceType', 'url'], ordner);
    for (const feld of ['name', 'serviceType', 'description']) assert.ok(knoten[feld].trim().length > 10, `${ordner}: ${feld}`);
  }
});

test('Strukturdaten 2: das Layout jedes Ordners bindet OrdnerService mit der Adresse des Ordners ein und baut keinen eigenen Knoten', () => {
  for (const ordner of ORDNER) {
    const layout = quelle(path.join(verzeichnis(ordner), 'layout.tsx'));
    assert.ok(layout.includes(`<OrdnerService ordner="${ordner}" />`), ordner);
    assert.doesNotMatch(layout, /buildServiceNode|buildWebPageNode|buildBreadcrumbNode/, `${ordner}: nur der Service-Knoten, keine Seitenknoten im Layout`);
  }
});

test('Strukturdaten 3: die Ordnerseite trägt ihren Service-Knoten selbst, mit denselben Angaben wie ORDNER_DIENSTE', () => {
  for (const [ordner, angaben] of Object.entries(ORDNER_DIENSTE)) {
    const seite = quelle(ordnerSeite(ordner));
    assert.equal(seite.split('buildServiceNode(').length - 1, 1, `${ordner}: genau ein eigener Service-Knoten`);
    assert.ok(seite.includes('${SITE_URL}' + ordner), `${ordner}: url des eigenen Knotens`);
    for (const feld of ['name', 'serviceType', 'description', 'areaServed']) {
      assert.ok(seite.includes(angaben[feld]), `${ordner}: ${feld} weicht von ORDNER_DIENSTE ab`);
    }
  }
});

test('Strukturdaten 4: unter jedem Ordner mit Layout-Knoten setzt nur die Ordnerseite einen Service-Knoten (kein Doppelknoten)', () => {
  for (const ordner of ORDNER) {
    const seite = ordnerSeite(ordner);
    for (const datei of dateien(verzeichnis(ordner))) {
      if (datei === seite || !/\.(jsx?|tsx?)$/.test(datei)) continue;
      assert.doesNotMatch(quelle(datei), /buildServiceNode|['"]@type['"]: ['"]Service['"]/, path.relative(SEITEN, datei));
    }
  }
});

test('Strukturdaten 5: der Knoten steht auf Unterseiten, nicht auf der Ordnerseite (auch mit Schrägstrich am Ende)', () => {
  assert.equal(zeigtOrdnerKnoten('/bad', '/bad'), false);
  assert.equal(zeigtOrdnerKnoten('/bad/', '/bad'), false);
  assert.equal(zeigtOrdnerKnoten('/bad/badsanierung', '/bad'), true);
  assert.equal(zeigtOrdnerKnoten('/bad/musterbaeder/basic-bad-7', '/bad'), true);
  assert.equal(zeigtOrdnerKnoten('/untergrund-abdichtung/din-18534', '/untergrund-abdichtung'), true);
  assert.equal(zeigtOrdnerKnoten('/fliesen', '/fliesen'), false);
});

test('Strukturdaten 6: OrdnerService setzt den Knoten über NurUnterseiten, und diese folgt der Regel aus lib/ordnerdienst.ts', () => {
  const dienst = quelle(fileURLToPath(new URL('../src/components/seo/OrdnerService.tsx', import.meta.url)));
  assert.ok(/<NurUnterseiten ordner=\{ordner\}>[\s\S]*buildOrdnerServiceNode\(ordner\)[\s\S]*<\/NurUnterseiten>/.test(dienst));
  const nur = quelle(fileURLToPath(new URL('../src/components/seo/NurUnterseiten.tsx', import.meta.url)));
  assert.match(nur, /^'use client';/);
  assert.ok(nur.includes('zeigtOrdnerKnoten(usePathname(), ordner)'));
});

// FUGEN (src/components/kern/zusammen.tsx, UM-E4-INHALT Teil B): Wörter, die bei großer Schrift nur an ihrer Fuge trennen.
// Die Einträge dürfen den Wortlaut nicht ändern (G8): ohne die weichen Trennstriche ist der Wert gleich dem Wort.
test('Fugen 1: jeder Eintrag in FUGEN setzt nur Trennstellen, der Wortlaut bleibt gleich', () => {
  const text = quelle(fileURLToPath(new URL('../src/components/kern/zusammen.tsx', import.meta.url)));
  const block = /const FUGEN: Record<string, string> = \{([\s\S]*?)\n\};/.exec(text);
  assert.ok(block, 'FUGEN nicht gefunden');
  const eintraege = [...block[1].matchAll(/^\s+(\p{L}+): '([^']*)',$/gmu)].map(([, wort, wert]) => [wort, wert.replace(/\\u00ad/gi, '\u00ad')]);
  assert.ok(eintraege.length >= 14, `${eintraege.length} Einträge`);
  const woerter = eintraege.map(([wort]) => wort);
  assert.equal(new Set(woerter).size, woerter.length, 'Wort doppelt in FUGEN');
  for (const [wort, wert] of eintraege) {
    assert.equal(wert.replaceAll('\u00ad', ''), wort, `${wort}: Wortlaut weicht ab`);
    assert.doesNotMatch(wert, /^\u00ad|\u00ad$|\u00ad\u00ad/, `${wort}: Trennstelle am Rand oder doppelt`);
  }
});

// Nacharbeit Teil B: Ortszeile des Einstiegs (FS-K Nr. 10) und Leerzeichen vor dem Link der Einwilligung (Zugänglichkeitsname)
test('Fugen 2: die Ortszeile des Einstiegs läuft über mitFugen (Fliesenverlegung trennt an der Fuge)', () => {
  const einstieg = quelle(fileURLToPath(new URL('../src/components/vorlagen/teile/Einstieg.tsx', import.meta.url)));
  assert.ok(/data-erstes-bild="ort"[^>]*>\s*\{mitFugen\(ort\)\}\s*<\/p>/.test(einstieg), 'Ortszeile ohne mitFugen');
  assert.match(einstieg, /import \{ mitFugen \} from '@\/components\/kern\/zusammen';/);
});

test('Fugen 3: das Leerzeichen vor dem Datenschutz-Link steht im Text davor, nicht als eigener Textknoten', () => {
  const form = quelle(fileURLToPath(new URL('../src/components/forms/LeadQuickForm.tsx', import.meta.url)));
  const satz = /\{mitFugen\('(Ich willige[^']*)'\)\}\s*<Link href="\/datenschutz"/.exec(form);
  assert.ok(satz, 'Einwilligungssatz nicht gefunden oder {\' \'} vor dem Link');
  assert.ok(satz[1].endsWith('Hinweise in der '), 'Satz endet nicht mit Leerzeichen vor dem Link');
});
