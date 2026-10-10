export const meta = {
  name: 'tezgel-slop',
  description: 'Slop-Jäger (Haiku) je Seite, danach Opus-Gegenprüfer je Fundliste; nur Bildmaterial und Seitentext',
  phases: [{ title: 'Jagd', detail: 'Haiku zählt Fundstellen nach Katalog' }, { title: 'Gegenprüfung', detail: 'Opus erkennt an, verwirft, trägt nach' }],
}
// args: { satz, basis, material: { "<seite>": ["<relativer bildpfad>", …] }, texte: { "<seite>": "<pfad>" } }
const BRIEF = '/home/user/tezgel/_werkstatt/pakete/_vorlage-slopjaeger.md'
const FUND = { type: 'object', properties: { kennung: { type: 'string' }, hart: { type: 'boolean' }, ort: { type: 'string' }, begruendung: { type: 'string' } }, required: ['kennung', 'hart', 'ort', 'begruendung'] }
const JAGD = { type: 'object', properties: { funde: { type: 'array', items: FUND } }, required: ['funde'] }
const PRUEF = {
  type: 'object',
  properties: {
    urteile: { type: 'array', items: { type: 'object', properties: { nr: { type: 'integer' }, urteil: { type: 'string', enum: ['anerkannt', 'verworfen'] }, grund: { type: 'string' } }, required: ['nr', 'urteil', 'grund'] } },
    nachgetragen: { type: 'array', items: FUND },
  },
  required: ['urteile', 'nachgetragen'],
}
const voll = (l) => l.map((x) => (x.startsWith('/') ? x : (args.basis || '') + x))
// Kompaktform: args.kompakt = { "<seite>": { m375: [0,1,3], … } }, Pfad = <ansicht>/<slug>/<nn>.jpg; Text = args.texte_basis + slug + '.json'
const slug = (p) => (p === '/' ? 'start' : p.replace(/^\//, '').replace(/\//g, '__'))
if (args.kompakt) {
  args.material = {}; args.texte = {}
  for (const [s, ans] of Object.entries(args.kompakt)) {
    args.material[s] = Object.entries(ans).flatMap(([a, nr]) => nr.map((n) => `${a}/${slug(s)}/${String(n).padStart(2, '0')}.jpg`))
    args.texte[s] = args.texte_basis + slug(s) + '.json'
  }
}
const seiten = Object.keys(args.material)
const ergebnisse = await pipeline(
  seiten,
  (s) => agent(`Lies zuerst das Briefing ${BRIEF} und halte dich genau daran. Du bist der Slop-Jäger.\nSeite: ${s}\nText-Datei: ${args.texte[s]}\nBilder (mit dem Read-Werkzeug ansehen, alle):\n${voll(args.material[s]).join('\n')}\n\nGib die Fundliste zurück.`, { label: `jagd:${s}`, phase: 'Jagd', model: 'haiku', schema: JAGD }),
  (jagd, s) => {
    const liste = (jagd?.funde || []).map((f, i) => `${i + 1}. [${f.kennung}${f.hart ? ', hart' : ''}] ${f.ort} – ${f.begruendung}`).join('\n') || '(keine Funde gemeldet)'
    return agent(`Lies zuerst das Briefing ${BRIEF} und halte dich genau daran. Du bist der Gegenprüfer (Abschnitt „Gegenprüfer“).\nSeite: ${s}\nText-Datei: ${args.texte[s]}\nBilder:\n${voll(args.material[s]).join('\n')}\n\nFundliste des Slop-Jägers:\n${liste}\n\nGib für jede Nummer ein Urteil und die nachgetragenen Funde zurück.`, { label: `pruef:${s}`, phase: 'Gegenprüfung', model: 'opus', effort: 'high', schema: PRUEF })
      .then((p) => ({ seite: s, jagd: jagd?.funde || [], pruefung: p }))
  },
)
const out = {}
for (const e of ergebnisse.filter(Boolean)) {
  const anerkannt = e.jagd.filter((_, i) => e.pruefung?.urteile?.find((u) => u.nr === i + 1)?.urteil === 'anerkannt')
  const alle = [...anerkannt, ...(e.pruefung?.nachgetragen || [])]
  out[e.seite] = { weich: alle.filter((f) => !f.hart).length, hart: alle.filter((f) => f.hart).length, gemeldet: e.jagd.length, verworfen: e.jagd.length - anerkannt.length, nachgetragen: (e.pruefung?.nachgetragen || []).length, funde: alle, roh: e }
}
log(Object.entries(out).map(([s, v]) => `${s}: weich ${v.weich}, hart ${v.hart}`).join(' · '))
return { satz: args.satz, seiten: out }
