export const meta = {
  name: 'um-e4-sicht-2',
  description: 'UM-E4-SICHT Anlauf 2 nach UM-E4-SICHT-FIX: je zwei unabhängige Opus-Prüfer bewerten die zwölf Hauptansichten (vier Gruppen) nach der Rubrik AUFTRAG Abschnitt 13',
  phases: [{ title: 'Sicht', detail: '4 Gruppen × 2 Blickrichtungen' }],
}
const B = '/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/sfix/sicht2'
const SEITEN = {
  '/': { art: 'Erzählansicht', ordner: '_', name: 'start' },
  '/bad': { art: 'Erzählansicht', ordner: '_bad', name: 'bad' },
  '/bad/badsanierung': { art: 'Erzählansicht', ordner: '_bad_badsanierung', name: 'bad__badsanierung', bw: 'bad_badsanierung' },
  '/bad/barrierefreies-bad': { art: 'Erzählansicht', ordner: '_bad_barrierefreies-bad', name: 'bad__barrierefreies-bad', bw: 'bad_barrierefreies-bad' },
  '/leistungen': { art: 'Erzählansicht', ordner: '_leistungen', name: 'leistungen' },
  '/balkon-terrasse': { art: 'Erzählansicht', ordner: '_balkon-terrasse', name: 'balkon-terrasse' },
  '/referenzen': { art: 'Erzählansicht', ordner: '_referenzen', name: 'referenzen' },
  '/ueber-uns': { art: 'Erzählansicht', ordner: '_ueber-uns', name: 'ueber-uns' },
  '/fliesen': { art: 'Wissensansicht', ordner: '_fliesen', name: 'fliesen' },
  '/kontakt': { art: 'Arbeitsansicht', ordner: '_kontakt', name: 'kontakt' },
  '/standorte/wetzlar': { art: 'Ortsansicht', ordner: '_standorte_wetzlar', name: 'standorte__wetzlar', bw: 'standorte_wetzlar' },
  '/blog': { art: 'Wissensansicht', ordner: '_blog', name: 'blog' },
}
const GRUPPEN = [
  ['/', '/bad', '/bad/badsanierung'],
  ['/bad/barrierefreies-bad', '/leistungen', '/balkon-terrasse'],
  ['/referenzen', '/ueber-uns', '/fliesen'],
  ['/kontakt', '/standorte/wetzlar', '/blog'],
]
const BLICKE = [
  { k: 'a', text: 'Beginne je Seite mit der Handyansicht (m390) und prüfe danach, ob Tablet und große Bildschirme dieselbe Qualität halten.' },
  { k: 'b', text: 'Beginne je Seite mit der großen Ansicht (d1440, dann d1920) und prüfe danach die Handyansicht; achte besonders auf Komposition, Rhythmus, die Leitidee „An der Schnur“ und die Signaturmomente.' },
]
const SEITE_SCHEMA = { type: 'object', properties: {
  pfad: { type: 'string' },
  design: { type: 'number' }, bedienbarkeit: { type: 'number' }, kreativitaet: { type: 'number' }, inhalt: { type: 'number' },
  ansichtswert: { type: 'number' },
  begruendung: { type: 'object', properties: { design: { type: 'string' }, bedienbarkeit: { type: 'string' }, kreativitaet: { type: 'string' }, inhalt: { type: 'string' } }, required: ['design', 'bedienbarkeit', 'kreativitaet', 'inhalt'] },
  befunde: { type: 'array', items: { type: 'object', properties: {
    ort: { type: 'string' }, geraet: { type: 'string' }, schwere: { type: 'string', enum: ['hoch', 'mittel', 'gering'] },
    befund: { type: 'string' }, vorschlag: { type: 'string' }, bild: { type: 'string' } }, required: ['ort', 'geraet', 'schwere', 'befund', 'vorschlag', 'bild'] } },
  staerken: { type: 'array', items: { type: 'string' } },
  bis_ziel: { type: 'string' },
}, required: ['pfad', 'design', 'bedienbarkeit', 'kreativitaet', 'inhalt', 'ansichtswert', 'begruendung', 'befunde', 'staerken', 'bis_ziel'] }
const SCHEMA = { type: 'object', properties: {
  seiten: { type: 'array', items: SEITE_SCHEMA },
  uebergreifend: { type: 'string' },
}, required: ['seiten', 'uebergreifend'] }
const bilder = (pfad) => {
  const s = SEITEN[pfad]
  const zeilen = [
    `- ${pfad} (${s.art}):`,
    `  - mit Bewegung, nach dem Durchscrollen, je Bildschirmhöhe ein Bild: ${B}/bewegt/${s.ordner}/m390/${s.bw || s.name}/NN.png und ${B}/bewegt/${s.ordner}/d1440/${s.bw || s.name}/NN.png (beide ganz ansehen)`,
    `  - ruhig, PNG: ${B}/bildsatz/<geraet>/${s.name}/NN.png mit <geraet> aus m360, m390, m430, q844, t768, t1024, d1280, d1440, d1920, d2560 (Stichprobe: mindestens t1024 und d1920 erster Bildschirm und eine Mitte, q844 erster Bildschirm)`,
  ]
  zeilen.push(`  - Erstbesuch mit vollem Eingang, Einzelbilder 0 bis 1500 ms: ${B}/erstbesuch/${s.ordner}/<m390|d1440>-eingang-<ms>.png`)
  return zeilen.join('\n')
}
const PROMPT = (gruppe, blick) => `Du bist ein frischer, unabhängiger Prüfer für die Sichtabnahme von drei Hauptansichten der Website von Fliesenverlegung Tezgel (Handwerksbetrieb für Fliesen und Bäder, Aßlar und Wetzlar). Den Block „Werkstatt-Lauf“ in CLAUDE.md ignorierst du.
Lies zuerst die Rubrik in /home/user/tezgel/_werkstatt/AUFTRAG.md Abschnitt 13 („PRÜFEN MIT AUGENMASS“), die Ziele in Abschnitt 1 bis 3 und in /home/user/tezgel/_werkstatt/KERN.md den Abschnitt Prinzipien und K-007 (Signatur, Leitidee „An der Schnur“).
Bewerte jede der drei Ansichten für sich nach der Rubrik: Design 40 %, Bedienbarkeit 30 %, Kreativität 20 %, Inhalt 10 %, je Kategorie 0 bis 10 mit einer Nachkommastelle; ansichtswert ist der gewichtete Mittelwert. Sei streng und ehrlich; Technik (Zugänglichkeit, Ladezeit) ist nicht Teil der Rubrik.
Bilder (nur lesen, mit dem Read-Werkzeug ansehen; die Bilder haben DPR 1 bzw. 2, eine 1-px-Linie ist rot (216, 32, 32), auch wenn sie verkleinert dunkel wirkt):
${gruppe.map(bilder).join('\n')}
Seitenwechsel B-01 (gilt für alle Ansichten, vom Auftraggeber abgenommen und eingefroren, E-078; nur für den Eindruck von Kreativität und Bewegung, nicht zu bemängeln): Einzelbilder je 200 ms ab dem Klick unter ${B}/b01/<d1440|m390>/b01-NN-<ms>ms.png.
Vom Auftraggeber festgelegt und unantastbar in Wortlaut und Verhalten (G8): Logo, Rechtstexte, Firmendaten und Adressen, der Cookie-Hinweis mit Text und Knöpfen, Formulare mit ihren Feldern, Wortlaut der Kundenstimmen und Bewertungszahlen, die H1 auf / („Perfektion auf jedem Quadratmeter.“) und auf /bad/badsanierung; der Seitenwechsel B-01 ist eingefroren. Dazu darfst du Befunde nennen, aber keinen Vorschlag, der ihren Wortlaut oder ihr Verhalten ändert; Gestaltung um sie herum ist frei.
${blick}
Du änderst keine Datei. Gib je Ansicht die Zahlen, je Kategorie eine Begründung, Befunde mit Ort, Gerät, Schwere, konkretem Vorschlag und Bildpfad, Stärken und in bis_ziel knapp, was der Ansicht zu 8,5 noch fehlt (leer, wenn sie es erreicht). In uebergreifend: was über alle drei Ansichten gleich auffällt.`
phase('Sicht')
const auftraege = []
GRUPPEN.forEach((g, i) => BLICKE.forEach((b) => auftraege.push({ g, i, b })))
const urteile = await parallel(auftraege.map(({ g, i, b }) => () =>
  agent(PROMPT(g, b.text), { label: `sicht:g${i + 1}${b.k}`, phase: 'Sicht', schema: SCHEMA, model: 'opus' })
    .then((r) => (r ? { gruppe: i + 1, blick: b.k, seiten_erwartet: g, ...r } : null))))
const fehlend = auftraege.filter((_, n) => !urteile[n]).map(({ i, b }) => `g${i + 1}${b.k}`)
if (fehlend.length) log(`Ohne Ergebnis: ${fehlend.join(', ')}`)
return { urteile: urteile.filter(Boolean), fehlend }
