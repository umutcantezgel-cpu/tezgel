#!/usr/bin/env python3
"""E4-NACH-06: Bündelanalyse der Erstladung je Hauptansicht (Produktionsbuild 3b10790, Reinraum).
Nur Messung und Auswertung; schreibt BUENDEL.json und BUENDEL.md in den Belegordner.
Aufruf: python3 -I buendel.py <reinraum-dir> <repo-dir> <belegordner>
"""
import sys, os, json, re, glob, gzip, collections, statistics

REINRAUM, REPO, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
DATA = REINRAUM + '/.next/diagnostics/analyze/data'
CHUNKS = REINRAUM + '/.next/static/chunks'
APP = REINRAUM + '/.next/server/app'
LH = os.environ.get('LH_DIR', '')
MAIN = json.load(open(REPO + '/_werkstatt/HAUPTANSICHTEN.json'))['hauptansichten']
LH_SLUG = {'/': 'start', '/bad': 'bad', '/leistungen': 'leistungen', '/leistungen/bad': 'leistungen__bad',
           '/standorte': 'standorte', '/standorte/wetzlar': 'standorte__wetzlar', '/fliesen': 'fliesen',
           '/ueber-uns': 'ueber-uns', '/kontakt': 'kontakt', '/fliesen/konfigurator': 'fliesen__konfigurator',
           '/blog': 'blog', '/blog/rutschfeste-fliesen-r-klassen': 'blog__rutschfeste-fliesen-r-klassen'}
KIB = 1024.0
checks = {}

def stats_key(p):
    if p == '/': return '/'
    s = p.strip('/').split('/')
    if len(s) == 2 and s[0] == 'leistungen': return '/leistungen/[id]'
    if len(s) == 2 and s[0] == 'standorte': return '/standorte/[stadt]'
    if len(s) == 2 and s[0] == 'blog': return '/blog/[slug]'
    return p

# ---------- 1. Analyzer-Daten lesen (Format: 4 Byte BE Laenge, JSON-Kopf, Binaerteil) ----------
def load_analyze(path):
    b = open(path, 'rb').read()
    n = int.from_bytes(b[:4], 'big')
    return json.loads(b[4:4 + n].decode('utf-8'))

def full_sources(h):
    src = h['sources']; cache = {}
    def full(i):
        if i in cache: return cache[i]
        s = src[i]
        p = s['path'] if s['parent_source_index'] is None else full(s['parent_source_index']) + s['path']
        cache[i] = p
        return p
    return [full(i) for i in range(len(src))]

an_chunks = {}          # analyzer-name -> {'size', 'modules': {path: bytes}}
an_files = {}           # route-key -> set(analyzer names)
dup_info = []
for f in sorted(glob.glob(DATA + '/**/analyze.data', recursive=True)):
    rel = os.path.relpath(os.path.dirname(f), DATA)
    rkey = '/' if rel == '.' else '/' + rel
    h = load_analyze(f)
    fp = full_sources(h)
    outs = h['output_files']
    per_idx = collections.defaultdict(lambda: collections.defaultdict(int))
    for cp in h['chunk_parts']:
        oi = cp['output_file_index']
        if oi is None or oi >= len(outs): continue
        fn = outs[oi]['filename']
        if not fn.startswith('[client-fs]/_next/static/chunks/'): continue
        per_idx[oi][fp[cp['source_index']]] += cp['size']
    by_name = collections.defaultdict(list)
    for oi, mods in per_idx.items():
        by_name[outs[oi]['filename'].rsplit('/', 1)[1]].append((oi, dict(mods)))
    names = set()
    for i, o in enumerate(outs):
        if o['filename'].startswith('[client-fs]/_next/static/chunks/'):
            names.add(o['filename'].rsplit('/', 1)[1])
    for name, lst in by_name.items():
        mods = lst[0][1]
        if len(lst) > 1:
            same = all(m == mods for _, m in lst)
            dup_info.append({'name': name, 'file': rkey, 'output_indices': [i for i, _ in lst], 'identisch': same})
        size = sum(mods.values())
        ent = an_chunks.setdefault(name, {'size': size, 'modules': mods})
        if ent['size'] != size:
            dup_info.append({'name': name, 'file': rkey, 'konflikt_groesse': [ent['size'], size]})
    an_files[rkey] = names

# ---------- 2. Platten-Chunks (Rohgroesse, gzip Level 6 = Standard von zlib/Node) ----------
disk = {}
for n in sorted(os.listdir(CHUNKS)):
    data = open(os.path.join(CHUNKS, n), 'rb').read()
    disk[n] = {'raw': len(data), 'gz6': len(gzip.compress(data, compresslevel=6, mtime=0)), 'kind': 'css' if n.endswith('.css') else 'js'}

# ---------- 3. Analyzer-Name -> Platten-Name: Groesse (<=3 %) plus Routen-Konsistenz ----------
# Groesse allein reicht nicht (mehrere Chunks liegen unter 1 % auseinander). Ein Paar gilt als
# "belegt", wenn der Analyzer-Name in allen Routen vorkommt, in denen der Platten-Chunk im
# Erstladungssatz von Next steht, Abweichung <= 0,5 % und eindeutig; "wahrscheinlich" bei <= 3 %.
an_size_first = {n: a['size'] for n, a in an_chunks.items()}
rbs_all = {r['route']: r for r in json.load(open(REINRAUM + '/.next/diagnostics/route-bundle-stats.json'))}
disk_routes = collections.defaultdict(set)
for rk, r in rbs_all.items():
    for pth in r['firstLoadChunkPaths']:
        disk_routes[os.path.basename(pth)].add(rk)

def cands_for(dn):
    out = []
    for an, sz in an_size_first.items():
        if (an.endswith('.css')) != (dn.endswith('.css')) or sz <= 0: continue
        dev = abs(disk[dn]['raw'] / sz - 1.0)
        if dev > 0.03: continue
        dr = disk_routes.get(dn, set())
        cons = (len(dr & an_routes_set(an)) / len(dr)) if dr else None
        out.append({'analyzer': an, 'abw_pct': round(100 * (disk[dn]['raw'] / sz - 1.0), 2), 'konsistenz': cons})
    return out

_an_routes_cache = {}
def an_routes_set(an):
    if an not in _an_routes_cache:
        _an_routes_cache[an] = {rk for rk, names in an_files.items() if an in names}
    return _an_routes_cache[an]

tiers = {}
pairs_all = []
for dn in disk:
    cs = cands_for(dn)
    tiers[dn] = {'tier': 'ohne Zuordnung', 'analyzer': None, 'kandidaten': cs[:4]}
    for c in cs:
        if c['konsistenz'] in (1.0, None):
            pairs_all.append((abs(c['abw_pct']), dn, c['analyzer'], c['abw_pct']))
# gierige Zuordnung 1:1, zuerst die engsten Paare; Analyzer-Name und Platten-Chunk je hoechstens einmal
pairs_all.sort()
taken_an, taken_dn = set(), set()
for dev, dn, an, abw in pairs_all:
    if dn in taken_dn or an in taken_an: continue
    taken_dn.add(dn); taken_an.add(an)
    tiers[dn]['analyzer'] = an
    tiers[dn]['tier'] = 'belegt' if abs(abw) <= 0.5 else 'wahrscheinlich'
    tiers[dn]['abw_pct'] = abw
# manuelle Zuordnung nach Inhalt (Begruendung im Bericht): Bootstrap-Chunk mit errorStyles/WarningIcon
MANUELL = {'0jvhpaew_uadu.js': '1lmb26yt83-ed.js'}
for dn, an in MANUELL.items():
    if an in an_chunks and dn in disk:
        tiers[dn] = {'tier': 'manuell (Inhalt, Groesse abweichend)', 'analyzer': an, 'abw_pct': round(100.0 * (disk[dn]['raw'] / an_chunks[an]['size'] - 1), 2), 'kandidaten': tiers[dn]['kandidaten']}
an2disk = {t['analyzer']: dn for dn, t in tiers.items() if t['analyzer'] and t['tier'] in ('belegt', 'wahrscheinlich', 'manuell (Inhalt, Groesse abweichend)')}
disk2an = {v: k for k, v in an2disk.items()}
unmapped_an = sorted(set(an_chunks) - set(an2disk))
ratios = sorted(disk[d]['raw'] / an_chunks[a]['size'] for a, d in an2disk.items())
tier_counts = collections.Counter(t['tier'] for t in tiers.values())


# Hinweis fuer nicht zugeordnete Chunks: lange Zeichenketten aus dem Chunk, die wortgleich in src/ stehen
src_text = {}
for root, _, files in os.walk(REINRAUM + '/src'):
    for fn in files:
        if fn.endswith(('.ts', '.tsx', '.js', '.jsx', '.mjs')):
            fp_ = os.path.join(root, fn)
            src_text[os.path.relpath(fp_, REINRAUM)] = open(fp_, encoding='utf-8', errors='replace').read()
def src_hinweis(dn):
    txt = open(os.path.join(CHUNKS, dn), encoding='utf-8', errors='replace').read()
    lits = [x for x in re.findall(r'"([^"\\]{30,120})"', txt) if ' ' in x][:400]
    hits = collections.Counter()
    for lit in lits:
        for rel, st in src_text.items():
            if lit in st: hits[rel] += 1
    return [{'datei': k, 'treffer': v} for k, v in hits.most_common(3)]

# ---------- 4. Erstladung je Route (Next route-bundle-stats) und Gegenprobe ueber HTML ----------
rbs = {r['route']: r for r in json.load(open(REINRAUM + '/.next/diagnostics/route-bundle-stats.json'))}
def fl_of(route):
    return [os.path.basename(p) for p in rbs[route]['firstLoadChunkPaths']]

route_html_check = []
for m in MAIN:
    p = m['pfad']
    html = APP + '/' + ('index.html' if p == '/' else p.strip('/') + '.html')
    txt = open(html, encoding='utf-8').read()
    scripts = re.findall(r'<script[^>]*\ssrc="/_next/static/chunks/([^"]+)"[^>]*>', txt)
    nomod = set(re.findall(r'<script[^>]*\ssrc="/_next/static/chunks/([^"]+)"[^>]*noModule', txt))
    pre = re.findall(r'<link[^>]*rel="preload"[^>]*as="script"[^>]*href="/_next/static/chunks/([^"]+)"', txt)
    html_js = set(scripts) | set(pre)
    fl = set(fl_of(stats_key(p)))
    route_html_check.append({'pfad': p, 'html_js': len(html_js), 'firstLoad': len(fl),
                             'nur_html': sorted(html_js - fl), 'nur_html_noModule': sorted((html_js - fl) & nomod),
                             'nur_firstLoad': sorted(fl - html_js)})

# ---------- 5. Validierung: Analyzer-Route enthaelt alle firstLoad-Chunks (ueber Mapping) ----------
route_validation = []
for rkey, names in sorted(an_files.items()):
    if rkey not in rbs: continue
    mapped = {an2disk[n] for n in names if n in an2disk}
    fl = set(fl_of(rkey))
    route_validation.append({'route': rkey, 'firstLoad': len(fl), 'fehlend_im_analyzer': sorted(fl - mapped),
                             'analyzer_zusatz_chunks': len(mapped - fl)})
routes_stats_total = len(rbs)
routes_validated = len(route_validation)
routes_validated_ok = sum(1 for v in route_validation if not v['fehlend_im_analyzer'])

# Gegenprobe ueber page_client-reference-manifest (Modul -> Platten-Chunk)
manifest_mods = {}
for f in glob.glob(APP + '/**/page_client-reference-manifest.js', recursive=True):
    s = open(f, encoding='utf-8').read()
    mm = re.search(r'\] = (\{.*\});?\s*$', s, re.S)
    if not mm: continue
    for k, v in json.loads(mm.group(1)).get('clientModules', {}).items():
        manifest_mods.setdefault(k, set()).update(c.split('/')[-1] for c in v.get('chunks', []))
man_ok = 0; man_bad = 0; man_bad_list = []
# Manifest nutzt Modul-Idents mit /esm/-Pfad, der Analyzer den Pfad ohne /esm/ (gleiche Datei)
norm = lambda x: x.replace('/esm/', '/')
mod2disk = collections.defaultdict(set)
for an, a_ in an_chunks.items():
    if an in an2disk:
        for mk in a_['modules']: mod2disk[norm(mk)].add(an2disk[an])
for k, dchunks in manifest_mods.items():
    if not dchunks: continue
    seen = mod2disk.get(norm(k), set())
    # Manifest-Liste = Chunk(s), die das Modul enthalten, plus deren Abhaengigkeiten: Analyzer-Chunks muessen darin enthalten sein
    if seen and seen <= dchunks: man_ok += 1
    else:
        man_bad += 1; man_bad_list.append({'modul': k, 'manifest': sorted(dchunks), 'analyzer': sorted(seen)})

# ---------- 6. Hilfsfunktionen: Modul -> Bibliothek ----------
def lib_of(path):
    p = path.replace('[project]/', '')
    if p.startswith('src/'): return 'src (eigener Code)'
    if 'node_modules/next/dist/compiled/' in p:
        sub = p.split('node_modules/next/dist/compiled/', 1)[1].split('/')[0]
        return 'next/compiled:' + sub
    found = re.findall(r'node_modules/((?:@[^/]+/)?[^/]+)', p)
    if found:
        return found[-1]
    if p.startswith('[turbopack]') or 'turbopack' in p.lower(): return 'Turbopack-Laufzeit'
    return 'sonstige: ' + p.split('/')[0][:60]

# Modul-Groessen je Platten-Chunk
mod_in_chunk = collections.defaultdict(lambda: collections.defaultdict(int))  # path -> dn -> bytes
chunk_modules = {}   # dn -> {path: bytes}
for an, a in an_chunks.items():
    if an not in an2disk: continue
    dn = an2disk[an]
    chunk_modules[dn] = a['modules']
    for mpath, b in a['modules'].items():
        mod_in_chunk[mpath][dn] += b

# ---------- 7. Hauptansichten ----------
lh_missing = []
main_out = []
for m in MAIN:
    p = m['pfad']; sk = stats_key(p)
    fl = fl_of(sk)
    fl_set = set(fl)
    raw = sum(disk[n]['raw'] for n in fl)
    gz = sum(disk[n]['gz6'] for n in fl)
    modsum = {n: sum(chunk_modules.get(n, {}).values()) for n in fl}
    chunks = []
    for n in sorted(fl, key=lambda x: -disk[x]['raw']):
        mods = chunk_modules.get(n, {})
        tot = sum(mods.values()) or 1
        top = sorted(mods.items(), key=lambda kv: -kv[1])[:10]
        stufe = tiers[n]['tier']
        zugeordnet = stufe != 'ohne Zuordnung'
        chunks.append({'chunk': n, 'stufe': stufe, 'roh': disk[n]['raw'], 'gzip6': disk[n]['gz6'],
                       'modul_summe_roh': modsum[n], 'nicht_zugeordnet': disk[n]['raw'] - modsum[n],
                       'src_hinweis': [] if zugeordnet else src_hinweis(n),
                       'top10': [{'modul': k.replace('[project]/', ''), 'roh': v, 'anteil_pct': round(100.0 * v / tot, 1),
                                  'bibliothek': lib_of(k)} for k, v in top]})
    # Bibliotheken je Route (Modulbytes, roh, in Erstladung)
    libs = collections.Counter()
    for n in fl:
        for mpath, b in chunk_modules.get(n, {}).items():
            libs[lib_of(mpath)] += b
    libs['(Chunks ohne Modulzuordnung, roh)'] = sum(disk[n]['raw'] for n in fl if n not in chunk_modules)
    # Lighthouse
    lh_path = os.path.join(LH, LH_SLUG[p] + '-mobil-1.report.json') if LH else ''
    lh = {'datei': lh_path}
    if lh_path and os.path.exists(lh_path):
        d = json.load(open(lh_path))
        items = d['audits']['network-requests']['details']['items']
        scripts = [(it['url'].split('/_next/')[-1] if '/_next/' in it['url'] else it['url'], it.get('transferSize', 0), it.get('resourceSize', 0))
                   for it in items if it.get('resourceType') == 'Script']
        lh_all = sum(t for _, t, _ in scripts)
        lh_fl = sum(t for u, t, _ in scripts if os.path.basename(u) in fl_set)
        lh_extra = [{'datei': os.path.basename(u), 'uebertragen': t, 'roh': r} for u, t, r in scripts if os.path.basename(u) not in fl_set]
        lh_missing_fl = sorted(fl_set - {os.path.basename(u) for u, _, _ in scripts})
        lh.update({'skripte': len(scripts), 'uebertragen_alle': lh_all, 'uebertragen_erstladung': lh_fl,
                   'nachladung_in_lighthouse': lh_extra, 'erstladung_nicht_in_lighthouse': lh_missing_fl,
                   'gesamt_bytes_seite': d['audits']['total-byte-weight'].get('numericValue')})
    else:
        lh_missing.append(p)
    main_out.append({'pfad': p, 'stats_route': sk, 'anzahl_chunks': len(fl), 'roh_summe': raw, 'gzip6_summe': gz,
                     'chunks': chunks, 'bibliotheken_roh': dict(libs.most_common()), 'lighthouse': lh})

# gemeinsame Pakete (in allen 12 Hauptansichten)
sets = {m['pfad']: set(fl_of(stats_key(m['pfad']))) for m in MAIN}
shared = set.intersection(*sets.values())
shared_list = []
for n in sorted(shared, key=lambda x: -disk[x]['raw']):
    mods = chunk_modules.get(n, {})
    tot = sum(mods.values()) or 1
    top = sorted(mods.items(), key=lambda kv: -kv[1])[:10]
    shared_list.append({'chunk': n, 'roh': disk[n]['raw'], 'gzip6': disk[n]['gz6'],
                        'in_hauptansichten': sum(1 for s in sets.values() if n in s),
                        'top10': [{'modul': k.replace('[project]/', ''), 'roh': v, 'anteil_pct': round(100.0 * v / tot, 1), 'bibliothek': lib_of(k)} for k, v in top]})

# Client-Module aus src (use client)
use_client = []
src_files = []
for root, _, files in os.walk(REINRAUM + '/src'):
    for fn in files:
        if fn.endswith(('.ts', '.tsx', '.js', '.jsx', '.mjs')):
            src_files.append(os.path.join(root, fn))
for f in sorted(src_files):
    txt = open(f, encoding='utf-8', errors='replace').read()
    stripped = re.sub(r'^(\s*(//[^\n]*\n|/\*.*?\*/\s*))*', '', txt, flags=re.S)
    if not re.match(r'\s*(["\'])use client\1', stripped): continue
    rel = os.path.relpath(f, REINRAUM)
    use_client.append(rel)

uc_rows = []
main_routes = [m['pfad'] for m in MAIN]
all_fl = {rk: set(fl_of(rk)) for rk in rbs}
for rel in use_client:
    mp = '[project]/' + rel
    chunks_of = mod_in_chunk.get(mp, {})
    gesamt = sum(chunks_of.values())
    in_main = [p for p in main_routes if chunks_of and set(chunks_of) & sets[p]]
    in_erst = [rk for rk in rbs if set(chunks_of) & all_fl[rk]]
    uc_rows.append({'datei': rel, 'roh_in_client_chunks': gesamt, 'chunks': sorted(chunks_of),
                    'in_hauptansichten_erstladung': in_main, 'anzahl_routen_erstladung': len(in_erst),
                    'anzahl_routen_gesamt': len(rbs),
                    'nur_nachladung': bool(chunks_of) and not any(set(chunks_of) & sets[p] for p in main_routes)})
uc_rows.sort(key=lambda r: -r['roh_in_client_chunks'])
uc_no_bundle = [r['datei'] for r in uc_rows if r['roh_in_client_chunks'] == 0]

# Bibliotheken ueber alle 12 (roh, gemeinsame Chunks und Minimum/Maximum je Route)
lib_names = set()
for m in main_out: lib_names.update(m['bibliotheken_roh'].keys())
lib_table = []
for ln in lib_names:
    vals = [m['bibliotheken_roh'].get(ln, 0) for m in main_out]
    lib_table.append({'bibliothek': ln, 'min_roh': min(vals), 'max_roh': max(vals), 'je_route_roh': dict(zip([m['pfad'] for m in main_out], vals))})
lib_table.sort(key=lambda r: -r['max_roh'])

# ---------- 8. Gzip-Gegenprobe gegen Lighthouse (Skriptkette der Erstladung) ----------
gz_ratio = []
for m in MAIN:
    p = m['pfad']
    lhs = [mm for mm in main_out if mm['pfad'] == p][0]['lighthouse']
    if 'uebertragen_erstladung' not in lhs: continue
    fl = fl_of(stats_key(p))
    d = json.load(open(os.path.join(LH, LH_SLUG[p] + '-mobil-1.report.json')))
    for it in d['audits']['network-requests']['details']['items']:
        if it.get('resourceType') != 'Script': continue
        n = os.path.basename(it['url'])
        if n in disk and n in fl:
            gz_ratio.append({'seite': p, 'chunk': n, 'lh_uebertragen': it['transferSize'], 'gzip6_lokal': disk[n]['gz6'],
                             'roh_lokal': disk[n]['raw'], 'roh_lh': it.get('resourceSize'),
                             'diff_bytes': it['transferSize'] - disk[n]['gz6']})

diffs = [g['diff_bytes'] for g in gz_ratio]
rel_pct = [100.0 * (g['lh_uebertragen'] - g['gzip6_lokal']) / g['gzip6_lokal'] for g in gz_ratio if g['gzip6_lokal']]
kopf_median = statistics.median(diffs) if diffs else 0
kopf_min, kopf_max = (min(diffs), max(diffs)) if diffs else (0, 0)

# ---------- 9. Summenpruefung (zwei unabhaengige Wege) ----------
sum_check = {}
for m in main_out:
    raw_chunks = sum(c['roh'] for c in m['chunks'])
    raw_direct = sum(disk[n]['raw'] for n in fl_of(stats_key(m['pfad'])))
    gz_chunks = sum(c['gzip6'] for c in m['chunks'])
    gz_direct = sum(disk[n]['gz6'] for n in fl_of(stats_key(m['pfad'])))
    lhs = m['lighthouse']
    fl_names = [n for n in fl_of(stats_key(m['pfad']))]
    net_fl = (lhs.get('uebertragen_erstladung', 0) - kopf_median * len(fl_names)) if lhs.get('uebertragen_erstladung') else None
    sum_check[m['pfad']] = {'roh_ok': raw_chunks == raw_direct == m['roh_summe'], 'gzip_ok': gz_chunks == gz_direct == m['gzip6_summe'],
                            'lh_erstladung_ohne_kopf': round(net_fl) if net_fl else None,
                            'abweichung_pct_gzip_vs_lh_erstladung_ohne_kopf': round(100.0 * (m['gzip6_summe'] - net_fl) / net_fl, 1) if net_fl else None,
                            'lh_abweichung_pct_alle': round(100.0 * (m['gzip6_summe'] - m['lighthouse'].get('uebertragen_alle', 0)) / m['lighthouse'].get('uebertragen_alle', 1), 1) if m['lighthouse'].get('uebertragen_alle') else None,
                            'lh_abweichung_pct_erstladung': round(100.0 * (m['gzip6_summe'] - m['lighthouse'].get('uebertragen_erstladung', 0)) / m['lighthouse'].get('uebertragen_erstladung', 1), 1) if m['lighthouse'].get('uebertragen_erstladung') else None}


# zod-Importeure in src und ihre Lage im Client-Graph der Hauptansichten
zod_imp = []
for root, _, files in os.walk(REINRAUM + '/src'):
    for fn in files:
        if not fn.endswith(('.ts', '.tsx', '.js', '.jsx', '.mjs')): continue
        fp_ = os.path.join(root, fn)
        t_ = open(fp_, encoding='utf-8', errors='replace').read()
        if re.search(r"from ['\"]zod['\"]", t_):
            rel = os.path.relpath(fp_, REINRAUM); mp = '[project]/' + rel
            ch = sorted(mod_in_chunk.get(mp, {}).keys())
            zod_imp.append({'datei': rel, 'use_client': bool(re.match(r'\s*(["\'])use client\1', re.sub(r'^(\s*(//[^\n]*\n|/\*.*?\*/\s*))*', '', t_, flags=re.S))),
                            'in_client_chunks': sorted(mod_in_chunk.get(mp, {}).keys()),
                            'in_hauptansichten': [p for p in main_routes if set(mod_in_chunk.get(mp, {}).keys()) & sets[p]]})
zod_gesamt = {}
for n in ('21ludfwbeufxn.js',):
    if n in chunk_modules:
        zod_gesamt[n] = {'roh': disk[n]['raw'], 'gzip6': disk[n]['gz6'], 'modul_summe': sum(chunk_modules[n].values()),
                         'zod_module': sum(v for k, v in chunk_modules[n].items() if '/node_modules/zod/' in k),
                         'routen_hauptansichten': [m['pfad'] for m in main_out if n in fl_of(m['stats_route'])]}
analyzer_ohne = []
for an in sorted(set(an_chunks) - set(an2disk)):
    mods = an_chunks[an]['modules']
    analyzer_ohne.append({'analyzer': an, 'roh_summe': an_chunks[an]['size'], 'anzahl_module': len(mods),
                          'top3': [{'modul': k.replace('[project]/', ''), 'roh': v} for k, v in sorted(mods.items(), key=lambda kv: -kv[1])[:3]],
                          'use_client_module': sorted(k.replace('[project]/', '') for k in mods if k.replace('[project]/', '') in {'src/' + u[4:] for u in use_client})})

result = {
    'build': {'commit': '3b10790', 'reinraum': REINRAUM, 'werkzeug': 'npx next experimental-analyze --output (Next 16.3.6)',
              'analyzer_ausgabe': DATA + '/..', 'gzip': 'gzip Level 6 (Node/zlib-Standard, wie Next-Server)',
              'einheit': 'Byte roh; gzip6 je Datei; KiB = Byte/1024'},
    'analyzer_namensabgleich': {'analyzer_namen': len(an_chunks), 'platten_chunks': len(disk),
                                'zuordnung_je_stufe': dict(tier_counts),
                                'zuordnung_zugeordnet': len(an2disk), 'analyzer_ohne_platten_gegenstueck': unmapped_an,
                                'groessenverhaeltnis_min_max': [round(ratios[0], 4), round(ratios[-1], 4)],
                                'analyzer_namen_identisch_mit_platte': sum(1 for a in an_chunks if a in disk),
                                'gleichnamige_ausgaben_je_datei_identisch': all(x.get('identisch', True) for x in dup_info if 'identisch' in x),
                                'konflikte_groesse': [x for x in dup_info if 'konflikt_groesse' in x][:10],
                                'platten_chunks_je_stufe': {dn: {'stufe': t['tier'], 'analyzer': t['analyzer'], 'abw_pct': t.get('abw_pct'), 'kandidaten': t['kandidaten']} for dn, t in tiers.items()}},
    'validierung_firstload_gegen_analyzer': {'routen_in_stats': routes_stats_total, 'routen_geprueft': routes_validated,
                                             'davon_ohne_fehlende_chunks': routes_validated_ok, 'details': route_validation},
    'validierung_html_gegen_firstload': route_html_check,
    'validierung_manifest_modul_zu_chunk': {'manifest_module': len(manifest_mods), 'uebereinstimmend': man_ok,
                                            'abweichend': man_bad, 'abweichungen': man_bad_list[:20]},
    'gzip_gegenprobe_lighthouse': {'paare': len(gz_ratio), 'differenz_bytes_median': kopf_median,
                                   'differenz_bytes_min_max': [kopf_min, kopf_max],
                                   'hinweis': 'Lighthouse transferSize = gzip6 lokal + konstanter Antwortkopf (ca. 1,6 KB je Anfrage)',
                                   'beispiele': gz_ratio[:6]},
    'hauptansichten': main_out,
    'hauptansichten_fehlende_lighthouse': lh_missing,
    'gemeinsame_chunks_alle_12': shared_list,
    'client_module_src': uc_rows,
    'client_module_src_ohne_bundle': uc_no_bundle,
    'bibliotheken': lib_table,
    'summenpruefung': sum_check,
    'zod_importeure_src': zod_imp,
    'zod_chunk': zod_gesamt,
    'analyzer_chunks_ohne_platte': analyzer_ohne,
}
os.makedirs(OUT, exist_ok=True)
json.dump(result, open(OUT + '/BUENDEL.json', 'w'), ensure_ascii=False, indent=1)
print('JSON geschrieben', OUT + '/BUENDEL.json')
