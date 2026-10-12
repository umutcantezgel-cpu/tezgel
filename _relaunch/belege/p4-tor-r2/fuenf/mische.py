# P4-Tor R2: 140 Antworten (70 Vorschau neu, 60 Bestand aus Runde 1, 10 Ausgangsstand / aus P0) unter A001–A140 mischen (Saat fest).
import json, random, sys
R='/home/user/tezgel/_relaunch/belege'
neu=json.load(open(sys.argv[1]))  # fuenf-sammeln-Ausgabe der Runde 2
alt=json.load(open(f'{R}/p4-tor/fuenf/antworten.json'))
zb=json.load(open(f'{R}/p4-tor/fuenf/zuordnung-bilder.json'))
p0=json.load(open(f'{R}/p0-ausgangsstand/fuenf/antworten.json'))
eintraege=[]
for a in neu['antworten']:
    z=neu['zuordnung'][a['bild']]; eintraege.append({'quelle':'r2-vorschau','stand':'vorschau c5ef582-v','seite':z['seite'],'ansicht':z['ansicht'],'bild':a['bild'],'durchgang':a['durchgang'],'angebot':a['angebot'],'zielgruppe':a['zielgruppe'],'naechster_schritt':a['naechster_schritt'],'sicherheit':a.get('sicherheit')})
for blk in alt:
    z=zb[blk['bild']]
    if z['stand']!='basis': continue
    for a in blk['antworten']:
        eintraege.append({'quelle':'r1-basis','stand':'bestand f2c4180','seite':z['seite'],'ansicht':z['ansicht'],'bild':blk['bild'],'durchgang':a['durchgang'],'angebot':a['angebot'],'zielgruppe':a['zielgruppe'],'naechster_schritt':a['naechster_schritt'],'sicherheit':a.get('sicherheit')})
for a in p0['antworten']:
    z=p0['zuordnung'][a['bild']]
    eintraege.append({'quelle':'p0-ausgangsstand','stand':'bestand 707a93d','seite':z['seite'],'ansicht':z['ansicht'],'bild':a['bild'],'durchgang':a['durchgang'],'angebot':a['angebot'],'zielgruppe':a['zielgruppe'],'naechster_schritt':a['naechster_schritt'],'sicherheit':a.get('sicherheit')})
assert len(eintraege)==140, len(eintraege)
from collections import Counter
print(Counter((e['stand'],e['seite'],e['ansicht']) for e in eintraege).most_common(3), len(set((e['stand'],e['seite'],e['ansicht']) for e in eintraege)))
r=random.Random(20261011140); r.shuffle(eintraege)
kenn={}; eingabe=[]
for i,e in enumerate(eintraege,1):
    k=f'A{i:03d}'; kenn[k]={x:e[x] for x in ('quelle','stand','seite','ansicht','bild','durchgang')}
    eingabe.append({'id':k,'angebot':e['angebot'],'zielgruppe':e['zielgruppe'],'naechster_schritt':e['naechster_schritt']})
json.dump(kenn,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
json.dump(eingabe,open(sys.argv[3],'w'),ensure_ascii=False)
print('ok', len(eingabe))
