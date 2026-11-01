# Nachmessung /bad, /bad/badsanierung, /kontakt: Median je Stand über alle Runden (v1–v4, n1–n4) und ohne die langsame Runde n1
import json, os, statistics as st
Z = os.path.dirname(os.path.abspath(__file__))
def runde(k):
    p = f'{Z}/lh-{k}-mobil.json'
    if not os.path.exists(p): return None, {}
    d = json.load(open(p)); return d.get('benchmark_referenz'), {s: v['mobil']['laeufe'] for s, v in d['seiten'].items() if 'mobil' in v}
B = {}; R = {}
for k in ['v1', 'v2', 'v3', 'v4', 'n1', 'n2', 'n3', 'n4']:
    B[k], R[k] = runde(k)
print('Benchmark-Referenz je Runde:', {k: B[k] for k in B if B[k]})
def med(ks, s, f):
    xs = [x[f] for k in ks for x in R[k].get(s, [])]
    return (round(st.median(xs), 1) if xs else None), len(xs)
print('| Seite | Leistung alle | TBT alle | Leistung ohne n1 | TBT ohne n1 | LCP alle | Läufe |'); print('|---|---|---|---|---|---|---|')
for s in ['/bad', '/bad/badsanierung', '/kontakt']:
    V, N, N2 = ['v1', 'v2', 'v3', 'v4'], ['n1', 'n2', 'n3', 'n4'], ['n2', 'n3', 'n4']
    pv, nv = med(V, s, 'perf'), med(N, s, 'perf'); tv, tn = med(V, s, 'tbt'), med(N, s, 'tbt')
    print(f"| {s} | {pv[0]} → {nv[0]} | {tv[0]} → {tn[0]} | {pv[0]} → {med(N2, s, 'perf')[0]} | {tv[0]} → {med(N2, s, 'tbt')[0]} | {med(V, s, 'lcp')[0]} → {med(N, s, 'lcp')[0]} | {pv[1]}/{nv[1]} |")
