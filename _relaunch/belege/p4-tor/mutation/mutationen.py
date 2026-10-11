# Mutationsprobe P4-Tor (Kern-Zweige der Hauptseiten-Entwürfe, Vorschau 1c6c9cd-v): je Mutation genau die genannte Trefferzahl.
import sys
M = sys.argv[1]
MUT = [
 ('P1 F-05 Projekt-Check übernimmt den Sanierungsumfang nicht (/bad)', 'src/components/kern/formulare/c/ProjektCheckAnsicht.tsx', "onChange={() => setSanitaryScope(scope.id)}", "onChange={() => undefined}", 1),
 ('P2 F-07 Kalender wählt immer den ersten Tag (/kontakt)', 'src/components/kern/formulare/e/TerminKalenderAnsicht.tsx', "onClick={() => setTagWahl(day.dateStr)}", "onClick={() => setTagWahl(availableDays[0].dateStr)}", 1),
 ('P3 F-16 Blog-Suche übernimmt die Eingabe nicht (/blog)', 'src/components/kern/seiten/blog/Filter.tsx', "onChange={(e) => setSearchQuery(e.target.value)}", "onChange={() => setSearchQuery('')}", 2),
 ('P4 F-09 Festnetz im Kontaktblatt falsch (/kontakt)', 'src/components/kern/seiten/kontakt/Kontaktblatt.tsx', 'href={`tel:${contact.phoneLink}`} zeichen="telefon" etikett="Büro / Festnetz"', 'href={`tel:${contact.phoneLink}0`} zeichen="telefon" etikett="Büro / Festnetz"', 1),
 ('P5 F-03 Anfrage-Funnel bleibt auf Schritt 2 (/kontakt, /leistungen)', 'src/components/kern/formulare/b/AnfrageFunnelAnsicht.tsx', "<Knopf onClick={() => setStep(3)}", "<Knopf onClick={() => setStep(2)}", 1),
 ('P6 F-12 „Karte laden“ öffnet nur die Einstellungen (/standorte, /kontakt)', 'src/components/kern/einwilligung/KartenPlatzhalter.tsx', "onLaden={handleAccept}", "onLaden={zuDenEinstellungen}", 1),
]
for name, datei, alt, neu, soll in MUT:
    p = f'{M}/{datei}'; s = open(p, encoding='utf-8').read(); n = s.count(alt)
    if n == 0 and s.count(neu) == soll: print('schon', name); continue
    if n != soll: sys.exit(f'ABBRUCH {name}: {n} Treffer in {datei} (soll {soll})')
    open(p, 'w', encoding='utf-8').write(s.replace(alt, neu)); print('ok', name)
