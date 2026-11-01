# Lighthouse-Auswertung UM-E4-SICHT-FIX-2 Stufe 2: Median über alle Einzelläufe je Stand (vorher v1+v2, nachher n1+n2), Desktop dv/dn.
import json, os, statistics as st, sys
Z = os.path.dirname(os.path.abspath(__file__))
def lade(k, form):
    p = (f'{Z}/lh-{k}-mobil.json' if form == 'mobil' else f'{Z}/lh-{k}-desktop.json')
    if not os.path.exists(p): return {}
    d = json.load(open(p)); out = {}
    for s, v in d['seiten'].items():
        if form in v: out[s] = v[form]['laeufe']
    return out
def pool(ks, form):
    r = {}
    for k in ks:
        for s, l in lade(k, form).items(): r.setdefault(s, []).extend(l)
    return r
def med(l, f): 
    xs = [x[f] for x in l if x.get(f) is not None]
    return st.median(xs) if xs else None
V, N = pool(['v1','v2'],'mobil'), pool(['n1','n2'],'mobil')
DV, DN = pool(['dv'],'desktop'), pool(['dn'],'desktop')
print('| Seite | Leistung | LCP ms | TBT ms | CLS max | Läufe | Desktop |'); print('|---|---|---|---|---|---|---|')
for s in V:
    v, n = V.get(s, []), N.get(s, [])
    fmt = lambda x: ('%g' % x) if x is not None else '–'
    dv, dn = med(DV.get(s, []), 'perf'), med(DN.get(s, []), 'perf')
    print(f"| {s} | {fmt(med(v,'perf'))} → {fmt(med(n,'perf'))} | {fmt(round(med(v,'lcp')))} → {fmt(round(med(n,'lcp')) if n else None)} | {fmt(round(med(v,'tbt')))} → {fmt(round(med(n,'tbt')) if n else None)} | {fmt(max((x['cls'] for x in v), default=None))} → {fmt(max((x['cls'] for x in n), default=None))} | {len(v)}/{len(n)} | {fmt(dv)} → {fmt(dn)} |")
print()
for s in N:
    for x in N[s]:
        if x['cls'] and x['cls'] > 0.05: print('CLS-Ausreißer nachher', s, round(x['cls'],3))
    for x in V.get(s, []):
        if x['cls'] and x['cls'] > 0.05: print('CLS-Ausreißer vorher', s, round(x['cls'],3))
