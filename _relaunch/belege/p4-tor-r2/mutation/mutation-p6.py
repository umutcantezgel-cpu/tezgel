# Mutationsprobe P4-Tor Runde 2 (P4-GEG M1/N4): nur P6 F-12 „Karte laden“ öffnet nur die Einstellungen, damit sich keine Mutationen überdecken.
# Ziel: Der seit M1 laufende Kern-Fall F-12 /standorte mobil muss rot werden (und die übrigen Karten-Fälle wie in Runde 1).
import sys
M = sys.argv[1]
name, datei, alt, neu, soll = ('P6 F-12 „Karte laden“ öffnet nur die Einstellungen (/standorte, /kontakt, /)', 'src/components/kern/einwilligung/KartenPlatzhalter.tsx', "onLaden={handleAccept}", "onLaden={zuDenEinstellungen}", 1)
p = f'{M}/{datei}'; s = open(p, encoding='utf-8').read(); n = s.count(alt)
if n == 0 and s.count(neu) == soll: print('schon', name); sys.exit(0)
if n != soll: sys.exit(f'ABBRUCH {name}: {n} Treffer in {datei} (soll {soll})')
open(p, 'w', encoding='utf-8').write(s.replace(alt, neu)); print('ok', name)
