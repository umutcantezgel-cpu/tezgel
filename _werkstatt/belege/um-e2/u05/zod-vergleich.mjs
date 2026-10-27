// Vergleich alt (deprecated Methoden) gegen neu (check/loose) auf identische Ergebnisse, zod aus dem Projekt.
import { z } from '/home/user/tezgel/node_modules/zod/index.js';
import * as alt from './alt-schema.mjs';
import * as neu from './neu-schema.mjs';
const mail = (m) => z.string().max(100, 'A').email(m);
const mailNeu = (m) => z.string().max(100, 'A').check(z.email(m));
const eingaben = ['a@b.de', 'max.mustermann@example.com', 'kein-at', '@x.de', 'a@b', 'ä@ö.de', ' a@b.de', 'a@b.de ', '', 'x'.repeat(95) + '@b.de', 'y'.repeat(120), 'y'.repeat(101) + '@b.de', 'a..b@c.de', '"q"@x.de', 'a@[127.0.0.1]', 'A@B.DE', '😀@x.de', 'a@b.c', 'a+b@c.de', 'a@b-.de'];
let gleich = 0; let ungleich = 0;
const norm = (r) => JSON.stringify({ ok: r.success, data: r.data, issues: r.success ? null : r.error.issues.map((i) => [i.code, i.message, i.path, i.format]) });
for (const e of eingaben) { const x = norm(mail('M').safeParse(e)); const y = norm(mailNeu('M').safeParse(e)); x === y ? gleich++ : (ungleich++, console.log('UNGLEICH email', JSON.stringify(e), x, y)); }
const bilder = ['https://www.tezgel.de/a.jpg', '/images/x.jpg', 'http://x', 'ftp://x/y', 'javascript:alert(1)', 'nicht url', '', 'https://', '//cdn.x/y.png', 'mailto:a@b.de', 'https://ä.de/ü'];
for (const im of bilder) {
  for (const extra of [{}, { foo: 1, bar: { a: 1 } }]) {
    const obj = { id: 1, title: 'T', description: 'D', image: im, category: 'c', ...extra };
    const x = norm(alt.projectSchema.safeParse(obj)); const y = norm(neu.projectSchema.safeParse(obj));
    x === y ? gleich++ : (ungleich++, console.log('UNGLEICH projekt', im, x, y));
  }
}
for (const extra of [{}, { zusatz: [1, 2] }]) {
  const obj = { id: 'p', title: 'T', content: 'C', ...extra };
  const x = norm(alt.blogPostSchema.safeParse(obj)); const y = norm(neu.blogPostSchema.safeParse(obj));
  x === y ? gleich++ : (ungleich++, console.log('UNGLEICH blog', x, y));
}
console.log(`gleich ${gleich}, ungleich ${ungleich}`);
process.exit(ungleich ? 1 : 0);
