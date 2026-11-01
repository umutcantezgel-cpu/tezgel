export const meta = {
  name: 'um-e4-sicht-fix-2-gesamtsicht',
  description: 'Gesamtsicht nach UM-E4-SICHT-FIX-2: zwölf Hauptansichten Torstand a3c28d36 gegen Endstand, Befunde in zwei Linsen gegenprüfen (nur lesend)',
  phases: [
    { title: 'Sichten', detail: 'je Ansicht ein Prüfer: Vorhaben sichtbar? Rückschritte?' },
    { title: 'Gegenprüfen', detail: 'je Befund (hoch/mittel) zwei Linsen: Bild und Ursache' },
  ],
}

const S = '/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad'
const ENDSHA = (args && args.endsha) || 'bce95087'
const ANSICHTEN = [
  ['/', 'start'], ['/bad', 'bad'], ['/bad/badsanierung', 'bad__badsanierung'], ['/bad/barrierefreies-bad', 'bad__barrierefreies-bad'],
  ['/leistungen', 'leistungen'], ['/fliesen', 'fliesen'], ['/balkon-terrasse', 'balkon-terrasse'], ['/referenzen', 'referenzen'],
  ['/ueber-uns', 'ueber-uns'], ['/kontakt', 'kontakt'], ['/standorte/wetzlar', 'standorte__wetzlar'], ['/blog', 'blog'],
]

const BEFUND = {
  type: 'object',
  properties: {
    geraet: { type: 'string' },
    bild: { type: 'string', description: 'voller Pfad des Einzelbilds NACHHER, in dem man den Befund sieht' },
    bild_vorher: { type: 'string', description: 'voller Pfad des entsprechenden Einzelbilds VORHER, falls vorhanden' },
    ort: { type: 'string', description: 'wo im Bild (Abschnitt, Element, ungefähre Höhe)' },
    beschreibung: { type: 'string' },
    schwere: { type: 'string', enum: ['hoch', 'mittel', 'niedrig'] },
    art: { type: 'string', enum: ['rueckschritt', 'vorhaben_fehlt', 'vorhaben_unvollstaendig', 'altbestand', 'beobachtung'] },
    vermutete_ursache: { type: 'string', description: 'Datei/Komponente und Paket (A1, A2, B, C, Nachtrag), soweit erkennbar' },
  },
  required: ['geraet', 'bild', 'ort', 'beschreibung', 'schwere', 'art'],
}
const SICHT = {
  type: 'object',
  properties: {
    seite: { type: 'string' },
    vorhaben: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          massnahme: { type: 'string', description: 'Kennung aus den Notizen, z. B. M2-A2, M2-B3' },
          sichtbar: { type: 'string', enum: ['ja', 'teilweise', 'nein', 'nicht_pruefbar'] },
          beleg: { type: 'string' },
        },
        required: ['massnahme', 'sichtbar', 'beleg'],
      },
    },
    befunde: { type: 'array', items: BEFUND },
    gesamturteil: { type: 'string', description: 'zwei bis vier Sätze: wirkt die Ansicht nach der Runde besser, gleich oder schlechter, und warum' },
    gesehene_bilder: { type: 'integer' },
  },
  required: ['seite', 'vorhaben', 'befunde', 'gesamturteil', 'gesehene_bilder'],
}
const URTEIL = {
  type: 'object',
  properties: {
    bestaetigt: { type: 'boolean' },
    altbestand: { type: 'boolean', description: 'true, wenn derselbe Mangel schon im Torstand a3c28d36 zu sehen ist' },
    folge_der_runde: { type: 'boolean', description: 'true, wenn der Mangel aus einer Änderung zwischen a3c28d36 und dem Endstand folgt' },
    schwere: { type: 'string', enum: ['hoch', 'mittel', 'niedrig', 'kein'] },
    begruendung: { type: 'string' },
    ursache: { type: 'string', description: 'Datei und Zeile, soweit gefunden' },
    behebung: { type: 'string', description: 'kleinster Eingriff, der den Mangel behebt, ohne G8 und ohne Textänderung; leer, wenn keiner' },
  },
  required: ['bestaetigt', 'altbestand', 'folge_der_runde', 'schwere', 'begruendung'],
}

const GEMEINSAM = `Du prüfst NUR LESEND. Du änderst keine Datei im Repository, startest keinen Server, keinen Browser und keine Messung (auf dem Rechner laufen gerade Zeitmessungen der Prüfstufe C). Du committest nicht. Erlaubt: Read auf Bilder und Dateien, Grep/Glob, git show/diff/log (nur lesend), kleine python3-Aufrufe mit PIL zum Ausschneiden oder Vergrößern von Bildausschnitten in ${S}/sfix2/gesamt/ausschnitte/ (eigener Unterordner je Ansicht).

Lage: Die Website tezgel.de (Fliesenleger, Next.js) ist in einer zweiten und letzten Nacharbeitsrunde UM-E4-SICHT-FIX-2 überarbeitet worden. Vorher = Torstand a3c28d36 (vor der Runde), nachher = Endstand ${ENDSHA}. Die Runde bestand aus Stufe 1 (Paket A1) und Stufe 2 (Pakete A2, B, C und ein Nachtrag des Orchestrators). Was jede Maßnahme bewirken sollte, steht in den Notizen /home/user/tezgel/_werkstatt/berichte/UM-E4-SICHT-FIX-2-{a1,a2,b,c}.notiz.md, im Endplan /home/user/tezgel/_werkstatt/belege/um-e4-sicht-fix-2/endplan.json und in den Entscheidungen E-113 (und dem Entwurf E-114 in ${S}/sfix2/e114-entwurf.md) in /home/user/tezgel/_werkstatt/ENTSCHEIDUNGEN.md. Der Code-Unterschied: git -C /home/user/tezgel diff a3c28d36 ${ENDSHA} -- src.

Bilder (PNG, Einwilligung abgelehnt, Bewegung reduziert, also Endzustände ohne Animation):
- Vergleichsbögen ${S}/sfix2/gesamt/boegen/<slug>-<geraet>-<von>.png: links VORHER, rechts NACHHER, je bis zu vier Bildschirmausschnitte in Lesefolge ab Ausschnitt <von> (0, 4, 8, 12), verkleinert auf 560 px Breite. Geräte m390, t768, d1440.
- Volle Einzelbilder: VORHER ${S}/sfix/sicht2/bildsatz/<geraet>/<slug>/NN.png, NACHHER ${S}/e5/c/bildsatz/<geraet>/<slug>/NN.png, Geräte m360 m390 m430 q844 t768 t1024 d1280 d1440 d1920 d2560 (q844 = Querformat Telefon). Die Seitenhöhen unterscheiden sich, Ausschnitt NN vorher und nachher zeigen deshalb nicht immer dieselbe Stelle.
- Unter Bildschirmausschnitten liegt oft ein fester unterer Balken (Cookies, Anrufen, WhatsApp, Termin) und oben der Kopf; das ist gewollt.

Leitplanken, die du bei Vorschlägen beachtest: Texte und Wortlaut bleiben (keine Textänderung vorschlagen, nur Darstellung). Unantastbar (G8): Logo, Rechtstexte, Firmendaten, Adressen, Cookie-Einwilligung, Formulare in Logik und Feldern, /api/anfrage, Bewertungen und Wortlaut der Kundenstimmen, die H1 auf / und /bad/badsanierung. Der Seitenwechsel B-01 ist eingefroren.`

const sichtPrompt = (seite, slug) => `${GEMEINSAM}

Deine Ansicht: ${seite} (slug ${slug}).

Aufgabe:
1. Suche in den Notizen und im Endplan alle Maßnahmen, die ${seite} betreffen (auch geteilte Bausteine: Vorlagen ErzaehlSeite/WissensSeite/OrtsSeite, teile/*, Abschnitt, Versprechen, Einstieg, Formular). Prüfe für jede, ob sie im NACHHER-Bild sichtbar und gelungen ist. Beleg = Bildpfad und Stelle.
2. Suche Rückschritte: alles, was NACHHER schlechter aussieht oder bricht als VORHER: Überlappungen, abgeschnittener oder überlaufender Text, Elemente außerhalb der Achse oder des Rasters, unbeabsichtigte Lücken oder leere Flächen, doppelte Linien, verrutschte Bilder, falscher Bildausschnitt, Kontrastverlust, fehlende Elemente, unruhiger Rhythmus, Brüche an einzelnen Breiten. Schau dir alle Bögen für m390, t768 und d1440 an und mindestens je zwei volle Einzelbilder für m360, q844, t1024 und d2560 dort, wo die Seite sich geändert hat. Vergrößere Ausschnitte, wenn eine Kante oder Linie unklar ist.
3. Ordne jeden Befund ein: rueckschritt (folgt aus der Runde), vorhaben_fehlt, vorhaben_unvollstaendig, altbestand (schon VORHER so), beobachtung. Schwere: hoch = fällt Besuchern sofort auf oder bricht die Gestaltung, mittel = sichtbar bei genauem Hinsehen, niedrig = Feinschliff.
Melde nur, was du im Bild selbst gesehen hast, mit vollem Bildpfad. Keine Vermutungen ohne Bild. Wenn alles in Ordnung ist, ist eine leere Befundliste richtig.`

const pruefPrompt = (seite, b, linse) => `${GEMEINSAM}

Ein Prüfer meldet auf ${seite} diesen Befund:
${JSON.stringify(b, null, 2)}

Versuche den Befund zu WIDERLEGEN, in zwei Linsen (${linse}):
1. BILD: Öffne das genannte NACHHER-Bild in voller Größe (und die benachbarten Ausschnitte sowie dieselbe Stelle auf zwei anderen Geräten), vergrößere die Stelle. Ist der Mangel wirklich da, und ist er VORHER an derselben Stelle (suche sie im VORHER-Bildsatz, die Ausschnittnummer kann abweichen) schon genauso (dann altbestand=true)?
2. URSACHE: Finde im Code (git -C /home/user/tezgel diff a3c28d36 ${ENDSHA} -- src, dazu die Komponenten der Ansicht), ob eine Änderung der Runde genau diese Stelle betrifft, oder ob es ein Messartefakt des Bildsatzes ist (Schnittkante zwischen zwei Ausschnitten, fester Kopf oder unterer Balken, noch nicht geladenes Bild, reduzierte Bewegung zeigt Endzustand). Nenne Datei und Zeile. Schlage den kleinsten Eingriff vor, der es behebt, nur Darstellung, ohne G8 und ohne Textänderung.
bestaetigt=true nur, wenn der Mangel im Bild eindeutig da ist und kein Messartefakt ist. Im Zweifel bestaetigt=false.`

// Auf diesem Rechner laufen höchstens zwei Agenten gleichzeitig (4 Kerne): sechs Prüfer zu je zwei Ansichten, Gegenprüfung je
// Befund (hoch/mittel, Rückschritt oder Lücke) in einem Agenten mit beiden Linsen.
const GRUPPEN = []
for (let i = 0; i < ANSICHTEN.length; i += 2) GRUPPEN.push(ANSICHTEN.slice(i, i + 2))
const SICHT_GRUPPE = { type: 'object', properties: { ansichten: { type: 'array', items: SICHT } }, required: ['ansichten'] }
const ergebnisse = (await pipeline(
  GRUPPEN,
  (g) => agent(g.map(([seite, slug]) => sichtPrompt(seite, slug)).join('\n\n---\nZWEITE ANSICHT derselben Prüfung (gleiche Regeln, eigener Eintrag in ansichten):\n'),
    { label: `sicht:${g.map((x) => x[1]).join('+')}`, phase: 'Sichten', schema: SICHT_GRUPPE }),
  (res, g) => {
    const liste = (res && res.ansichten) || []
    return parallel(liste.map((sicht) => () => {
      const seite = sicht.seite
      const slug = (g.find((x) => x[0] === seite) || [seite, seite.replace(/\//g, '_')])[1]
      const wichtig = (sicht.befunde || []).filter((b) => (b.schwere === 'hoch' || b.schwere === 'mittel') && b.art !== 'altbestand' && b.art !== 'beobachtung')
      if (wichtig.length < (sicht.befunde || []).length) log(`${seite}: ${(sicht.befunde || []).length - wichtig.length} Befunde (niedrig, Altbestand, Beobachtung) ohne Gegenprüfung weitergereicht`)
      return parallel(wichtig.map((b, i) => () =>
        agent(pruefPrompt(seite, b, 'beide'), { label: `pruef:${slug}:${i + 1}`, phase: 'Gegenprüfen', schema: URTEIL })
          .then((u) => ({ befund: b, urteil: u, bestaetigt: !!(u && u.bestaetigt && !u.altbestand) }))))
        .then((gepruefte) => ({ seite, sicht, gepruefte: gepruefte.filter(Boolean) }))
    }))
  },
)).flat().filter(Boolean)

const bestaetigt = []
for (const e of ergebnisse) for (const g of e.gepruefte || []) if (g.bestaetigt) bestaetigt.push({ seite: e.seite, ...g })
log(`${bestaetigt.length} bestätigte Rückschritte oder Lücken (hoch/mittel)`)
return { endsha: ENDSHA, bestaetigt, ergebnisse }
