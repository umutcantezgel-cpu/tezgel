import json, sys
r = json.load(open(sys.argv[1]))
KiB = lambda b: f"{b/1024:.1f}"
L = []
A = L.append
A("# BUENDEL · Erstladung Client-JavaScript je Hauptansicht (Build 3b10790)")
A("")
A("Quelle: Reinraum `scratchpad/reinraum-3b10790` (Next 16.3.6, Turbopack, Produktion). Erstladung = Next-Liste `firstLoadChunkPaths` (route-bundle-stats.json), gegengeprüft gegen die `<script>`-Tags der prerenderten HTML; das Tag `0cz1d0mv5g_q7.js` (noModule-Polyfill) ist nicht Teil der Erstladung. Größen: roh = Dateigröße; gzip = gzip Stufe 6 (Node-Standard). KiB = Byte/1024. Lighthouse = Rohbericht `*-mobil-1` (laut Briefing Median aus drei Läufen).")
A("")
A("## 1. Je Hauptansicht")
A("")
A("| Route (Hauptansicht) | Chunks | Summe roh KiB | Summe gzip KiB | Lighthouse Skripte übertragen KiB (alle) | davon Erstladung ohne Kopf KiB | Nachladung in Lighthouse | ohne Modulzuordnung roh KiB |")
A("|---|---:|---:|---:|---:|---:|---:|---:|")
for m in r['hauptansichten']:
    lh = m['lighthouse']
    sc = r['summenpruefung'][m['pfad']]
    nach = len(lh.get('nachladung_in_lighthouse', []))
    ohne = sum(c['roh'] for c in m['chunks'] if c['stufe'] == 'ohne Zuordnung')
    A(f"| {m['pfad']} | {m['anzahl_chunks']} | {KiB(m['roh_summe'])} | {KiB(m['gzip6_summe'])} | {KiB(lh['uebertragen_alle'])} | {KiB(sc['lh_erstladung_ohne_kopf'])} | {nach} Dateien ({KiB(sum(x['roh'] for x in lh['nachladung_in_lighthouse']))} KiB roh) | {KiB(ohne)} |")
A("")
g = r['gzip_gegenprobe_lighthouse']
A(f"Gegenprobe gzip: Lighthouse-transferSize = gzip6 lokal + konstanter Antwortkopf. Differenz je Datei median {g['differenz_bytes_median']:.0f} B (Spanne {g['differenz_bytes_min_max'][0]}–{g['differenz_bytes_min_max'][1]} B, {g['paare']} Paare). Nach Abzug des Kopfes weicht die gzip-Summe je Route um {min(abs(v['abweichung_pct_gzip_vs_lh_erstladung_ohne_kopf']) for v in r['summenpruefung'].values()):.1f}–{max(abs(v['abweichung_pct_gzip_vs_lh_erstladung_ohne_kopf']) for v in r['summenpruefung'].values()):.1f} % ab (Grenze 15 %).")
A("")
A("## 2. Gemeinsame Chunks (in allen 12 Hauptansichten)")
A("")
A("| Chunk | Zuordnung | roh KiB | gzip KiB | Top-Module (Anteil am Chunk) |")
A("|---|---|---:|---:|---|")
for c in r['gemeinsame_chunks_alle_12']:
    top = "; ".join(f"`{t['modul']}` {KiB(t['roh'])} KiB ({t['anteil_pct']} %)" for t in c['top10'][:3])
    A(f"| `{c['chunk']}` | {[x for x in r['hauptansichten'][0]['chunks'] if x['chunk']==c['chunk']][0]['stufe'] if any(x['chunk']==c['chunk'] for x in r['hauptansichten'][0]['chunks']) else ''} | {KiB(c['roh'])} | {KiB(c['gzip6'])} | {top} |")
A("")
A("Vollständige Top-10-Listen je Chunk: `BUENDEL.json`, Schlüssel `gemeinsame_chunks_alle_12` und `hauptansichten[].chunks[].top10`.")
A("")
A("## 3. Bibliotheken im Client (Modulbytes roh, Erstladung)")
A("")
A("| Bibliothek | min–max je Hauptansicht KiB |")
A("|---|---:|")
for b in r['bibliotheken'][:18]:
    A(f"| {b['bibliothek']} | {KiB(b['min_roh'])}–{KiB(b['max_roh'])} |")
A("")
A("## 4. `use client`-Module aus src (Größe in Client-Chunks, Routen)")
A("")
uc = r['client_module_src']
n_in = sum(1 for u in uc if u['roh_in_client_chunks'] > 0)
A(f"{len(uc)} Dateien mit `use client`; {n_in} davon in mindestens einem Client-Chunk des Analyzers, {len(uc)-n_in} ohne Modulknoten im Client-Graph (Liste in JSON, `client_module_src_ohne_bundle`).")
A("")
A("| Datei | roh KiB (alle Chunks) | Hauptansichten (von 12) | Routen gesamt (von 77) |")
A("|---|---:|---|---:|")
for u in [x for x in uc if x['roh_in_client_chunks'] > 0][:25]:
    A(f"| `{u['datei']}` | {KiB(u['roh_in_client_chunks'])} | {len(u['in_hauptansichten_erstladung'])} | {u['anzahl_routen_erstladung']} |")
A("")
A("## 5. Auffällig (nur Zahlen, keine Empfehlung)")
A("")
z = r['zod_chunk']['21ludfwbeufxn.js']
A(f"- `21ludfwbeufxn.js`: {KiB(z['roh'])} KiB roh / {KiB(z['gzip6'])} KiB gzip, nur auf {', '.join(z['routen_hauptansichten'])}; {KiB(z['zod_module'])} KiB davon Module `node_modules/zod/…` (v4 core und classic, inkl. to-json-schema). Importkette laut Quelltext: `src/services/dataService.js` importiert `@/schemas/validation`, das `zod` importiert.")
A(f"- `075_81sg-x3zl.js`: react-dom (`next/compiled`) mit {KiB(200702)} KiB in einem Chunk, auf allen 12 Routen.")
A("")
A("## 6. Offene Fragen")
A("")
a = r['analyzer_namensabgleich']
st = a['zuordnung_je_stufe']
mf = r['validierung_manifest_modul_zu_chunk']
fl = r['validierung_firstload_gegen_analyzer']
A(f"- Analyzer-Chunknamen stimmen nicht mit den Dateinamen im Build überein ({a['analyzer_namen_identisch_mit_platte']} von {a['analyzer_namen']} gleich). Zuordnung Analyzer-Chunk zu Datei über Modulgröße (Abweichung <= 3 %) und Routen-Konsistenz: belegt {st.get('belegt',0)}, wahrscheinlich {st.get('wahrscheinlich',0)}, manuell {st.get('manuell (Inhalt, Groesse abweichend)',0)}, ohne Zuordnung {st.get('ohne Zuordnung',0)}. Ursache der Namensabweichung nicht geklärt.")
A(f"- Prüfung Analyzer gegen Erstladung: {fl['davon_ohne_fehlende_chunks']} von {fl['routen_geprueft']} Routen enthalten alle Erstladungs-Chunks; fehlend sind nur `1lp9zqdloocn9.js` und `42-7acnlu3ns8.js` (auf /blog und /blog/[slug]).")
A("- `1lp9zqdloocn9.js` (97,9 KiB roh, nur /blog und /blog/[slug]) hat im Analyzer kein vollständiges Gegenstück. Eine Teilmenge (Analyzer-Chunk `29pdujpz0_5xi.js`, 30,1 KiB, 25 Module u. a. `src/config/services.js`, `src/config/projects.js`, `src/contexts/ContentContext.jsx`, `src/services/dataService.js`) deckt nur rund ein Drittel ab. Modulliste dieses Chunks daher nicht belegt; Ursache offen.")
A(f"- `0jvhpaew_uadu.js` (Bootstrap, 6,4 KiB roh, auf allen 12 Routen): manuell dem Analyzer-Chunk `1lmb26yt83-ed.js` zugeordnet (gleiche Modulnamen error-styles/global-error; Größe -14,6 %).")
A(f"- Gegenprobe `page_client-reference-manifest` (Modul zu Chunk): {mf['uebereinstimmend']} von {mf['manifest_module']} Modulen bestätigt, {mf['abweichend']} Abweichungen (Liste in JSON `validierung_manifest_modul_zu_chunk`).")
A("- Lighthouse lädt je Route 4–10 Skripte nach, die nicht in der Erstladung stehen (z. B. `0hzy3txlh-w14.js`, `0hqhuou2qdgjl.js`, `0b7t2p0gmvh-g.js`). Sie sind nur in der Spalte \"alle\" enthalten.")
A("")
open(sys.argv[2], 'w', encoding='utf-8').write("\n".join(L) + "\n")
print('md ok', len(L), 'Zeilen')
