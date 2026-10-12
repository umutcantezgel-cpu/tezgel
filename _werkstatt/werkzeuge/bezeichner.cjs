// Bezeichner-Probe (statisch): listet frei referenzierte Namen einer Moduldatei (nicht importiert, nicht deklariert).
// Nutzung: node _werkstatt/werkzeuge/bezeichner.cjs modul < datei.jsx   → JSON-Liste; Browser-Globale (fetch, window …) sind erwartbar,
// alles andere (z. B. eine Komponente ohne Import) ist ein Fehler. Pflicht bei jeder Zerlegung oder Verschiebung von Code (L6).
const req = require('module').createRequire('/home/user/tezgel/package.json');
const { parse } = req('@babel/parser');
const traverse = req('@babel/traverse').default;
const code = require('fs').readFileSync(0, 'utf8');
const modul = process.argv[2] === 'modul';
const ast = parse(modul ? code : `const __x = (<>${code}</>);`, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
const namen = new Set();
traverse(ast, {
  ReferencedIdentifier(p) {
    const n = p.node.name;
    if (p.isJSXIdentifier()) { if ((/^[A-Z]/.test(n) && p.parentPath.isJSXOpeningElement()) || p.parentPath.isJSXClosingElement() || p.parentPath.isJSXMemberExpression()) { if (!p.scope.hasBinding(n)) namen.add(n); } return; }
    if (!p.scope.hasBinding(n)) namen.add(n);
  },
});
namen.delete('__x');
console.log(JSON.stringify([...namen]));
