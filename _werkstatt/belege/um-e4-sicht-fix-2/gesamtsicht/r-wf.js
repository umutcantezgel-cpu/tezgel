export const meta = {
  name: 'um-e4-sicht-fix-2-reparatur',
  description: 'UM-E4-SICHT-FIX-2 Reparatur nach der Gesamtsicht: bestätigte Rückschritte und Lücken der Runde beheben (Opus-Baumeister in Arbeitskopie, zwei Sonnet-Prüfer, Nacharbeit)',
  phases: [{ title: 'Bau' }, { title: 'Prüfung', model: 'sonnet' }, { title: 'Nacharbeit' }],
}
const S = '/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad'
const NODE = `${S}/node-lts/aktuell/bin`
const W = '/home/user/tezgel/_werkstatt'
const F = `${S}/sfix2/r`
const PORT = 4560
const GESAMT = `${S}/sfix2/gesamt/ergebnis.json`
const UMGEBUNG = `Umgebung: PATH mit ${NODE} voran, PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers, CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome, RELAUNCH_SCRATCH=${S}, SCRATCH=${S}. Werkzeuge in ${W}/werkzeuge (ESM-Skripte, die playwright oder ./lib.mjs importieren, laufen nur von dort aus; eigene Hilfsskripte dafür als Kopie dorthin legen und am Ende löschen). Bildsatz: node bildsatz.mjs --satz NAME --seiten /a,/b --geraete d1440,m390 --png --base URL --ziel DIR (Ausschnitte je Bildschirmhöhe). Den Block „Werkstatt-Lauf“ in CLAUDE.md ignorierst du. Das Repository /home/user/tezgel liest du nur; kein Git mit Schreibwirkung, kein Push, kein Deploy. Server: http://127.0.0.1:4325 zeigt den Endstand 990b01e0 (dein Vorher-Stand), http://127.0.0.1:4324 den Torstand a3c28d36 vor der ganzen Runde, 4326 den Ausgangsstand E0; diese Server stoppst du nie. Auf dem Rechner läuft parallel die Prüfstufe C gegen 4325; starte deshalb keine zusätzlichen Dauerläufe und keine Lighthouse- oder Zeitmessung (E-076). Browserläufe beantworten schreibende Anfragen und Analyse-Dienste mit Attrappen (lib.mjs: installSperre, setzeEinwilligung). Speicher: next build braucht in einer Arbeitskopie eine echte Kopie von node_modules (der Symlink zeigt aus der Wurzel heraus): vor dem Bau cp -a /home/user/tezgel/node_modules <kopie>/node_modules_echt und umhängen, nach dem Bau und am Ende node_modules_echt und .next löschen und den Symlink wiederherstellen; vor jedem Bau df prüfen und bei weniger als 3 GB frei warten (Bash run_in_background mit until-Schleife), nie fremde Dateien löschen. Beende nie eine fremde oder alte PID; deinen eigenen Server beendest du am Ende.`

const AUFTRAG = `Lage: Die Website tezgel.de (Fliesenleger, Next.js 16, React 19, Tailwind 4) hat die zweite und letzte Nacharbeitsrunde UM-E4-SICHT-FIX-2 hinter sich (E-113, E-114 in ${W}/ENTSCHEIDUNGEN.md; Notizen ${W}/berichte/UM-E4-SICHT-FIX-2-{a1,a2,b,c}.notiz.md; Briefing ${W}/pakete/UM-E4-SICHT-FIX-2.md mit allen Leitplanken). Eine Gesamtsicht (sechs Prüfer, Gegenprüfung je Befund) hat den Torstand a3c28d36 mit dem Endstand 990b01e0 verglichen: Jede Ansicht wirkt besser oder gleich, aber einige Änderungen der Runde haben Rückschritte oder Lücken hinterlassen. Volle Befunde mit Bildpfaden, Ursache (Datei und Zeile) und vorgeschlagenem kleinsten Eingriff: ${GESAMT} (Feld bestaetigt; dazu je Ansicht ergebnisse[].sicht.befunde). Bilder: vorher ${S}/sfix/sicht2/bildsatz/<geraet>/<slug>/NN.png (a3c28d36), nachher ${S}/e5/c/bildsatz/<geraet>/<slug>/NN.png (990b01e0).

Dein Auftrag (Reparatur, nur Darstellung, Wortlaut unverändert), in dieser Reihenfolge:
R-1 /bad: Das neue Einstiegsfoto bad-beleg-2 zeigt im ersten Bildschirm nur Decke, Regal, Tür, Fenster; Wanne und Ornamentboden liegen unter dem Falz (vorher mit bad-beleg-1 mitten im ersten Bildschirm). Ziel: Fliesenarbeit im ersten Bildschirm auf m360, m390, q844, t1024, d1440, d2560. Weg: zurück auf bad-beleg-1 samt Rücktausch in beleg.fotos (Fassung aus a3c28d36, kein Foto zweimal auf der Seite), oder ein anderes vorhandenes Foto aus ARBEITEN (src/inhalte/arbeiten.ts, Güte A oder B), dessen erster Bildschirm bei 4 : 5 Fliesenarbeit zeigt. Keine neuen Dateien, keine neuen Zuschnitte (E-104 Nr. 6), kein Zuschnitt per CSS (K-006). Belege jede Wahl mit Bildern des ersten Bildschirms vorher/nachher.
R-2 /bad/barrierefreies-bad: dasselbe Muster. Das neue Einstiegsfoto barrierefrei-beleg-1 zeigt im ersten Bildschirm nur Milchglasfenster, Wandfliesen, Griff; „Dusche ohne Stufe“ (stufenloser Duschboden, Bank) fehlt. Ziel und Weg wie R-1 (Rückweg: bereich-dusche-streifen-sitzbank samt Rücktausch der Galeriereihe, Fassung aus a3c28d36).
R-3 /leistungen Formatregler: Die Wand bleibt blass (Wechselfliesen kalk 244 auf fliese 255, rund 1,08 : 1). Kleinster Eingriff nach Gegenprüfung: src/app/bewegung.css .formatregler-wechsel fill var(--color-fuge) statt var(--color-kalk), optional stärkeres Fugenband. Nur Tokens, Register und K-008 nur nachziehen, wenn eine Kennung oder ein Endzustand sich ändert.
R-4 /fliesen Raumliste auf dem Telefon: Das Vignettenfeld (96 px) lässt dem Text bei m360 nur rund 177 px (vorher 274). In src/components/vorlagen/teile/Tun.tsx die Telefonstufe wie bei LageZeichnung (Lage.tsx) einführen, z. B. hidden w-16 shrink-0 @xs:block @sm:w-24 lg:w-32 und innen p-1 @sm:p-2, Platzhalter gleich. Prüfe alle Ansichten mit Bereichszeilen und Vignetten.
R-5 /fliesen leere Felder: Die beiden Zeilen ohne Zeichnung (Fugensanierung, Fußbodenheizung) halten das Feld leer frei und lesen sich wie fehlende Bilder. Gib ihnen in src/inhalte/fliesen.ts je ein vorhandenes Verlegemuster (motiv) in derselben Größe, oder wähle eine andere Lösung, die das Loch schließt, ohne neue Zeichnungen und ohne Textänderung.
R-6 /referenzen Passstücke: Unter den äußeren Galeriespalten stehen zwei reinweiße Passstücke (fliese 255) auf grauer Fläche (kalk 97) und lesen sich wie leere Kacheln. Kennzeichne sie als geschnittenes Material wie die Passstücke der Plan-Zeichnungen (schraffiert unter 45°, E-040; Tokens, kein neuer Wert) oder löse es anders, sodass sie nicht als leere Kacheln lesen. Nur globals.css, ruhend; R-1 aus E-112 (Aufklappen) darf nicht langsamer werden: keine zusätzlichen Elemente, nur Pseudo-Elemente und Hintergrund.
R-7 /referenzen t768: Einleitung und „Mehr erfahren“ stehen mittig im Lesemaß, die Bereichsliste darunter voll breit: zwei linke Kanten 50 px auseinander. In Tun.tsx hält die voll breite Liste unter lg (bzw. @lg) dasselbe Lesemaß (mx-auto max-w-mass lg:@lg:max-w-none in einer Container-Hülle). Prüfe alle Ansichten mit bereicheVoll.
R-8 /ueber-uns t1024: Die drei Glasbild-Kacheln einer Reihe sind 29 px verschieden hoch (Namen brechen 3/2/3). Gleich hohe Kacheln, zusätzlicher Platz unter dem Namen, nicht unter dem Foto (z. B. src/app/(bestand)/ueber-uns/page.jsx h-full mit grid-rows-[auto_1fr]); prüfe dieselbe Reihe auf den anderen Ansichten mit Glasbild-Reihen.
R-9 Lesemaß des Lage-Vorspanns unter lg: src/components/vorlagen/teile/Lage.tsx (Zeile 126–127): Der Vorspann in fs-4 läuft unter lg voll breit (q844 rund 82 Zeichen je Zeile) bzw. springt an eine eigene linke Kante x 32 neben der Leitachse. Ihn in satzMass('achse') hüllen wie den Zusatz (Zeile 150–151). Betroffen laut Gesamtsicht: /ueber-uns (q844, t768), /bad/badsanierung und /bad/barrierefreies-bad (t768, q844), /leistungen (t768).
R-10 /referenzen: Das Kantenkreuz an der unteren Kante der Tinte-Bühne ist in Tinte gezeichnet und verschwindet zur Hälfte. Auf Tinte in Kalk zeichnen wie das Lot (EV-C4), oben und unten gleich.
R-11 (nur wenn klein und sicher) /standorte/wetzlar t768: „Gießen“ steht als einzelner Link allein in einer zweiten Zeile, und die rote Linie des Einzugsbands endet 16 px vor der rechten Kante.

Leitplanken (verbindlich): G8 unantastbar (Logo, Rechtstexte, Firmendaten, Adressen, Cookie-Einwilligung, Formulare und /api/anfrage in Verhalten, Feldern und Wortlaut, Wortlaut der Kundenstimmen, Bewertungszahlen, H1 auf / und /bad/badsanierung). Wortlaut bleibt (K-011); Textideen nur in die Notiz. B-01 eingefroren (E-078), Eingang (E-081) und Bewegungsschalter (E-080) unverändert. Nur Tokens (werte.mjs ohne neuen Befund), ein Stylesheet je Seite, kein zusätzliches JavaScript, Bewegung nur transform/opacity mit Registereintrag. Tests nicht lockern (G7); ändert sich ein erwarteter Endzustand, die Erwartung begründet anpassen, nie abschwächen. CSS-Budget: Das gebaute Stylesheet liegt bei 25.601 B gzip; Reparatur höchstens +600 B. Kein Foto zweimal auf derselben Seite, nur Bilder aus ARBEITEN. Die Mail-Logik (src/lib/email, src/app/api/anfrage) ist tabu.

Arbeitskopie ${F}/baum (Abzug von 990b01e0, node_modules verlinkt); ${F}/vor ist derselbe Stand und bleibt unverändert. Dein Produktionsbau läuft auf Port ${PORT} (next start -p ${PORT} in baum).`

const BAU = { type: 'object', properties: {
  massnahmen: { type: 'array', items: { type: 'string' }, description: 'je R-n: umgesetzt, wie, betroffene Ansichten' }, entscheidungsvermerke: { type: 'array', items: { type: 'string' } },
  pixel_gewollt: { type: 'array', items: { type: 'string' } }, textvorschlaege: { type: 'array', items: { type: 'string' } },
  npm_test: { type: 'string' }, tsc: { type: 'string' }, eslint: { type: 'string' }, werte: { type: 'string' }, build: { type: 'string' },
  specs: { type: 'string' }, axe: { type: 'string' }, erstesbild: { type: 'string' }, css_zuwachs: { type: 'string' }, diff_pfad: { type: 'string' }, notiz_pfad: { type: 'string' },
  bilder_probe: { type: 'string' }, dateien: { type: 'array', items: { type: 'string' } }, offene_fragen: { type: 'array', items: { type: 'string' } } },
  required: ['massnahmen', 'entscheidungsvermerke', 'pixel_gewollt', 'textvorschlaege', 'npm_test', 'tsc', 'eslint', 'werte', 'build', 'specs', 'axe', 'erstesbild', 'css_zuwachs', 'diff_pfad', 'notiz_pfad', 'bilder_probe', 'dateien', 'offene_fragen'] }
const BEFUNDE = { type: 'object', properties: { befunde: { type: 'array', items: { type: 'object', properties: {
  datei: { type: 'string' }, zeile: { type: 'string' }, schwere: { type: 'string', enum: ['hoch', 'mittel', 'gering'] },
  befund: { type: 'string' }, beleg: { type: 'string' }, vorschlag: { type: 'string' } }, required: ['datei', 'schwere', 'befund', 'beleg', 'vorschlag'] } },
  gesamturteil: { type: 'string' } }, required: ['befunde', 'gesamturteil'] }
const NACH = { type: 'object', properties: { behoben: { type: 'array', items: { type: 'string' } }, nicht_behoben: { type: 'array', items: { type: 'string' } },
  npm_test: { type: 'string' }, tsc: { type: 'string' }, eslint: { type: 'string' }, werte: { type: 'string' }, build: { type: 'string' },
  erstesbild: { type: 'string' }, css_zuwachs: { type: 'string' }, diff_pfad: { type: 'string' }, notiz_pfad: { type: 'string' } },
  required: ['behoben', 'nicht_behoben', 'npm_test', 'tsc', 'eslint', 'werte', 'build', 'erstesbild', 'css_zuwachs', 'diff_pfad', 'notiz_pfad'] }

phase('Bau')
const bau = await agent(`Du bist Baumeister für die Reparatur nach der Gesamtsicht von UM-E4-SICHT-FIX-2.
${AUFTRAG}
Lies zuerst: das Briefing, in ${GESAMT} die bestätigten Befunde (bestaetigt[]) und die Befunde deiner Ansichten, die Notizen der Runde zu den betroffenen Stellen und die Dateien, die du änderst.
Nachweise vor der Abgabe: npm test, npx tsc --noEmit, npx eslint (geänderte Dateien), node werte.mjs über die geänderten Dateien, next build; erstesbild.mjs für jede betroffene Ansicht (m360 mit 200 %, q844, m390, d1440); Bildsatz als PNG vorher (4325) und nachher (${PORT}) je betroffener Ansicht bei d1440 und m390, für R-1, R-2, R-7, R-9 auch t768, q844 und t1024, unter ${F}/bilder/vor und ${F}/bilder/nach; Playwright-Specs der betroffenen Funktionen (cd ${W}/werkzeuge; RELAUNCH_BASE=http://127.0.0.1:${PORT} npx playwright test <specs>), axe.mjs --zustaende auf den betroffenen Ansichten; CSS-Zuwachs des gebauten Stylesheets in gzip gegenüber vor. Sieh dir dein Ergebnis selbst an, bevor du abgibst.
Ergebnis: Diff ${F}/UM-E4-SICHT-FIX-2-r.diff (diff -ruN vor baum, ohne node_modules, node_modules_echt, .next, bilder, next-env.d.ts, tsconfig.tsbuildinfo) und Notiz ${F}/UM-E4-SICHT-FIX-2-r.notiz.md (je R-n Stand, Entscheidungsvermerke, gewollte Pixeländerungen je Ansicht, Textvorschläge, offene Fragen, Prüfzahlen). Entscheidungsvermerk heißt: ein kurzer schriftlicher Vermerk zu jeder Abweichung vom Auftrag (Ziel, Alternativen, Wirkung, Risiko, Rückweg).
${UMGEBUNG}`, { label: 'bau:r', phase: 'Bau', schema: BAU })
if (!bau) return { bau: null }

const LINSEN = [
  'Linse WIRKUNG: Ist jeder Befund R-1 bis R-11 wirklich behoben, gemessen an der Rubrik (AUFTRAG Abschnitt 13)? Vergleiche selbst Bilder vorher (4325) und nachher (eigener Bau) in d1440, m390, t768, q844 und t1024; achte auf neue Schwächen auf allen Ansichten, die dieselben Bausteine nutzen (Tun.tsx, Lage.tsx, Glasbild-Reihen, globals.css, bewegung.css): Überlappung, Lücken, schwebende Linien, zu große oder unscharfe Fotos, gebrochene Hierarchie, zwei Kanten nebeneinander, Rhythmus. Melde auch, wo der Auftrag erfüllt ist, die Wirkung aber ausbleibt.',
  'Linse LEITPLANKEN: Berührt der Diff Unantastbares (G8) oder B-01, Eingang, Bewegungsschalter? Wortlaut unverändert? Nur Bilder aus ARBEITEN, kein Foto zweimal auf derselben Seite, keine neuen Zuschnitte? Nur Tokens (werte.mjs), ein Stylesheet je Seite, CSS-Zuwachs ≤ 600 B gzip, kein zusätzliches JavaScript? Register und Bewegung stimmig (jede Kennung im Register, ruhig und reduziert als Endzustand)? Tests nicht gelockert (G7)? Laufen npm test, tsc, eslint und die Playwright-Specs der betroffenen Funktionen grün, axe ohne Befund, erstesbild ohne neuen Ausfall (Hauptknopf und Telefon im ersten Bildschirm)?',
]
phase('Prüfung')
const pruef = (await parallel(LINSEN.map((text, i) => () => agent(
  `Du prüfst unabhängig den Diff der Reparatur von UM-E4-SICHT-FIX-2: ${F}/UM-E4-SICHT-FIX-2-r.diff (Arbeitskopie ${F}/baum, vorher ${F}/vor, Notiz ${F}/UM-E4-SICHT-FIX-2-r.notiz.md, Bilder ${F}/bilder).
${AUFTRAG}
${text}
Du änderst keine Datei in baum, vor oder im Repository. Eigene Bilder und Skripte nur unter ${F}/pruef-${i}; deinen Bau machst du in einer eigenen Kopie von baum unter ${F}/pruef-${i} auf Port ${PORT + 2 + i}; Vorher-Bilder aus ${F}/bilder/vor oder von 4325. Am Ende node_modules_echt und .next deiner Kopie löschen und deinen Server beenden. Melde nur belegte Befunde mit Datei, Zeile und Beleg.
${UMGEBUNG}`,
  { label: `pruef:r:${i}`, phase: 'Prüfung', schema: BEFUNDE, model: 'sonnet' },
)))).filter(Boolean)
const alle = pruef.flatMap((x) => x.befunde)
let nach = null
if (alle.length) {
  phase('Nacharbeit')
  nach = await agent(`Du bist der Baumeister der Reparatur von UM-E4-SICHT-FIX-2 in der Nacharbeit. Arbeitskopie ${F}/baum, vorher ${F}/vor, Notiz ${F}/UM-E4-SICHT-FIX-2-r.notiz.md.
${AUFTRAG}
Prüfe jeden Befund selbst nach und behebe jeden bestätigten Befund der Schwere hoch oder mittel; geringe, wenn klar richtig und klein. Widerlegte mit Begründung unter nicht_behoben. Danach Prüfzahlen neu (npm test, tsc, eslint, werte, next build, erstesbild, CSS-Zuwachs), Bildsatz nachher unter ${F}/bilder/nach erneuern, Diff ${F}/UM-E4-SICHT-FIX-2-r.diff neu erzeugen und die Notiz ergänzen (Abschnitt Nacharbeit). Port ${PORT}. Am Ende node_modules_echt und .next löschen, Symlink wiederherstellen, deinen Server beenden.
${UMGEBUNG}
Befunde (JSON): ${JSON.stringify(alle)}`, { label: 'nach:r', phase: 'Nacharbeit', schema: NACH })
}
log(`Reparatur: ${alle.length} Befunde der Prüfer, Nacharbeit ${nach ? 'fertig' : 'nicht nötig'}`)
return { bau, pruefungen: pruef, nacharbeit: nach }
