import re, sys, collections
notiz = open(sys.argv[1], encoding='utf-8').read().split('\n')
liste = collections.Counter()
for z in notiz:
    m = re.match(r'^- `(src/config/[^:`]+):(\d+)`( \(Kommentar\))?', z)
    if m and not m.group(3):
        liste[(m.group(1), int(m.group(2)))] += 1
EINH = r'(?:mm|cm|m²|m³|m|km|kg|t|l|Jahre|Jahren|Monate|Wochen|Tage|Tagen|Stunden|Minuten|Std\.|%|€|Euro|°C|Grad)'
MUSTER = re.compile(r'(\d) (' + EINH + r')(?![A-Za-zÄÖÜäöüß0-9²³])')
gesamt = 0; fehler = 0
dateien = collections.defaultdict(list)
for (d, n), k in liste.items(): dateien[d].append((n, k))
for d, zeilen in sorted(dateien.items()):
    txt = open(d, encoding='utf-8').read().split('\n')
    for n, k in zeilen:
        neu, anz = MUSTER.subn(lambda m: m.group(1) + '\\u00a0' + m.group(2), txt[n-1])
        if anz != k:
            print('ABWEICHUNG', d, n, 'erwartet', k, 'gefunden', anz, txt[n-1][:120]); fehler += 1
        txt[n-1] = neu; gesamt += anz
    if '--schreiben' in sys.argv: open(d, 'w', encoding='utf-8').write('\n'.join(txt))
print('Stellen', gesamt, 'Zeilen', sum(liste.values()), 'Dateien', len(dateien), 'Abweichungen', fehler)
