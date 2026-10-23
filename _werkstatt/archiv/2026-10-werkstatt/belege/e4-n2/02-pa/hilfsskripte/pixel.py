# Ergänzende Pixelzählung (Scratchpad): geänderte Pixel je Bildpaar (Graustufe, Schwelle 24) als Anzahl und Anteil,
# plus Bereich der Änderungen. Nur Lesen der Belegbilder.
import sys, glob, os
import numpy as np
from PIL import Image
def lade(p):
    return np.asarray(Image.open(p).convert('L'), dtype=np.int16)
for ordner in sys.argv[1:]:
    bilder = sorted(glob.glob(os.path.join(ordner, '*-[0-9].jpg')), key=lambda s: int(s.rsplit('-',1)[1].split('.')[0]))
    if len(bilder) < 2:
        print(ordner, 'keine Folge'); continue
    arr = [lade(b) for b in bilder]
    h, w = arr[0].shape
    zeilen = []
    for k in range(len(arr)-1):
        d = np.abs(arr[k+1]-arr[k]) > 24
        n = int(d.sum())
        if n:
            ys, xs = np.where(d)
            box = f"x {xs.min()}-{xs.max()} y {ys.min()}-{ys.max()}"
        else:
            box = '-'
        zeilen.append(f"{k}->{k+1}: {n} px ({100*n/(h*w):.3f} %) {box}")
    print(os.path.basename(ordner), f"{w}x{h}")
    for z in zeilen: print('   ', z)
