export const meta = {
  name: 'tezgel-jury',
  description: 'Jury aus drei frischen Opus-Agenten je Seite nach Rubrik, nur Bildmaterial, optional mit Lockvogel',
  phases: [{ title: 'Jury', detail: 'je Seite drei unabhängige Urteile' }],
}
// args: { satz, material: { "<seite>": ["<bildpfad>", …] }, lockvogel: { "<seite>": ["<bildpfad>", …] } | null }
const KAT = { type: 'object', properties: { wert: { type: 'number' }, belege: { type: 'array', items: { type: 'string' }, minItems: 2 } }, required: ['wert', 'belege'] }
const URTEIL = {
  type: 'object',
  properties: {
    design: KAT, bedienbarkeit: KAT, kreativitaet: KAT, inhalt: KAT,
    schwaechen: { type: 'array', items: { type: 'object', properties: { schwaeche: { type: 'string' }, reparatur: { type: 'string' } }, required: ['schwaeche', 'reparatur'] }, minItems: 3 },
  },
  required: ['design', 'bedienbarkeit', 'kreativitaet', 'inhalt', 'schwaechen'],
}
const SCHEMA_EINZEL = { type: 'object', properties: { urteil: URTEIL }, required: ['urteil'] }
const SCHEMA_PAAR = { type: 'object', properties: { seite_1: URTEIL, seite_2: URTEIL }, required: ['seite_1', 'seite_2'] }
const BRIEF = '/home/user/tezgel/_relaunch/pakete/_vorlage-jury.md'
// Pfade dürfen relativ zu args.basis (bzw. args.basis_lockvogel) angegeben werden
const voll = (b, l) => l.map((x) => (x.startsWith('/') ? x : (b || '') + x))
for (const k of Object.keys(args.material)) args.material[k] = voll(args.basis, args.material[k])
if (args.lockvogel) for (const k of Object.keys(args.lockvogel)) args.lockvogel[k] = voll(args.basis_lockvogel, args.lockvogel[k])
const seiten = Object.keys(args.material)
phase('Jury')
const jobs = []
for (const s of seiten) for (let j = 1; j <= 3; j++) jobs.push({ s, j })
const ergebnisse = await parallel(jobs.map(({ s, j }) => async () => {
  const eigen = args.material[s]
  const lock = args.lockvogel && args.lockvogel[s]
  // Lockvogel: Reihenfolge je Jurymitglied wechseln, unbeschriftet
  const lockZuerst = lock && j % 2 === 0
  const prompt = lock
    ? `Lies zuerst das Jury-Briefing ${BRIEF} und halte dich genau daran.\nDu bewertest ZWEI Fassungen derselben Website-Seite getrennt und unabhängig voneinander (es gibt keine richtige Rangfolge; bewerte jede für sich gegen die Anker).\n\nSEITE 1 – Bilder (mit dem Read-Werkzeug ansehen):\n${(lockZuerst ? lock : eigen).join('\n')}\n\nSEITE 2 – Bilder:\n${(lockZuerst ? eigen : lock).join('\n')}\n\nGib für seite_1 und seite_2 je ein vollständiges Urteil nach Rubrik zurück.`
    : `Lies zuerst das Jury-Briefing ${BRIEF} und halte dich genau daran.\nBewerte diese Website-Seite. Bilder (mit dem Read-Werkzeug ansehen, alle):\n${eigen.join('\n')}\n\nGib ein vollständiges Urteil nach Rubrik zurück.`
  const r = await agent(prompt, { label: `jury:${s}:${j}`, phase: 'Jury', model: 'opus', effort: 'high', schema: lock ? SCHEMA_PAAR : SCHEMA_EINZEL })
  if (!r) return null
  if (lock) return { seite: s, jurorin: j, urteil: lockZuerst ? r.seite_2 : r.seite_1, lockvogel: lockZuerst ? r.seite_1 : r.seite_2 }
  return { seite: s, jurorin: j, urteil: r.urteil }
}))
const gew = (u) => Math.round((0.4 * u.design.wert + 0.3 * u.bedienbarkeit.wert + 0.2 * u.kreativitaet.wert + 0.1 * u.inhalt.wert) * 100) / 100
const out = {}
for (const s of seiten) {
  const us = ergebnisse.filter(Boolean).filter((e) => e.seite === s)
  const med = (k) => { const v = us.map((e) => e.urteil[k].wert).sort((a, b) => a - b); return v[Math.floor(v.length / 2)] }
  const m = { design: med('design'), bedienbarkeit: med('bedienbarkeit'), kreativitaet: med('kreativitaet'), inhalt: med('inhalt') }
  out[s] = { urteile: us, median: m, gewichtet: Math.round((0.4 * m.design + 0.3 * m.bedienbarkeit + 0.2 * m.kreativitaet + 0.1 * m.inhalt) * 100) / 100, einzel_gewichtet: us.map((e) => gew(e.urteil)), lockvogel_gewichtet: us.filter((e) => e.lockvogel).map((e) => gew(e.lockvogel)) }
}
log(seiten.map((s) => `${s}: ${out[s].gewichtet}`).join(' · '))
return { satz: args.satz, seiten: out }
