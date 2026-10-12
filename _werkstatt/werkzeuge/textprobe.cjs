// Textprobe (statisch, vor Prüfstufe A): vergleicht JSX-Text (T:) und Text-Attribute (A:) zwischen Alt- und Neu-Dateien.
// Nutzung: node _werkstatt/werkzeuge/textprobe.cjs <alt…> -- <neu…>   (Alt z. B. per <(git show HEAD:pfad) oder Kopie)
// Ausgabe: ENTFERNT/HINZU je Eintrag. Entfernte T:-Einträge sind Textverlust, außer protokollierten Mikrotexten;
// Texte, die nur als Prop (titel=, etikett=) weiterwandern, erscheinen als A:-Eintrag mit gleichem Wortlaut.
const req = require('module').createRequire('/home/user/tezgel/package.json');
const { parse } = req('@babel/parser');
const traverse = req('@babel/traverse').default;
const fs = require('fs');
const ATTR = new Set(['alt', 'title', 'aria-label', 'placeholder', 'href', 'id', 'name', 'value', 'label', 'htmlFor', 'type', 'question', 'answer', 'headline', 'subtitle', 'buttonText', 'etikett', 'titel', 'unterzeile', 'beschriftung']);
function fp(file) {
  const ast = parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  const t = [];
  traverse(ast, {
    JSXText(p) { const v = p.node.value.replace(/\s+/g, ' ').trim(); if (v) t.push('T:' + v); },
    JSXAttribute(p) { const n = p.node.name.name; if (ATTR.has(n) && p.node.value?.type === 'StringLiteral') t.push(`A:${n}=${p.node.value.value}`); },
  });
  return t;
}
const i = process.argv.indexOf('--');
const alt = process.argv.slice(2, i).flatMap(fp), neu = process.argv.slice(i + 1).flatMap(fp);
const ms = (a) => { const m = new Map(); for (const x of a) m.set(x, (m.get(x) || 0) + 1); return m; };
const ma = ms(alt), mb = ms(neu);
const weg = [], hinzu = [];
for (const [k, n] of ma) { const d = n - (mb.get(k) || 0); for (let j = 0; j < d; j++) weg.push(k); }
for (const [k, n] of mb) { const d = n - (ma.get(k) || 0); for (let j = 0; j < d; j++) hinzu.push(k); }
console.log('ENTFERNT', weg.length); weg.forEach((x) => console.log('  - ' + x));
console.log('HINZU', hinzu.length); hinzu.forEach((x) => console.log('  + ' + x));
