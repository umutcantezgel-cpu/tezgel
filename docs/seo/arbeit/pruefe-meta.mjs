// Prüft die Vorschläge in meta-vorschlaege.json gegen die Hausregeln und gegen die Titel-Bereinigung der Website.
// Aufruf im Repo: node --import ./test/register-hooks.mjs docs/seo/arbeit/pruefe-meta.mjs docs/seo/arbeit/meta-vorschlaege.json
import { readFileSync } from 'node:fs';
import { generatePageMetadata } from '../../../src/lib/metadata.ts';
const v = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const fl = JSON.parse(readFileSync(new URL('../../../_werkstatt/regeln/floskeln.json', import.meta.url), 'utf8'));
let fehler = 0;
const flos = (t) => fl.woerter.filter((w) => new RegExp(`(?<![\\wäöüß])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\wäöüß])`, 'i').test(t));
for (const e of v) {
  const b = [];
  const out = generatePageMetadata({ title: e.titel, description: e.desc ?? 'x'.repeat(130), path: '/gibt-es-nicht' + e.pfad });
  if (out.title.absolute !== e.titel) b.push(`Titel wird umgeschrieben zu „${out.title.absolute}“`);
  if (e.titel.length < 45 || e.titel.length > 58) b.push(`Titel ${e.titel.length} Zeichen`);
  if (!/Tezgel/.test(e.titel)) b.push('Titel ohne Tezgel');
  if (/[–—]|\s-\s/.test(e.titel)) b.push('Titel mit Strich');
  if (flos(e.titel).length) b.push('Titel Floskel ' + flos(e.titel));
  if (e.desc) {
    if (e.desc.length < 120 || e.desc.length > 155) b.push(`Description ${e.desc.length} Zeichen`);
    if (/\.\.\.|…|\s[–—-]\s|&|!|[–—]/.test(e.desc)) b.push('Description mit verbotenem Zeichen');
    if (flos(e.desc).length) b.push('Description Floskel ' + flos(e.desc));
    if (/\b(du|dein|dich|dir)\b/i.test(e.desc)) b.push('Du-Anrede');
    if (/Wetzlar/.test(e.desc) && !/wetzlar|karriere/.test(e.pfad)) b.push('Wetzlar in Description');
  }
  if (/Wetzlar/.test(e.titel) && !/wetzlar|karriere/.test(e.pfad)) b.push('Wetzlar im Titel');
  console.log(`${b.length ? 'FEHLER' : 'ok    '} ${e.pfad} T${e.titel.length}${e.desc ? ' D' + e.desc.length : ''}${b.length ? ' :: ' + b.join('; ') : ''}`);
  fehler += b.length;
}
// doppelte Titel
const t = v.map((e) => e.titel); const d = t.filter((x, i) => t.indexOf(x) !== i);
if (d.length) { console.log('doppelte Titel', d); fehler++; }
console.log(fehler ? `${fehler} Befunde` : 'alle Vorschläge regelkonform');
