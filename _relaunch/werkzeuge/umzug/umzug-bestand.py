#!/usr/bin/env python3
"""P3-00h · Umzug des Bestands in die Routen-Gruppe (bestand) (E-015).
Inhaltsneutral: Layout-Baum wird wörtlich in src/app/(bestand)/_dokument.tsx verschoben,
(bestand)/layout.tsx rendert ihn, app/global-not-found.tsx rendert ihn mit dem Inhalt der 404.
Nutzung: umzug-bestand.py <repo-wurzel>"""
import os, re, sys, shutil, pathlib
wurzel = pathlib.Path(sys.argv[1]).resolve()
app = wurzel / 'src/app'
ziel = app / '(bestand)'
BLEIBT = {'api', 'fonts', 'globals.css', 'robots.ts', 'sitemap.ts', 'llms.txt', 'video-sitemap.xml', 'icon.png', 'apple-icon.png', '(bestand)', '(kern)', 'global-not-found.tsx'}
assert (app / 'layout.tsx').exists(), 'layout.tsx fehlt – Umzug schon erfolgt?'
ziel.mkdir(exist_ok=True)
for e in sorted(os.listdir(app)):
    if e in BLEIBT: continue
    shutil.move(str(app / e), str(ziel / e))

# 1) Layout → BestandDokument (wörtlich), Layout wird schlank
lay = (ziel / 'layout.tsx').read_text()
dok = lay.replace("import './globals.css';", "import '@/app/globals.css';")
dok = dok.replace('export const metadata: Metadata =', 'export const BESTAND_METADATA: Metadata =')
dok = dok.replace('export const viewport: Viewport =', 'export const BESTAND_VIEWPORT: Viewport =')
dok = re.sub(r'export default function RootLayout\(', 'export default function BestandDokument(', dok)
dok = '// Dokument-Gerüst der Bestandsseiten (E-015): wörtlich aus dem früheren Root-Layout übernommen.\n' + dok
(ziel / '_dokument.tsx').write_text(dok)
(ziel / 'layout.tsx').write_text("""import type { Metadata, Viewport } from 'next';
import BestandDokument, { BESTAND_METADATA, BESTAND_VIEWPORT } from './_dokument';

export const metadata: Metadata = BESTAND_METADATA;
export const viewport: Viewport = BESTAND_VIEWPORT;

export default function BestandLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <BestandDokument>{children}</BestandDokument>;
}
""")

# 2) 404 für unbekannte Adressen: gleiches Gerüst + Inhalt der bisherigen not-found
nf = (ziel / 'not-found.tsx').read_text()
m = re.search(r'export const metadata: Metadata = (\{.*?\n\});', nf, re.S)
assert m, 'Metadaten der 404 nicht gefunden'
(app / 'global-not-found.tsx').write_text("""import type { Metadata, Viewport } from 'next';
import BestandDokument, { BESTAND_METADATA, BESTAND_VIEWPORT } from './(bestand)/_dokument';
import NotFound, { metadata as nichtGefunden } from './(bestand)/not-found';

// Unbekannte Adressen (E-015): eigenes Dokument, da es mehrere Root-Layouts gibt.
// Titel wie bisher über die Vorlage des Root-Layouts gebildet (inhaltsneutraler Umzug; doppelte Marke ist Altbestand, Korrektur in P4-10).
export const metadata: Metadata = { ...BESTAND_METADATA, ...nichtGefunden, title: `${nichtGefunden.title} | Fliesenverlegung Tezgel` };
export const viewport: Viewport = BESTAND_VIEWPORT;

export default function GlobalNotFound() {
  return (
    <BestandDokument>
      <NotFound />
    </BestandDokument>
  );
}
""")

# 3) Schalter in next.config.ts
cfg = (wurzel / 'next.config.ts').read_text()
if 'globalNotFound' not in cfg:
    cfg = cfg.replace('  experimental: {\n', '  experimental: {\n    // E-015: mehrere Root-Layouts (bestand/kern) → 404 für unbekannte Adressen über app/global-not-found.tsx\n    globalNotFound: true,\n', 1)
    (wurzel / 'next.config.ts').write_text(cfg)

# 4) Bestands-CSS byte-gleich halten: Kern-Code nicht in globals.css scannen
g = (app / 'globals.css').read_text()
if '@source not "../components/kern"' not in g:
    g = g.replace('@source not "../../_relaunch";', '@source not "../../_relaunch";\n/* E-015: Kern-Code hat ein eigenes CSS (kern-global.css). */\n@source not "../components/kern";\n@source not "../lib/kern";\n@source not "./(kern)";', 1)
    (app / 'globals.css').write_text(g)
print('Umzug fertig:', len(os.listdir(ziel)), 'Einträge in (bestand)')
