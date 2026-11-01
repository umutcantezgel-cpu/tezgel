# Reaktion 7 Läufe je Handlung, Median über 14 Läufe je Stand (vorher v1+v2, nachher n1+n2)
import json, statistics as st, os
Z = os.path.dirname(os.path.abspath(__file__))
def pool(ks):
    r = {}
    for k in ks:
        for s in json.load(open(f'{Z}/reaktion7-{k}.json'))['seiten']:
            for h, v in s['handlungen'].items():
                if 'werte' in v: r.setdefault((s['seite'], h), []).extend(v['werte'])
    return r
V, N = pool(['v1', 'v2']), pool(['n1', 'n2'])
print('| Seite · Handlung | vorher | nachher | nachher Spanne | Rundenmediane nachher |'); print('|---|---|---|---|---|')
for key in V:
    if key[1] not in ('hauptknopf', 'akkordeon'): continue
    rm = [json.load(open(f'{Z}/reaktion7-{k}.json')) for k in ('n1', 'n2')]
    runden = [next(s['handlungen'][key[1]]['median'] for s in d['seiten'] if s['seite'] == key[0]) for d in rm]
    print(f"| {key[0]} · {key[1]} | {st.median(V[key]):g} | {st.median(N[key]):g} | {min(N[key])} bis {max(N[key])} | {', '.join(map(str, runden))} |")
