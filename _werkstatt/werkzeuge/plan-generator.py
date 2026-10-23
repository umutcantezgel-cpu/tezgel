# PLAN.md Fassung 1.1 (nach Planprüfung Runde 1)
import re, json, collections
OUT='/home/user/tezgel/_werkstatt/PLAN.md'
P='src/app/(bestand)'
def page(p): return f"`{P}{'' if p=='/' else p}/page.{ 'tsx' if p in TSX else 'jsx'}`"
import os, glob
TSX=set()
for f in glob.glob('/home/user/tezgel/src/app/(bestand)/**/page.*', recursive=True):
    rel=f.split('(bestand)')[1].rsplit('/page.',1)
    if f.endswith('.tsx') and not f.endswith('.dev.tsx'): TSX.add(rel[0] or '/')
def pagefile(p):
    base='/home/user/tezgel/src/app/(bestand)'+('' if p=='/' else p)
    for ext in ('tsx','jsx'):
        if os.path.exists(f'{base}/page.{ext}'): return f"`{P}{'' if p=='/' else p}/page.{ext}`"
    raise SystemExit('fehlt '+p)
STUFE={'Orchestrator':'3','Juror':'3','Prüfer':'1','Probeläufer':'1','Dokumentar':'1','Texter':'2','Lektor':'2','Baumeister':'2','Grafiker':'2','Bildbearbeiter':'2','Testschreiber':'2'}
rows=[]
def R(k,geg,rolle,schreib,abh,krit,welle):
    modell='Opus' if rolle in ('Orchestrator','Juror') else 'Haiku'
    rolle_anz='Prüfer' if rolle=='Testschreiber' else rolle
    rows.append((k,geg,rolle_anz,modell,STUFE[rolle],schreib,abh,krit,welle))
S='`$SCRATCH/{}/**`'
HAUPT=['/bad','/bad/badsanierung','/bad/barrierefreies-bad','/leistungen','/fliesen','/balkon-terrasse','/referenzen','/ueber-uns','/kontakt','/standorte/[stadt]','/blog']
RECHT=['/agb','/barrierefreiheit','/cookie-richtlinie','/datenschutz','/impressum','/widerruf']
STATISCH="/ /agb /ausstellung/giessen /ausstellung/wetzlar /bad /bad/bad-aus-einer-hand /bad/badanfrage /bad/badplaner /bad/badsanierung /bad/barrierefreies-bad /bad/fliesen /bad/musterbaeder /bad/projekt-check /balkon-terrasse /balkon-terrasse/balkonsanierung /balkon-terrasse/stelzlager /balkon-terrasse/terrassenplatten /barrierefreiheit /beratung /blog /cookie-richtlinie /datenschutz /downloads /faq /fliesen /fliesen/abnahme /fliesen/auf-fussbodenheizung /fliesen/festpreisangebot /fliesen/fliesenarten /fliesen/flur-diele /fliesen/fugensanierung /fliesen/grossformat /fliesen/holzoptik /fliesen/konfigurator /fliesen/kueche /fliesen/neubau /fliesen/renovierung /fliesen/verlegemuster /fliesen/verlegetechnik /fliesenreparatur /foerderung /impressum /karriere /karriere/ausbildung /kontakt /leistungen /login /naturstein /naturstein/granit /naturstein/marmor-kalkstein /partner /preise /referenzen /schadensanalyse /standorte /team /termin /treppen /treppen/aussentreppe /treppen/innentreppe /treppen/treppenhaus /ueber-uns /untergrund-abdichtung /untergrund-abdichtung/ausgleich-gefaelle /untergrund-abdichtung/din-18534 /untergrund-abdichtung/entkopplung /untergrund-abdichtung/estrich-belegreife /untergrund-abdichtung/fliesen-auf-fliesen /unternehmen /widerruf".split()
ARBEIT={'/kontakt','/termin','/beratung','/preise','/downloads','/login','/bad/badanfrage','/bad/badplaner','/bad/projekt-check','/fliesen/konfigurator','/fliesen/festpreisangebot'}
def art(p):
    if p in RECHT: return 'recht'
    if p.startswith('/standorte'): return 'ort'
    if p in ARBEIT: return 'arbeit'
    if p in ('/fliesen','/faq','/foerderung','/blog','/bad/musterbaeder') or p.startswith('/fliesen/') or p.startswith('/untergrund-abdichtung') or p.count('/')==2 and p.split('/')[1] in ('balkon-terrasse','naturstein','treppen'): return 'wissen'
    return 'erzaehl'
VORLAGE={'erzaehl':'ErzaehlSeite','wissen':'WissensSeite','ort':'OrtsSeite','arbeit':'ArbeitsSeite'}
VORL_PKG={'erzaehl':'E3-ORCH-01a','wissen':'E3-ORCH-01b','ort':'E3-ORCH-01c','arbeit':'E3-ORCH-01d'}
REFTXT={'erzaehl':'`_werkstatt/texte/REF-bereich-barrierefreies-bad.md`','wissen':'`_werkstatt/texte/REF-wissen-din-18534.md`','ort':'`_werkstatt/texte/REF-ort-wetzlar.md`','arbeit':'`_werkstatt/texte/REF-start.md` (Abschnitt Anfrage)'}
def slug(p): return 'start' if p=='/' else p.strip('/').replace('/','-').replace('[','').replace(']','')
# ======================= E1 Nachtrag: Lektorat der Referenztexte (Befund R2-2)
for i,(f,sl) in enumerate([('REF-start.md','/'),('REF-bereich-barrierefreies-bad.md','/bad/barrierefreies-bad'),('REF-wissen-din-18534.md','/untergrund-abdichtung/din-18534'),('REF-ort-wetzlar.md','/standorte/wetzlar')],1):
    R(f'E1-LEKT-REF-{i}',f'Lektorat des Referenztexts für `{sl}` (Befunde als Liste, der Orchestrator ändert den Text)','Lektor',S.format(f'E1-LEKT-REF-{i}'),'E1-ORCH-01','Z-12','E1-W1')
# ======================= E2
R('E2-ORCH-W0','Werkzeugbibliotheken für Bild und Logo eintragen (sharp, potrace, Schrift Plus Jakarta Sans als Datei, E-011)','Orchestrator','`_werkstatt/werkzeuge/package.json`, `_werkstatt/werkzeuge/package-lock.json`','E1-PRUEF-PLAN','Z-06, Z-13','E2-W0')
R('E2-PRUEF-00','Spur der LCP auf `/` mobil: Trace, LCP-Element, Kette bis zum ersten Malen, Anteil von Schrift, Startzuständen und Hydrierung','Prüfer',S.format('E2-PRUEF-00'),'E0-PRUEF-03L','Z-08','E2-W1')
R('E2-PRUEF-INP','Werkzeug `reaktion.mjs` für die Reaktion (INP über `PerformanceObserver`, fünf Handlungen, m390, 4-fach gedrosselt) mit Positivprobe; Ausgangswert auf 4310','Prüfer','`_werkstatt/werkzeuge/reaktion.mjs`, `_werkstatt/werkzeuge/tests-logik/reaktion-probe.html`, `_werkstatt/belege/e0/reaktion.json`','E2-ORCH-W0','Z-08','E2-W1')
R('E2-ORCH-00','Ursache der LCP auf `/` beheben','Orchestrator',f'`{P}/_dokument.tsx`, `src/app/globals.css`, `src/app/bewegung.css`, `src/components/start/Einstieg.tsx`','E2-PRUEF-00','Z-08','E2-W1')
R('E2-ORCH-01','Tokens v3 aus K-005 (Glanz, Schatten, `ease-hammer`, Dauern von B-01 und B-02)','Orchestrator','`src/app/globals.css`','E2-ORCH-00','Z-03','E2-W1')
R('E2-ORCH-01b','Register v3 (K-007): neue Einträge, entfallende Einträge markiert, Werte-Regeln angeglichen','Orchestrator','`src/lib/motion/register.ts`, `_werkstatt/register.json`, `_werkstatt/werkzeuge/werte-regeln.json`, `test/bewegung.test.mjs`','E2-ORCH-01','Z-03, Z-05','E2-W1')
R('E2-FIX-01a','Bewertungszeile ohne „527“ (Trenner zwischen Note und Zahl, auch im Textinhalt)','Orchestrator','`src/components/reviews/GoogleReviewsBadge.tsx`','—','Z-12, G8','E2-W1')
R('E2-FIX-01b','Bewertungszahl nur aus `src/config/reviews.js` (alle harten „27“)','Orchestrator',f'`src/components/ui/FinalCTA.tsx`, `src/components/maps/LocalDominanceMap.tsx`, `src/app/llms.txt/route.ts`, `src/lib/schema.ts`, `{P}/standorte/[stadt]/page.tsx`','E2-FIX-01a','Z-12, G8','E2-W1')
R('E2-FIX-01c','Kundenstimmen in den strukturierten Daten wörtlich aus `src/config/reviews.js`','Orchestrator','`src/lib/schema.ts`','E2-FIX-01b','Z-14, G8','E2-W1')
R('E2-BILD-01','Bildwerkzeug `bilder.mjs` (Ränder weg, Ausrichtung, Belichtung, Weißabgleich, Zuschnitt nach Schwerpunkt, keine Hochskalierung, Metadaten weg, unscharfer Platzhalter, Prüfmodus `--pruefe`) mit Tests','Bildbearbeiter','`_werkstatt/werkzeuge/bilder.mjs`, `_werkstatt/werkzeuge/tests-logik/bilder.test.mjs`','E2-ORCH-W0','Z-13','E2-W1')
R('E2-BILD-02','Webfassungen der Bildplätze von `/` und der 11 Hauptansichten nach `_werkstatt/bildplaetze.md`','Bildbearbeiter','`public/images/arbeiten/**`, `_werkstatt/bilder/arbeiten-e2.json`','E2-BILD-01','Z-13','E2-W1')
R('E2-ORCH-05a','Logo-Vektor, Wortmarke aus Schriftkonturen (Stufe 3 nach Auftrag Abschnitt 5)','Orchestrator','`_werkstatt/werkzeuge/logo/wortmarke.mjs`, `src/components/intro/logo-pfade.ts`','E2-ORCH-W0','Z-06','E2-W1')
R('E2-ORCH-05b','Logo-Vektor, Maskottchen per Farbebenen-Nachzeichnung, zu wenigen glatten Pfaden bereinigt','Orchestrator','`_werkstatt/werkzeuge/logo/maskottchen.mjs`, `src/components/intro/logo-pfade.ts`','E2-ORCH-05a','Z-06','E2-W1')
R('E2-PRUEF-05','Deckungsmessung des Logo-Vektors bei doppelter Größe (Flächen ≥ 98 %, Farben exakt)','Prüfer','`_werkstatt/werkzeuge/logo/deckung.mjs`, `_werkstatt/belege/e2/logo-deckung.json`','E2-ORCH-05b','Z-06','E2-W1')
for k,g,sch,abh in [('E2-ORCH-02a','Glossardaten aus K-011 (Begriffe, Formen, Erklärung ≤ 15 Wörter)','`src/config/glossar.ts`','E2-ORCH-01'),
                    ('E2-ORCH-02h','Baustein `Fachwort` (dfn mit Erklärung beim ersten Vorkommen je Seite)','`src/components/kern/Fachwort.tsx`','E2-ORCH-02a'),
                    ('E2-ORCH-02b','Baustein `Seitenformel` (sechs Abschnitte, Kennzeichnung für die Prüfung)','`src/components/kern/Seitenformel.tsx`','E2-ORCH-01'),
                    ('E2-ORCH-02c','Baustein `Bildfeld` v3 (next/image, feste Maße, `sizes`, Platzhalter) und Bilddaten','`src/components/kern/Bildfeld.tsx`, `src/config/arbeiten.ts`','E2-BILD-02'),
                    ('E2-ORCH-02d','Baustein `Hauptknopf` („Termin vor Ort anfragen“, `data-hauptknopf`) auf Basis von `Knopf`','`src/components/kern/Hauptknopf.tsx`, `src/components/kern/Knopf.tsx`','E2-ORCH-01'),
                    ('E2-ORCH-02e','Baustein `Brotkrumen` mit strukturierten Daten','`src/components/kern/Brotkrumen.tsx`','E2-ORCH-01'),
                    ('E2-ORCH-02f','Baustein `Fliesenkomposition` für Bildplätze ohne Foto','`src/components/kern/Fliesenkomposition.tsx`','E2-ORCH-01'),
                    ('E2-ORCH-02g','Schaufenster der neuen Bausteine (nur Entwicklung)',f'`{P}/werkstatt-schaufenster/bausteine/page.dev.tsx`','E2-ORCH-02h, E2-ORCH-02b, E2-ORCH-02c, E2-ORCH-02d, E2-ORCH-02e, E2-ORCH-02f')]:
    R(k,g,'Orchestrator',sch,abh,'Z-03, Z-12, Z-13','E2-W1')
R('E2-TEST-02','Tests der Glossarlogik (erstes Vorkommen, Erklärung ≤ 15 Wörter, Begriffsformen)','Testschreiber','`test/glossar.test.mjs`','E2-ORCH-02h','Z-12','E2-W1')
rows.append(('E2-PRUEF-A1','Stufe A für E2-W1 (Typprüfung, Linter, betroffene Tests, Lesbarkeit, Bild mobil und Desktop), unabhängig','Prüfer','Haiku','1',S.format('E2-PRUEF-A1'),'alle Pakete E2-W1','Z-02','E2-W1'))
for k,g,sch,abh in [('E2-ORCH-03a','Navigationsdaten nach K-009 (fünf Hauptpunkte, eine Ebene, Hauptknopf, Telefon)','`src/config/navigation.js`','E2-ORCH-02d'),
                    ('E2-ORCH-03e','Kopf mit Markierung der aktuellen Seite, Hauptknopf und Telefon','`src/components/common/Header.jsx`, `src/components/layout/HeaderWrapper.tsx`','E2-ORCH-03a'),
                    ('E2-ORCH-03b','Mobilmenü ohne Scrollen auf 360 × 740','`src/components/common/MobileMenu.jsx`','E2-ORCH-03a'),
                    ('E2-ORCH-03c','Untere Leiste (Anrufen, WhatsApp, Termin → `/kontakt`), Querformat ≤ 25 % mit Kopf','`src/components/layout/MobileBottomBar.tsx`','E2-ORCH-03a'),
                    ('E2-ORCH-03d','Fuß als vollständige, geordnete Übersicht aller Bereiche','`src/components/common/Footer.jsx`','E2-ORCH-03a')]:
    R(k,g,'Orchestrator',sch,abh,'Z-09, Z-11','E2-W2')
R('E2-ORCH-04','B-01 „Verlegen“: Überlagerung, Klick-Abfangen, Zustandsautomat, Zurück und Vor, Wartephase, reduzierte Bewegung, Eintrag im Testskript','Orchestrator',f'`src/components/verlegen/Verlegen.tsx`, `src/lib/verlegen/raster.ts`, `src/lib/verlegen/linkfilter.ts`, `src/lib/verlegen/automat.ts`, `{P}/_dokument.tsx`, `src/app/bewegung.css`, `package.json` (nur Skript `test`)','E2-ORCH-01b','Z-05, Z-07, Z-08','E2-W2')
R('E2-ORCH-04b','Plan-Morph `/leistungen → [id]` entfernen (ein System für Seitenwechsel, E-010)','Orchestrator',f'`src/components/leistungen/uebersicht/PlanUebergang.jsx`, `src/components/leistungen/Gewerk.tsx`, `src/components/leistungen/detail/Planfeld.tsx`, `{P}/leistungen/page.jsx`, `{P}/leistungen/[id]/page.jsx`, `src/app/bewegung.css`','E2-ORCH-04','Z-05','E2-W2')
R('E2-TEST-04','Logik-Tests B-01: Drittelverband, Größenwahl ≤ 80, Zeitplan ohne Überholen, Linkfilter mit allen Ausnahmen, Zustandsautomat (Doppelklick, Wartephase, Abbruch), Dauern 1.200, 900 und 70 %','Testschreiber','`test/verlegen.test.mjs`','E2-ORCH-04','Z-05','E2-W2')
R('E2-PRUEF-04','Ablauftest B-01 im Browser: Klick, Zurück, Vor, Doppelklick, Ausnahmen, Fokus auf H1, Layoutverschiebung während des Wechsels, reduzierte Bewegung','Prüfer','`_werkstatt/werkzeuge/tests/verlegen.spec.mjs`','E2-ORCH-04','Z-05, Z-07','E2-W2')
rows.append(('E2-PRUEF-A2','Stufe A für E2-W2, unabhängig','Prüfer','Haiku','1',S.format('E2-PRUEF-A2'),'alle Pakete E2-W2','Z-02','E2-W2'))
R('E2-ORCH-05','B-02 Intro als Ersatz-Intro „Der erste Boden“ (E-018): kleine Fläche im Drittelverband, Original-Logo als Bild, Gleiten in den Kopf, Abbruch, reduzierte Bewegung, Kopfschalter',
  'Orchestrator',f'`src/components/intro/Intro.tsx`, `src/lib/motion/kopfskript.ts`, `{P}/_dokument.tsx`, `src/app/bewegung.css`','E2-ORCH-05a, E2-ORCH-03e, E2-ORCH-04b','Z-05, Z-06, Z-08','E2-W3')
R('E2-TEST-05','Tests Intro-Schalter (erster Besuch, Speicher fehlt, reduzierte Bewegung, Abbruchereignisse)','Testschreiber','`test/intro.test.mjs`','E2-ORCH-05','Z-05','E2-W3')
R('E2-ORCH-06','Startseite nach `_werkstatt/texte/REF-start.md` (Text vom Orchestrator): erster Bildschirm, Lage-Fliesen, Was wir tun, Ablauf, Beleg, Formular `#termin`; Preisrechner und Express-Anfrage nicht mehr auf `/`','Orchestrator',f'`{P}/page.tsx`, `src/components/start/**`','E2-ORCH-00, E2-ORCH-02h, E2-ORCH-02b, E2-ORCH-02c, E2-ORCH-02d, E2-ORCH-03e, E2-BILD-02','Z-04, Z-11, Z-12, Z-13','E2-W3')
R('E2-ORCH-06b','Großer Moment `startbild` (Startbild legt sich frei)','Orchestrator','`src/components/momente/startbild/**`','E2-ORCH-06, E2-ORCH-05','Z-05, Z-08','E2-W3')
R('E2-ORCH-07','404 mit verrutschter Fliese und drei Wegen (Text vom Orchestrator)','Orchestrator',f'`{P}/not-found.tsx`, `src/app/global-not-found.tsx`','E2-ORCH-02d','Z-11','E2-W3')
R('E2-LEKT-404','Lektorat des 404-Texts (Befunde als Liste)','Lektor',S.format('E2-LEKT-404'),'E2-ORCH-07','Z-12','E2-W3')
R('E2-PRUEF-TESTS','Funktionsspecs an neue Orte anpassen (F-01 auf `/kontakt` und `/#termin`, F-02 und F-03 ohne `/`, F-13 neue Navigation)','Testschreiber','`_werkstatt/werkzeuge/tests/funktion-hero-kontakt.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-preisrechner.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-express-funnel.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-navigation.spec.mjs`','E2-ORCH-06, E2-ORCH-03d','Z-02','E2-W3')
rows.append(('E2-PRUEF-A3','Stufe A für E2-W3, unabhängig','Prüfer','Haiku','1',S.format('E2-PRUEF-A3'),'alle Pakete E2-W3','Z-02','E2-W3'))
R('E2-PRUEF-B','Stufe B für `/` (alle Werkzeuge, 10 Geräte, Lighthouse mit Intro, Reaktion)','Prüfer','`_werkstatt/belege/e2/**`','E2-PRUEF-A3','Z-02 bis Z-09','E2-Tor')
for i,(pp,ger) in enumerate([('P1','m390'),('P1','d1440'),('P5','m390'),('P5','d1440')],1):
    R(f'E2-PROBE-0{i}',f'Probelauf {pp} auf {ger}, A1 bis A3','Probeläufer',f'`_werkstatt/cache/probelauf/e2/{pp}-{ger}-*/**`','E2-PRUEF-B','Z-11','E2-Tor')
R('E2-DOK-01','Bildsatz der Referenzansicht nach `_werkstatt/bilder/e2/` (≤ 1440 px)','Dokumentar','`_werkstatt/bilder/e2/**`','E2-PRUEF-B','Z-10','E2-Tor')
R('E2-SICHT','Sichtabnahme der Referenzansicht nach Award-Rubrik, Ziel Ansichtswert ≥ 8 (frischer Opus-Unteragent, Auftrag Abschnitt 5)','Juror','`_werkstatt/berichte/E2-SICHT.md` (legt der Orchestrator aus der Rückgabe ab)','E2-DOK-01','Z-04','E2-Tor')
# ======================= E3
for k,v,g in [('E3-ORCH-01a','ErzaehlSeite','Erzählseiten'),('E3-ORCH-01b','WissensSeite','Wissensseiten'),('E3-ORCH-01c','OrtsSeite','Ortsseiten'),('E3-ORCH-01d','ArbeitsSeite','Arbeitsseiten')]:
    R(k,f'Vorlage `{v}` für {g} nach Seitenformel K-009','Orchestrator',f'`src/components/vorlagen/{v}.tsx`','E2-SICHT','Z-03, Z-11','E3-W1')
MOM=[('schichten','/bad','Was unter der Fliese steckt (Untergrund, Abdichtung, Kleber, Fliese, Fuge), scrollgebunden','E3-ORCH-01a'),
     ('weg','/bad/badsanierung','Vom Anruf bis zur letzten Fuge als Weg mit Stationen','E3-ORCH-01a'),
     ('gefaelle-dusche','/bad/barrierefreies-bad','Wasser läuft über das Gefälle zum Ablauf','E3-ORCH-01a'),
     ('gefaelle-balkon','/balkon-terrasse','Regen läuft vom Balkon ab','E3-ORCH-01a'),
     ('formatregler','/leistungen','Formatvergleich 60 × 60 gegen 120 × 260 als Regler','E3-ORCH-01a'),
     ('verband','/fliesen','Verlegemuster zum Ausprobieren (Kreuzfuge, Halbverband, Drittelverband, Fischgrät)','E3-ORCH-01b'),
     ('vorher-nachher','/referenzen','Vorher-Nachher-Regler (Außentreppe IMG_2527 → IMG_2525)','E3-ORCH-01a'),
     ('galerie-filter','/referenzen','Galerie „Unsere Arbeiten“ mit Filter nach Raum','E3-ORCH-01a'),
     ('karte','/ueber-uns','Gezeichnete Einsatzkarte mit Aßlar in der Mitte (auch `/standorte`)','E3-ORCH-01a')]
MOM_PKG=collections.defaultdict(list)
for i,(k,s,t,v) in enumerate(MOM,1):
    kk=f'E3-GRAF-{i:02d}'; MOM_PKG[s].append(kk)
    R(kk,f'Großer Moment `{k}` für `{s}`: {t}; Registereintrag als Datei, reduzierte Bewegung, Budget','Grafiker',f'`src/components/momente/{k}/**`, `_werkstatt/register/{k}.json`',v+(', E3-BILD-01' if k in ('vorher-nachher','galerie-filter') else ''),'Z-04, Z-05','E3-W1')
R('E3-BILD-01','Webfassungen aller übrigen Bildplätze aus `_werkstatt/bildplaetze.md` (Galerie, Seitenbilder, Artikel, Ortsseiten, Musterbäder, OG-Bild 1200 × 630)','Bildbearbeiter','`public/images/arbeiten/**`, `public/images/og/tezgel-og.jpg`, `_werkstatt/bilder/arbeiten-e3.json`','E2-BILD-02','Z-13','E3-W1')
REF_SEITEN={'/bad/barrierefreies-bad':'`_werkstatt/texte/REF-bereich-barrierefreies-bad.md`','/standorte/[stadt]':'`_werkstatt/texte/REF-ort-wetzlar.md`'}
txt_pkg={}
n=0
for p in HAUPT:
    if p in REF_SEITEN: continue
    n+=1; s=slug(p); a='ort' if p.startswith('/standorte') else art(p)
    R(f'E3-TEXT-{n:02d}',f'Text `{p}` ({a}) nach Seitenformel und {REFTXT[a]}','Texter',f'`_werkstatt/texte/{s}.md`','E2-SICHT','Z-12','E3-W1')
    R(f'E3-LEKT-{n:02d}',f'Lektorat `{p}` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe)','Lektor',f'`_werkstatt/texte/{s}.md`',f'E3-TEXT-{n:02d}','Z-12','E3-W2')
    txt_pkg[p]=f'E3-LEKT-{n:02d}'
CITIES1='Aßlar, Wetzlar, Solms, Braunfels, Ehringshausen, Leun, Hüttenberg'
for j,(grp) in enumerate(['Orte 1 bis 7 aus `src/config/cities.ts`','Orte 8 bis 13 aus `src/config/cities.ts`'],1):
    R(f'E3-TEXT-ORTE-{j}',f'Ortstexte {grp} als JSON (nur echte Angaben: Entfernung, Region, Anfahrt), nach `_werkstatt/texte/REF-ort-wetzlar.md`','Texter',f'`_werkstatt/texte/orte-{j}.json`','E2-SICHT','Z-12','E3-W1')
    R(f'E3-LEKT-ORTE-{j}',f'Lektorat Ortstexte {grp}','Lektor',f'`_werkstatt/texte/orte-{j}.json`',f'E3-TEXT-ORTE-{j}','Z-12','E3-W2')
R('E3-ORCH-02a','Registereinträge der großen Momente übertragen','Orchestrator','`src/lib/motion/register.ts`, `_werkstatt/register.json`, `test/bewegung.test.mjs`',', '.join(f'E3-GRAF-{i:02d}' for i in range(1,10)),'Z-05','E3-W2')
R('E3-ORCH-02b','Ortstexte übertragen','Orchestrator','`src/config/cities.ts`','E3-LEKT-ORTE-1, E3-LEKT-ORTE-2','Z-12','E3-W2')
R('E3-ORCH-02c','Leistungstexte der Übersicht übertragen','Orchestrator','`src/config/services.js`',txt_pkg['/leistungen'],'Z-12','E3-W2')
R('E3-ORCH-02d','Bilddaten der Welle übertragen','Orchestrator','`src/config/arbeiten.ts`','E3-BILD-01','Z-13','E3-W2')
rows.append(('E3-PRUEF-A1','Stufe A für E3-W1, unabhängig','Prüfer','Haiku','1',S.format('E3-PRUEF-A1'),'alle Pakete E3-W1','Z-02','E3-W1'))
rows.append(('E3-PRUEF-A2','Stufe A für E3-W2','Prüfer','Haiku','1',S.format('E3-PRUEF-A2'),'alle Pakete E3-W2','Z-02, Z-12','E3-W2'))
n=0
for p in HAUPT:
    n+=1; s=slug(p); a='ort' if p.startswith('/standorte') else art(p)
    pf="`src/app/(bestand)/standorte/[stadt]/page.tsx`" if '[stadt]' in p else pagefile(p)
    quelle=REF_SEITEN.get(p, f'`_werkstatt/texte/{s}.md`')
    abh=[txt_pkg.get(p,'E3-ORCH-02b' if 'stadt' in p else 'E3-ORCH-01a'), VORL_PKG[a]]+MOM_PKG.get(p,[])+(['E3-ORCH-02b'] if 'stadt' in p and 'E3-ORCH-02b' not in [txt_pkg.get(p)] else [])+(['E3-GRAF-09'] if p=='/standorte/[stadt]' else [])+['E3-ORCH-02d']
    abh=list(dict.fromkeys(abh))
    R(f'E3-BAU-{n:02d}',f'Seite `{p}` nach Vorlage `{VORLAGE[a]}`, Text aus {quelle}, Bilder nach `_werkstatt/bildplaetze.md`','Baumeister',f'{pf}, `src/components/seiten/{s}/**`',', '.join(abh),'Z-04, Z-09, Z-11, Z-13','E3-W3')
rows.append(('E3-PRUEF-A3','Stufe A für E3-W3, unabhängig','Prüfer','Haiku','1',S.format('E3-PRUEF-A3'),'alle Pakete E3-W3','Z-02','E3-W3'))
R('E3-PRUEF-B','Stufe B der 12 Hauptansichten','Prüfer','`_werkstatt/belege/e3/**`','E3-PRUEF-A3','Z-02 bis Z-09','E3-Tor')
pers=[('P1','m390','d1440'),('P2','t768','d1440'),('P3','m360','d1440'),('P4','d1280','m390'),('P5','m390','d1440')]
k=0
for pp,eig,and_ in pers:
    for g in (eig,and_):
        k+=1; R(f'E3-PROBE-{k:02d}',f'Probelauf {pp} auf {g}, A1 bis A6','Probeläufer',f'`_werkstatt/cache/probelauf/e3/{pp}-{g}-*/**`','E3-PRUEF-B','Z-11','E3-Tor')
R('E3-DOK-01','Bildsatz der Hauptansichten nach `_werkstatt/cache/bilder/e3/` für die Sichtabnahme','Dokumentar','`_werkstatt/cache/bilder/e3/**`','E3-PRUEF-B','Z-04','E3-Tor')
R('E3-SICHT','Sichtabnahme der Hauptansichten nach Rubrik (Orchestrator am Bildsatz)','Orchestrator','`_werkstatt/berichte/E3-SICHT.md`','E3-DOK-01','Z-04','E3-Tor')
# ======================= E4
rest=[p for p in STATISCH if p not in HAUPT and p not in RECHT and p!='/']
gruppen=[rest[i::3] for i in range(3)]
n=0
for gi,gr in enumerate(gruppen,1):
    for p in gr:
        n+=1; s=slug(p); a=art(p)
        if p=='/untergrund-abdichtung/din-18534':
            R(f'E4-BAU-{n:02d}',f'Seite `{p}` nach Vorlage `{VORLAGE[a]}`, Text aus `_werkstatt/texte/REF-wissen-din-18534.md` (Referenztext)','Baumeister',f'{pagefile(p)}, `src/components/seiten/{s}/**`',f'{VORL_PKG[a]}','Z-04, Z-09, Z-11, Z-13',f'E4-W{gi+2}')
            continue
        R(f'E4-TEXT-{n:02d}',f'Text `{p}` ({a}) nach Seitenformel und {REFTXT[a]}','Texter',f'`_werkstatt/texte/{s}.md`','E3-SICHT','Z-12',f'E4-W{gi}')
        R(f'E4-LEKT-{n:02d}',f'Lektorat `{p}`','Lektor',f'`_werkstatt/texte/{s}.md`',f'E4-TEXT-{n:02d}','Z-12',f'E4-W{gi+1}')
        R(f'E4-BAU-{n:02d}',f'Seite `{p}` nach Vorlage `{VORLAGE[a]}`, Text aus `_werkstatt/texte/{s}.md`','Baumeister',f'{pagefile(p)}, `src/components/seiten/{s}/**`',f'E4-LEKT-{n:02d}, {VORL_PKG[a]}','Z-04, Z-09, Z-11, Z-13',f'E4-W{gi+2}')
for i,r in enumerate(RECHT,1):
    R(f'E4-BAU-RECHT-{i}',f'Darstellung `{r}` in der Vorlage `ArbeitsSeite`, Inhalt unverändert (G8)','Baumeister',pagefile(r),'E3-ORCH-01d','Z-04, Z-09, G8','E4-W1')
R('E4-TEXT-LEIST','Texte der 4 Leistungen (`bad`, `wohnen`, `aussen`, `untergrund`) als JSON','Texter','`_werkstatt/texte/leistungen.json`','E3-SICHT','Z-12','E4-W1')
R('E4-LEKT-LEIST','Lektorat der Leistungstexte','Lektor','`_werkstatt/texte/leistungen.json`','E4-TEXT-LEIST','Z-12','E4-W2')
R('E4-ORCH-01a','Leistungstexte übertragen','Orchestrator','`src/config/services.js`','E4-LEKT-LEIST','Z-12','E4-W2')
R('E4-BAU-LEIST','Vorlage `/leistungen/[id]` (4 Seiten)','Baumeister',f'`{P}/leistungen/[id]/page.jsx`, `{P}/leistungen/[id]/layout.jsx`','E4-ORCH-01a, E3-ORCH-01a','Z-04, Z-11, Z-12','E4-W3')
for sid in ['bad','wohnen','aussen','untergrund']:
    R(f'E4-TEXT-LS-{sid}',f'Bausteine der 13 Seiten Leistung `{sid}` × Ort als JSON (nur echte Angaben)','Texter',f'`_werkstatt/texte/leistung-ort-{sid}.json`','E3-SICHT','Z-12','E4-W1')
    R(f'E4-LEKT-LS-{sid}',f'Lektorat Leistung `{sid}` × Ort','Lektor',f'`_werkstatt/texte/leistung-ort-{sid}.json`',f'E4-TEXT-LS-{sid}','Z-12','E4-W2')
R('E4-ORCH-01b','Bausteine Leistung × Ort in eine neue Datendatei übertragen','Orchestrator','`src/config/leistung-ort.ts`','E4-LEKT-LS-bad, E4-LEKT-LS-wohnen, E4-LEKT-LS-aussen, E4-LEKT-LS-untergrund','Z-12','E4-W2')
R('E4-BAU-LS','Vorlage `/leistungen/[id]/[stadt]` (52 Seiten)','Baumeister',f'`{P}/leistungen/[id]/[stadt]/page.tsx`','E4-ORCH-01b, E3-ORCH-01c','Z-04, Z-11, Z-12','E4-W3')
for j,(von,bis) in enumerate([(1,6),(7,12)],1):
    R(f'E4-TEXT-MUSTER-{j}',f'Texte der Musterbäder {von} bis {bis} (`src/config/musterbaeder.js`) als JSON','Texter',f'`_werkstatt/texte/musterbaeder-{j}.json`','E3-SICHT','Z-12','E4-W1')
    R(f'E4-LEKT-MUSTER-{j}',f'Lektorat Musterbäder {von} bis {bis}','Lektor',f'`_werkstatt/texte/musterbaeder-{j}.json`',f'E4-TEXT-MUSTER-{j}','Z-12','E4-W2')
R('E4-ORCH-01c','Musterbad-Texte übertragen','Orchestrator','`src/config/musterbaeder.js`','E4-LEKT-MUSTER-1, E4-LEKT-MUSTER-2','Z-12','E4-W2')
R('E4-BAU-MUSTER','Vorlage `/bad/musterbaeder/[slug]` (12 Seiten)','Baumeister',f'`{P}/bad/musterbaeder/[slug]/page.jsx`','E4-ORCH-01c, E3-ORCH-01b','Z-04, Z-11, Z-12','E4-W3')
R('E4-BAU-BLOG','Vorlage `/blog/[slug]` (Lesemodus nach `WissensSeite`, absoluter Canonical)','Baumeister',f'`{P}/blog/[slug]/page.jsx`, `{P}/blog/[slug]/layout.jsx`','E3-ORCH-01b','Z-04, Z-12, Z-14','E4-W1')
POSTS=sorted(x[:-3] for x in os.listdir('/home/user/tezgel/src/config/posts'))
for i,ps in enumerate(POSTS,1):
    R(f'E4-TEXT-POST-{i:02d}',f'Artikel `/blog/{ps}` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md`','Texter',f'`src/config/posts/{ps}.js`','E4-BAU-BLOG, E3-ORCH-02d','Z-12, Z-13','E4-W2')
    R(f'E4-LEKT-POST-{i:02d}',f'Lektorat `/blog/{ps}`','Lektor',f'`src/config/posts/{ps}.js`',f'E4-TEXT-POST-{i:02d}','Z-12','E4-W3')
for w in range(1,6):
    rows.append((f'E4-PRUEF-A{w}',f'Stufe A für E4-W{w}, unabhängig','Prüfer','Haiku','1',S.format(f'E4-PRUEF-A{w}'),f'alle Pakete E4-W{w}','Z-02, Z-12',f'E4-W{w}'))
R('E4-PRUEF-B','Stufe B der Etappe (Hauptansichten und Stichprobe der neuen Seiten)','Prüfer','`_werkstatt/belege/e4/**`','E4-PRUEF-A5','Z-02 bis Z-14','E4-Tor')
R('E4-DOK-01','Bildsatz der Stichprobe nach `_werkstatt/cache/bilder/e4/`','Dokumentar','`_werkstatt/cache/bilder/e4/**`','E4-PRUEF-B','Z-04','E4-Tor')
R('E4-SICHT','Sichtabnahme der Stichprobe nach Rubrik (Orchestrator)','Orchestrator','`_werkstatt/berichte/E4-SICHT.md`','E4-DOK-01','Z-04','E4-Tor')
# ======================= E5
R('E5-TEXT-REF','Texte der 6 Referenz-Themenansichten mit echten Fotos (ohne erfundene Projektangaben) als JSON','Texter','`_werkstatt/texte/referenzen.json`','E3-SICHT','Z-12','E5-W1')
R('E5-LEKT-REF','Lektorat der Referenztexte','Lektor','`_werkstatt/texte/referenzen.json`','E5-TEXT-REF','Z-12','E5-W2')
R('E5-ORCH-01e','Referenztexte und Kennzeichnung übertragen (`placeholder` entfällt nur mit echten Fotos)','Orchestrator','`src/config/projects.js`','E5-LEKT-REF','Z-12, Z-13','E5-W2')
R('E5-BAU-01','Referenzseiten `/referenzen/[id]` als ehrliche Themenansichten; ohne passende Fotos meldet der Baumeister die Adresse für eine 308 auf die gefilterte Galerie','Baumeister',f'`{P}/referenzen/[id]/page.jsx`, `{P}/referenzen/[id]/layout.jsx`','E5-ORCH-01e','Z-12, Z-14','E5-W3')
R('E5-ORCH-01a','Generatorbilder aus den Leistungsdaten entfernen (E-013)','Orchestrator','`src/config/services.js`','E4-BAU-LEIST','Z-13','E5-W1')
R('E5-ORCH-01b','Generatorbilder aus den Musterbad-Daten entfernen','Orchestrator','`src/config/musterbaeder.js`','E4-BAU-MUSTER','Z-13','E5-W1')
R('E5-ORCH-01c','Generatorbilder aus den strukturierten Daten entfernen','Orchestrator','`src/lib/schema.ts`','E2-FIX-01c','Z-13, Z-14','E5-W1')
R('E5-ORCH-02a','Dauerhafte Weiterleitungen aus E5-BAU-01','Orchestrator','`next.config.ts`','E5-BAU-01','Z-14','E5-W3')
R('E5-ORCH-02b','Sitemap angleichen (alle indexierbaren Adressen, keine Weiterleitungsquellen)','Orchestrator','`src/app/sitemap.ts`','E5-ORCH-02a','Z-14','E5-W3')
R('E5-ORCH-02c','Echtes OG-Bild mit richtigen Maßen','Orchestrator','`src/lib/metadata.ts`, `src/shared/config/site.ts`','E3-BILD-01','Z-13, Z-14','E5-W1')
R('E5-ORCH-02d','Video-Sitemap ohne fehlende Videos und ohne Generatorbilder','Orchestrator','`src/app/video-sitemap.xml/route.ts`','—','Z-13, Z-14','E5-W1')
R('E5-PRUEF-KNIP','Bericht nicht mehr genutzter Dateien und Exporte (knip) nach Abschluss von E4','Prüfer',S.format('E5-PRUEF-KNIP'),'E4-SICHT','Z-03, Z-05','E5-W1')
R('E5-ORCH-03a','Abbau entfallender Bewegung im Stil (sig-kreuzlinie, sig-flucht, sig-plan, szene-ablauf, einzugsband, fugenband)','Orchestrator','`src/app/bewegung.css`','E5-PRUEF-KNIP','Z-03, Z-05','E5-W2')
R('E5-ORCH-03b','Register ohne entfallende Einträge, Tests angeglichen','Orchestrator','`src/lib/motion/register.ts`, `_werkstatt/register.json`, `test/bewegung.test.mjs`','E5-ORCH-03a','Z-05','E5-W2')
R('E5-ORCH-03c','Nicht mehr importierte Komponenten laut Bericht E5-PRUEF-KNIP entfernen (Kandidaten: Kreuzlinie, SzeneAblauf, Einzugsband, Planblatt); Tests nur, wenn ihre Logik entfällt (Denkprotokoll)','Orchestrator',f'`src/components/kern/Kreuzlinie.tsx`, `src/components/kern/SzeneAblauf.tsx`, `src/components/kern/Einzugsband.tsx`, `src/components/kern/Planblatt.tsx`, `{P}/werkstatt-schaufenster/szene/page.dev.tsx`','E5-ORCH-03b','Z-03','E5-W2')
R('E5-ORCH-03d','Schaufenster aufräumen (Seiten für entfernte Bausteine)',f'Orchestrator',f'`{P}/werkstatt-schaufenster/page.dev.tsx`, `{P}/werkstatt-schaufenster/schritte/page.dev.tsx`, `{P}/werkstatt-schaufenster/tabelle/page.dev.tsx`, `{P}/werkstatt-schaufenster/merkliste/page.dev.tsx`','E5-ORCH-03c','Z-03','E5-W2')
for w in range(1,4):
    rows.append((f'E5-PRUEF-A{w}',f'Stufe A für E5-W{w}, unabhängig','Prüfer','Haiku','1',S.format(f'E5-PRUEF-A{w}'),f'alle Pakete E5-W{w}','Z-02',f'E5-W{w}'))
R('E5-PRUEF-B','Stufe B der Etappe','Prüfer','`_werkstatt/belege/e5/**`','E5-PRUEF-A3','Z-02 bis Z-14','E5-Tor')
R('E5-DOK-01','Bildsatz Galerie, Referenzseiten und Stichprobe nach `_werkstatt/cache/bilder/e5/`','Dokumentar','`_werkstatt/cache/bilder/e5/**`','E5-PRUEF-B','Z-04','E5-Tor')
R('E5-SICHT','Sichtabnahme nach Rubrik (Orchestrator)','Orchestrator','`_werkstatt/berichte/E5-SICHT.md`','E5-DOK-01','Z-04','E5-Tor')
# ======================= Abschluss
R('AB-PRUEF-C','Stufe C (Endprüfung): Stufe B, Stichprobe 10 % (mindestens 5), alle Adressen, Probeläufe mit Tastatur, Systemschrift 200 %, Register, SVG, Metadaten','Prüfer','`_werkstatt/belege/abschluss/**`','E4-TOR, E5-TOR, KUER-01, KUER-02, KUER-03, KUER-04, KUER-05, KUER-06, KUER-07, KUER-08','Z-01 bis Z-14','AB')
R('AB-DOK-01a','BERICHT.md (du-Anrede, ohne Fachjargon, mit Bildpfaden)','Dokumentar','`_werkstatt/BERICHT.md`','AB-PRUEF-C','Z-10','AB')
R('AB-DOK-01b','Vorher-Nachher-Galerie als eigene Seite','Dokumentar','`_werkstatt/bilder/galerie.html`, `_werkstatt/bilder/abschluss/**`','AB-PRUEF-C','Z-10','AB')
R('AB-DOK-01c','Blinder Vergleich: Bilder neutral benannt und gemischt, Schlüssel getrennt','Dokumentar','`_werkstatt/cache/blind/**`, `_werkstatt/cache/blind-schluessel.json`','AB-PRUEF-C','Z-04','AB')
R('AB-DOK-01d','Anleitung zum Zusammenführen (Squash, `_werkstatt` und `_relaunch` vorher entfernen)','Dokumentar','`_werkstatt/ANLEITUNG-ZUSAMMENFUEHREN.md`','AB-PRUEF-C','Z-10','AB')
R('AB-DOK-01e','Anleitung zum Zurückrollen (Revert-Commit, Vercel-Rücksprung durch den Menschen)','Dokumentar','`_werkstatt/ANLEITUNG-ZURUECKROLLEN.md`','AB-PRUEF-C','Z-10','AB')
R('AB-END','Endprüfung jedes Kriteriums gegen seinen Beleg, mit blindem Vergleich (frischer Opus-Unteragent)','Juror','`_werkstatt/berichte/ABSCHLUSS.md` (legt der Orchestrator ab)','AB-DOK-01a, AB-DOK-01b, AB-DOK-01c, AB-DOK-01d, AB-DOK-01e','Z-01 bis Z-14','AB')
R('AB-ORCH-01','CLAUDE.md-Block entfernen, Statuszeile ABSCHLUSS, Commit und Push','Orchestrator','`CLAUDE.md`, `_werkstatt/STATUS.md`, `_werkstatt/PRUEFPUNKT.md`','AB-END','Z-10','AB')
KUER=[('KUER-01','Jury nach Award-Rubrik an Bildsätzen der Hauptansichten; jede Kategorie unter 9 wird ein Feinschliffpaket (höchstens 2 Runden je Ansicht und Kategorie)','Juror','Haiku','1','`$SCRATCH/KUER-01/**`','E4-TOR, E5-TOR','Z-04','Kür'),
      ('KUER-02','Klang „leises Klacken je Spalte“ (Alternative KLANG), nur nach erster Interaktion, mit Schalter','Orchestrator','Opus','3','`src/components/verlegen/Verlegen.tsx`, `src/lib/verlegen/klang.ts`','E4-TOR, E5-TOR','Z-05','Kür'),
      ('KUER-03','Halbverband als Alternative für B-01 testen und per Jury entscheiden','Orchestrator','Opus','3','`src/lib/verlegen/raster.ts`','KUER-01','Z-04','Kür'),
      ('KUER-04','Badplaner und Badanfrage zusammenlegen, falls Probeläufe Verwirrung zeigen (Umkehrprobe E-012), mit 308','Orchestrator','Opus','3','`next.config.ts`, `src/app/(bestand)/bad/badplaner/page.jsx`','E4-TOR, E5-TOR','Z-11, Z-14','Kür'),
      ('KUER-05','Gezeichnete Karte mit Anfahrt je Ortsseite','Grafiker','Haiku','2','`src/components/momente/karte-ort/**`, `_werkstatt/register/karte-ort.json`','E4-TOR, E5-TOR','Z-04','Kür'),
      ('KUER-06','Zweites Foto je Artikelabschnitt, wo passende Fotos da sind','Bildbearbeiter','Haiku','2','`public/images/arbeiten/artikel/**`, `_werkstatt/bilder/arbeiten-kuer.json`','E4-TOR, E5-TOR','Z-13','Kür'),
      ('KUER-07','Fuß: „Jetzt geöffnet“ ohne Hydrierfehler','Orchestrator','Opus','3','`src/components/common/Footer.jsx`','E4-TOR, E5-TOR','Z-11','Kür'),
      ('KUER-08','Druckansicht der Wissensseiten','Orchestrator','Opus','3','`src/app/globals.css`','E4-TOR, E5-TOR','Z-09','Kür')]
_W='`_werkstatt/'
E0=[('E0-ORCH-01','Werkstatt einrichten','Orchestrator','Opus','3',_W+'**` (Archiv, AUFTRAG, STATUS, PRUEFPUNKT), `.gitignore`, `CLAUDE.md`','—','Z-10','E0','erledigt df3c241'),
    ('E0-KUND-01…09','Erkundung (je ein Bereich, nur lesend)','Kundschafter','Haiku','1','keine (Bericht als Antwort)','E0-ORCH-01','Z-02, Z-14','E0','erledigt'),
    ('E0-PRUEF-BILD-01','Bildtechnik','Prüfer','Haiku','1',_W+'bildinventar.csv`','E0-ORCH-01','Z-13','E0','erledigt'),
    ('E0-BILD-01…05','Bildsichtung (je 20 Bilder)','Bildsichter','Haiku','2','keine (Formular als Antwort)','E0-PRUEF-BILD-01','Z-13','E0','erledigt'),
    ('E0-GUT-01, E0-GUT-02','Technikgutachten B-01 und B-02 (Stufe 3: frischer Opus-Unteragent, weil der Quelltext von Next den Kontext stark belastet hätte, Auftrag Abschnitt 5)','Gutachter','Opus','3','keine (Gutachten als Antwort)','E0-ORCH-01','Z-05, Z-08','E0','erledigt'),
    ('E0-PRUEF-01','Einrichtung','Prüfer','Haiku','1',_W+'werkzeuge/**`','E0-ORCH-01','Z-02','E0','erledigt 583656d'),
    ('E0-PRUEF-02a…02d','Werkzeuge (Geräte und Erstes Bild, Lesbarkeit, Adressen, Laufwerkzeug)','Prüfer','Haiku','1',_W+'werkzeuge/**`, '+_W+'adressen-e0.csv`, '+_W+'belege/e0/**`','E0-PRUEF-01','Z-09, Z-11, Z-12, Z-14','E0','erledigt 583656d'),
    ('E0-PRUEF-02-PA','Unabhängige Abnahme der Werkzeuge','Prüfer','Haiku','1','`$SCRATCH/E0-PRUEF-02-PA/**`','E0-PRUEF-02a…02d','Z-02','E0','erledigt 583656d'),
    ('E0-PRUEF-03','Ausgangswerte Stufe B ohne Lighthouse','Prüfer','Haiku','1',_W+'belege/e0/**`, '+_W+'bilder/e0/**`','E0-PRUEF-02-PA','Z-02 bis Z-09, Z-12','E0','läuft'),
    ('E0-PRUEF-03L','Ausgangswerte Lighthouse im Ruhefenster','Prüfer','Haiku','1',_W+'belege/e0/lighthouse.json`','E0-PRUEF-03, E0-PROBE-01…10','Z-08','E0','offen'),
    ('E0-PROBE-01…10','Probeläufe alter Stand (P1 bis P5 × eigenes und anderes Gerät)','Probeläufer','Haiku','1',_W+'cache/probelauf/e0/**`','E0-PRUEF-02-PA','Z-11','E0','läuft'),
    ('E0-ORCH-02','LAGEBILD mit Ausgangswerten, Faktenblatt','Orchestrator','Opus','3',_W+'LAGEBILD.md`, '+_W+'ABNAHME.md`','E0-PRUEF-03L','Z-01, Z-02','E0','läuft (Entwurf 583656d)'),
    ('E1-ORCH-01','KERN v3, Denkprotokolle, Referenztexte, Bildplätze, MENSCHEN','Orchestrator','Opus','3',_W+'KERN.md`, '+_W+'ENTSCHEIDUNGEN.md`, '+_W+'texte/REF-*.md`, '+_W+'bildplaetze.md`, '+_W+'MENSCHEN.md`, '+_W+'regeln/**`','E0-ORCH-01','Z-10, Z-12','E1','erledigt daf0f30, 16a1873, 394b300'),
    ('E1-PROBE-IA','Baumtest Navigation','Probeläufer','Haiku','1','keine (Ergebnis als Antwort)','E1-ORCH-01','Z-11','E1','erledigt 394b300'),
    ('E1-ORCH-02','PLAN und ABNAHME','Orchestrator','Opus','3',_W+'PLAN.md`, '+_W+'ABNAHME.md`','E1-ORCH-01','Z-01','E1','läuft (Fassung 1.2)'),
    ('E1-PRUEF-PLAN','Planprüfung Runde 1','Prüfer','Haiku','1','`$SCRATCH/E1-PRUEF-PLAN/**`','E1-ORCH-02','Z-01','E1','erledigt 583656d'),
    ('E1-PRUEF-PLAN-2','Planprüfung Runde 2 (letzte Runde, L0)','Prüfer','Haiku','1','`$SCRATCH/E1-PRUEF-PLAN-2/**`','E1-PRUEF-PLAN','Z-01','E1','erledigt')]

# ======================= Nachbearbeitung Fassung 1.2 (Planprüfung Runde 2)
# Tore als eigene Zeilen (L3, L7): Abgleich mit ABNAHME.md nach Stufe B, Probeläufen und Sichtabnahme
TORE={'E2':('E2-PRUEF-B, E2-PROBE-01, E2-PROBE-02, E2-PROBE-03, E2-PROBE-04, E2-SICHT','Z-01 bis Z-14'),
      'E3':('E3-PRUEF-B, '+', '.join(f'E3-PROBE-{i:02d}' for i in range(1,11))+', E3-SICHT','Z-01 bis Z-14'),
      'E4':('E4-PRUEF-B, E4-SICHT','Z-01 bis Z-14'),
      'E5':('E5-PRUEF-B, E5-SICHT','Z-01 bis Z-14')}
neu=[]
for r in rows:
    neu.append(r)
for e,(abh,krit) in TORE.items():
    idx=max(i for i,r in enumerate(neu) if r[0].startswith(e+'-'))
    neu.insert(idx+1,(f'{e}-TOR',f'Etappentor {e}: Abgleich mit ABNAHME.md (L3, L7), Befunde werden Pakete der nächsten Etappe, höchstens zwei Anläufe','Orchestrator','Opus','3','`_werkstatt/PLAN.md`, `_werkstatt/ABNAHME.md`, `_werkstatt/STATUS.md`',abh,krit,f'{e}-Tor'))
rows=neu
ERS={'E2-SICHT':'E2-TOR','E3-SICHT':'E3-TOR','E4-SICHT':'E4-TOR'}
def fix_abh(r):
    k,abh=r[0],r[6]
    if k.endswith('-TOR') or k.endswith('-DOK-01') or 'SICHT' in k: return r
    teile=[t.strip() for t in abh.split(',')]
    etappe=k.split('-')[0]
    teile=[ERS[t] if t in ERS and not t.startswith(etappe) else t for t in teile]
    return r[:6]+(', '.join(dict.fromkeys(teile)),)+r[7:]
rows=[fix_abh(r) for r in rows]
# Stufe A je Paket und Textstichprobe als eigene Zeilen, Abhängigkeiten als Kennungen
neu=[]
for r in rows:
    if '-PRUEF-A' in r[0] and r[6].startswith('alle Pakete'):
        welle=r[8]
        pk=[x[0] for x in rows if x[8]==welle and '-PRUEF-A' not in x[0] and '-PRUEF-T' not in x[0]]
        texte=[x[0] for x in rows if x[8]==welle and x[2] in ('Texter','Lektor')]
        neu.append((r[0],f'Stufe A je Paket der Welle {welle} (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig','Prüfer','Haiku','1',r[5],', '.join(pk),'Z-02, Z-09, Z-12',welle))
        if texte:
            kt=r[0].replace('-PRUEF-A','-PRUEF-T')
            neu.append((kt,f'Textstichprobe der Welle {welle}: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe','Prüfer','Haiku','1',S.format(kt),', '.join(texte),'Z-12',welle))
    else:
        neu.append(r)
rows=neu
# Status je Kennung (aus _werkstatt/plan-status.json, vom Orchestrator gepflegt)
import json as _json
STATUS_DATEI='/home/user/tezgel/_werkstatt/plan-status.json'
try: STATUS=_json.load(open(STATUS_DATEI))
except Exception: STATUS={}
# Prüfungen
ks=[r[0] for r in rows]
dup=[k for k,c in collections.Counter(ks).items() if c>1]
assert not dup, dup
# Dateihoheit je Welle
wf=collections.defaultdict(list)
for r in rows:
    for f in re.findall(r'`([^`]+)`', r[5]):
        if f.startswith('$SCRATCH'): continue
        wf[(r[8],f)].append(r[0])
konf={k:v for k,v in wf.items() if len(v)>1}
def tab(prefix):
    z=['| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |','|---|---|---|---|---|---|---|---|---|---|']
    for r in rows:
        if r[0].startswith(prefix): z.append('| '+' | '.join(r)+' | '+STATUS.get(r[0],'offen')+' |')
    return '\n'.join(z)
cnt=collections.Counter(r[0].split('-')[0] for r in rows)
haiku=sum(1 for r in rows if r[3]=='Haiku'); opus=len(rows)-haiku
e0h=sum(1 for r in E0 if r[3]=='Haiku'); e0o=len(E0)-e0h
gesamt=len(rows)+len(E0)+len(KUER)
pflicht=len(rows)+len(E0)
haiku_p=sum(1 for r in rows if r[3]=='Haiku')+sum(1 for r in E0 if r[3]=='Haiku')
opus_p=pflicht-haiku_p
txt=f"""# PLAN · Lauf „Verständlich, echt, ausgezeichnet“ · Fassung 1.2

Stand 24.10.2026, E1. Fassung 1.1 arbeitete die Planprüfung Runde 1 ein (25 Befunde), Fassung 1.2 die Runde 2 (14 Befunde, `pakete/E1-PRUEF-PLAN-2.rueckgabe.md`); weitere Prüfrunden gibt es nicht (L0). Gegen KERN v3.0. Jede Zeile: Kennung, Gegenstand, Rolle, Modell, Stufe, Schreibrechte, Abhängigkeit, Kriterium, Welle, Status (mit Commit, sobald abgenommen). Briefings entstehen je Welle in `_werkstatt/pakete/<Kennung>.md` nach dem 11-teiligen Paket-Bauplan. `$SCRATCH` = Sitzungs-Scratchpad (EINRICHTUNG.md).

## Regeln dieses Plans
- Gleichzeitige Pakete berühren nie dieselbe Datei. Pakete derselben Welle mit derselben Datei sind Orchestrator-Pakete und hängen nacheinander voneinander ab (Spalte „Abhängig von“).
- Schreibrechte sind exakte Dateien. Ein Eintrag mit `/**` bezeichnet einen **neuen** Ordner, den es vor dem Paket nicht gibt (`src/components/momente/<kennung>/`, `src/components/seiten/<seite>/`, `src/components/start/` für die neue Startseite, `public/images/arbeiten/`, Beleg- und Cacheordner); jede Datei darin entsteht in diesem Paket und gehört nur ihm. Der Bericht nennt jede angelegte Datei.
- Haiku-Pakete schreiben keine gemeinsamen Dateien. Texte für gemeinsame Datendateien liefern Texter als JSON unter `_werkstatt/texte/`, Registereinträge liefern Grafiker als `_werkstatt/register/<kennung>.json`; der Orchestrator überträgt sie (Pakete `E*-ORCH-0*`). Eine Artikeldatei `src/config/posts/<slug>.js` gehört genau einem Artikel und ist keine gemeinsame Datei; Texter und Lektor desselben Artikels arbeiten in verschiedenen Wellen.
- Referenztexte (`_werkstatt/texte/REF-*.md`) und den Text der 404 schreibt der Orchestrator; diese Seiten haben kein Texter-Paket (`/`, `/bad/barrierefreies-bad`, `/untergrund-abdichtung/din-18534`, Ortsvorlage, 404), aber ein Lektorpaket (`E1-LEKT-REF-1` bis `-4`, `E2-LEKT-404`), das Befunde meldet; der Orchestrator ändert den Text.
- Tests neuer Logik schreibt ein Haiku-Prüfer als neue Datei (`test/*.test.mjs`); den Eintrag im Skript `test` der `package.json` setzt der Orchestrator.
- Stufe A gilt je Paket (Auftrag Abschnitt 14): Jedes Briefing enthält die Schnellprüfung nach Stufe A als Selbstprüfung (Teil 9), und der unabhängige Haiku-Prüfer der Welle (`E*-PRUEF-A<n>`) liefert für jedes Paket der Welle ein eigenes Ergebnis. Wellen mit Texten haben zusätzlich die Textstichprobe (`E*-PRUEF-T<n>`); das Urteil fällt der Orchestrator (L1).
- Jede Etappe endet mit einer Torzeile (`E*-TOR`), die von Stufe B, Probeläufen und Sichtabnahme abhängt; die nächste Etappe hängt am Tor.
- Werkstatt-Schaufenster (`src/app/(bestand)/werkstatt-schaufenster/*/page.dev.tsx`): bleibt als Werkzeug der Entwicklung (nur mit `NODE_ENV=development` gebaut, `next.config.ts` `pageExtensions`), wird in E2-ORCH-02g erweitert und in E5-ORCH-03c/d aufgeräumt; kein Baumeister-Paket.

## Mengengerüst
- 170 Adressen (163 Sitemap, 5 nur verlinkt, 2 Weiterleitungsquellen) nach Auftrag Abschnitt 11; `adressen-e0.csv` führt zusätzlich die 32 Adressen mit 410 aus `src/lib/wege.ts` (E-016). 82 Seitendateien unter `src/app/(bestand)/` (davon 6 nur im Schaufenster), dazu 404.
- Seiten nach Art: Hauptansichten 12; übrige statische Seiten {len(rest)} (darunter `/untergrund-abdichtung/din-18534` mit Referenztext); Rechtstexte 6; Vorlagen für 13 Orte, 52 Leistung × Ort, 4 Leistungen, 12 Musterbäder, 13 Artikel, 6 Referenzen.
- Texte: {sum(1 for r in rows if r[2]=='Texter')} Texterpakete, {sum(1 for r in rows if r[2]=='Lektor')} Lektorpakete; 4 Referenztexte (erledigt).
- Bilder: 84 Originale, Webfassungen in zwei Paketen (E2-BILD-02 Start und Hauptansichten, E3-BILD-01 alle übrigen Plätze und OG-Bild); Fliesenkompositionen für Plätze ohne Foto.
- Komponenten: 6 Bausteine, 4 Vorlagen, Kopf, Mobilmenü, untere Leiste, Fuß, 404, B-01, B-02, `startbild`, 9 große Momente.
- Weiterleitungen: neu nur aus E5-BAU-01; keine Adresse entfällt.

## Etappen, Wellen, kritischer Pfad
- E0: Werkzeuge (erledigt) → Ausgangswerte Stufe B und Probeläufe → Lighthouse im Ruhefenster → LAGEBILD.
- E1: KERN v3, Baumtest (erledigt), PLAN und ABNAHME, Planprüfung (zwei Runden, erledigt), Lektorat der Referenztexte.
- E2 Referenz: W0 Werkzeugbibliotheken · W1 LCP-Ursache, Tokens, Register, Bewertungen, Bildwerkzeug und Bilder, Logo-Vektor, Bausteine, Reaktionswerkzeug · W2 Navigation, Kopf, B-01, Plan-Morph weg · W3 B-02, Startseite, `startbild`, 404, Funktionsspecs · Tor (Stufe B, Probeläufe P1 und P5, Sichtabnahme ≥ 8, höchstens 2 Anläufe).
- E3: W1 Vorlagen, große Momente, Bilder, Texte der Hauptansichten und Orte · W2 Lektorat, Übertragungen · W3 Seitenbau · Tor.
- E4: fünf Wellen im Fluss Text (W1 bis W3) → Lektorat (eine Welle später) → Bau (zwei Wellen später), dazu Datenvorlagen, Rechtstexte, Artikel · Tor.
- E5 (teils parallel zu E4): Referenzseiten, Generatorbilder raus, Weiterleitungen, Sitemap, OG-Bild, Video-Sitemap, Abbau entfallender Bewegung · Tor.
- Kür (nach Wirkung, hängt an E4-TOR und E5-TOR), dann Abschluss (hängt an E4-TOR, E5-TOR und der Kür).
- **Kritischer Pfad (wie in den Tabellen):** E0-PRUEF-03L → E2-PRUEF-00 → E2-ORCH-00 → E2-ORCH-01 → E2-ORCH-01b → E2-ORCH-04 → E2-ORCH-04b → E2-ORCH-05 → E2-ORCH-06b → E2-PRUEF-A3 → E2-PRUEF-B → E2-SICHT → E2-TOR → E3-ORCH-01a → E3-BAU → E3-TOR → E4 → E4-TOR → Kür → AB-PRUEF-C → AB-END.

## Modellanteil und Kapazität
- Pflichtzeilen: {pflicht} (E0 und E1 {len(E0)+cnt.get('E1',0)}, E2 {cnt['E2']}, E3 {cnt['E3']}, E4 {cnt['E4']}, E5 {cnt['E5']}, Abschluss {cnt['AB']}); dazu Kür {len(KUER)}. Sammelzeilen in E0 (zum Beispiel `E0-KUND-01…09`) zählen als eine Zeile.
- Pflicht nach Modell: Haiku {haiku_p}, Opus {opus_p} (≈ {round(100*haiku_p/pflicht)} % Haiku); Kür: Haiku {sum(1 for k in KUER if k[3]=='Haiku')}, Opus {sum(1 for k in KUER if k[3]=='Opus')}.
- Kapazität: Tage = Pakete ÷ (HAIKU-PLÄTZE × Pakete je Platz und Tag) × 1,2 = {pflicht+len(KUER)} ÷ (5 × 10) × 1,2 ≈ {str(round((pflicht+len(KUER))/50*1.2,1)).replace('.',',')} Tage. Annahme 10 Pakete je Platz und Tag: ein Paket braucht im Mittel 1 bis 2 Stunden (Texter, Lektor, Prüfer der Stufe A eher 1, Baumeister eher 2) bei rund 20 Arbeitsstunden je Tag. Engpass ist der Container (4 Kerne, höchstens 2 gleichzeitige Agenten je Workflow, E-005); Text- und Lektorpakete laufen in zwei Workflows parallel, Lighthouse allein im Ruhefenster.

## Pflicht
Alle Pakete außer `KUER-*` sind Pflicht, nach Wirkung sortiert (Rahmen und Startseite vor Hauptansichten vor übrigen Seiten).

### E0 und E1
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
""" + '\n'.join('| '+' | '.join(k)+' |' for k in E0) + '\n' + '\n'.join(tab('E1-').split('\n')[2:]) + f"""

### E2 · Referenz
{tab('E2-')}

### E3 · Vorlagen, große Momente, Hauptansichten
{tab('E3-')}

### E4 · Übrige Seiten
{tab('E4-')}

### E5 · Referenzen, Bilder, Adressen, Abbau
{tab('E5-')}

### Abschluss
{tab('AB-')}

## Kür (nach Wirkung, Schnitt nach Befund der Jury und der Abnahmeliste)
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
""" + '\n'.join('| '+' | '.join(k)+' | '+STATUS.get(k[0],'offen')+' |' for k in KUER) + """

## Offene Punkte
- Planprüfung Runde 2, Befund 9d: Ob die 32 Adressen mit 410 zur Schwelle von Z-14 gehören, entscheidet der Wortlaut von Abschnitt 11 (Adressen aus Sitemap und internen Links); sie stehen weder in der Sitemap noch in Links und bleiben 410 wie in E0 (E-016). Steht in MENSCHEN.md zur Bestätigung.

## Anhang · Fassung 0 (wörtlich, im Chat freigegeben am 23.10.2026)
"""
alt=open(OUT).read()
MARKE='## Anhang · Fassung 0 (wörtlich, im Chat freigegeben am 23.10.2026)\n'
anhang=alt.split(MARKE,1)[1]
open(OUT,'w').write(txt+anhang.lstrip('\n'))
print('zeilen',len(rows),'pflicht',pflicht,'haiku',haiku_p,'opus',opus_p,'konflikte',len(konf))
for k,v in konf.items(): print(' KONFLIKT',k,v)
