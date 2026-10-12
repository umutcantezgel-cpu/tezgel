# Bildpaar-Auswertung (Beleg zu BEWEGUNG2.md, E4-NACH-18). Je Ordner: Bilder nach Präfix gruppieren (Folge), je Folge
# der Anteil geänderter Pixel zwischen aufeinanderfolgenden Bildern und 0 → letztes Bild (Helligkeit = Graustufen nach
# PIL-„L“, Schwelle: Helligkeitsunterschied über 24, wie das Werkzeug). Sichtbar: Bild zählt, wenn ein Nachbar über 0,5 % liegt.
# Außerdem je Ordner ein kontakt.jpg (alle Bilder nebeneinander, verkleinert) zur Ansicht.
# Aufruf: python3 anteile.py <ordner> [<ordner> ...]
import sys, glob, os, re
import numpy as np
from PIL import Image

SCHWELLE = 24
ANTEIL = 0.5

def folgen(ordner):
    gruppen = {}
    for f in glob.glob(os.path.join(ordner, '*.jpg')):
        m = re.match(r'^(.*)-(\d)\.jpg$', os.path.basename(f))
        if not m or os.path.basename(f) == 'kontakt.jpg':
            continue
        gruppen.setdefault(m.group(1), {})[int(m.group(2))] = f
    return {k: [v[i] for i in sorted(v)] for k, v in sorted(gruppen.items())}

def anteil(a, b):
    d = np.abs(a - b) > SCHWELLE
    return round(100 * d.mean(), 2)

def auswerten(ordner):
    out = []
    for name, dateien in folgen(ordner).items():
        bilder = [np.asarray(Image.open(f).convert('L')).astype(int) for f in dateien]
        paare = [anteil(bilder[k], bilder[k + 1]) for k in range(len(bilder) - 1)]
        ende = anteil(bilder[0], bilder[-1])
        sicht = [(k > 0 and paare[k - 1] > ANTEIL) or (k < len(bilder) - 1 and paare[k] > ANTEIL) for k in range(len(bilder))]
        out.append((name, paare, ende, sum(sicht), len(bilder)))
    # Kontaktbogen
    if dateien:
        ims = [Image.open(f).convert('RGB') for f in sum(folgen(ordner).values(), [])]
        w, h = ims[0].size
        sc = 300 / w
        tw, th = int(w * sc), int(h * sc)
        bogen = Image.new('RGB', (len(ims) * (tw + 8), th), (255, 255, 255))
        for i, im in enumerate(ims):
            bogen.paste(im.resize((tw, th)), (i * (tw + 8), 0))
        bogen.save(os.path.join(ordner, 'kontakt.jpg'), quality=80)
    return out

for ordner in sys.argv[1:]:
    print(f'== {os.path.basename(ordner.rstrip("/"))}')
    for name, paare, ende, sicht, n in auswerten(ordner):
        print(f'  Folge {name}: Paare % {" / ".join(f"{p:.2f}" for p in paare)} · 0→{n-1}: {ende:.2f} % · sichtbar {sicht}/{n}')
