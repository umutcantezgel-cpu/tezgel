export const meta = {
  name: 'fuenf-sekunden-basis',
  description: 'Fünf-Sekunden-Probe: 5 frische Haiku-Erstbetrachter je Bild (erster Bildschirm), Antworten roh',
  phases: [{ title: 'Erstbetrachter', model: 'haiku' }],
}
const SCHEMA = {
  type: 'object',
  properties: {
    angebot: { type: 'string', description: 'Was bietet die Firma an? (1 Satz)' },
    zielgruppe: { type: 'string', description: 'Für wen ist das Angebot? (1 Satz)' },
    naechster_schritt: { type: 'string', description: 'Was soll ich als Besucher als Nächstes tun? (1 Satz)' },
    sicherheit: { type: 'integer', minimum: 1, maximum: 5, description: '1 = geraten, 5 = sofort klar' },
  },
  required: ['angebot', 'zielgruppe', 'naechster_schritt', 'sicherheit'],
}
const DIR = args.dir
const bilder = args.bilder
const laeufe = []
for (const b of bilder) for (let i = 1; i <= 5; i++) laeufe.push({ b, i })
phase('Erstbetrachter')
const res = await parallel(laeufe.map(({ b, i }) => () => agent(
  `Du bist ein Besucher, der eine Website zum ersten Mal sieht (Durchgang ${i}). Lies genau eine Datei: das Bild ${DIR}/${b}.jpg mit dem Read-Werkzeug. ` +
  `Es zeigt den ersten Bildschirm, so wie er beim Öffnen erscheint. Lies keine anderen Dateien, nutze kein Web, kein Bash, keine Suche. ` +
  `Antworte aus dem ersten Eindruck von etwa fünf Sekunden, auf Deutsch, knapp: Was bietet die Firma an? Für wen ist das Angebot? Was soll ich als Besucher als Nächstes tun? ` +
  `Wenn etwas nicht erkennbar ist, sag das ehrlich, statt zu raten.`,
  { label: `${b}#${i}`, phase: 'Erstbetrachter', model: 'haiku', schema: SCHEMA }
).then((r) => (r ? { bild: b, durchgang: i, ...r } : null))))
return res.filter(Boolean)