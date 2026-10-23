# Lotband-Auswertung (Beleg zu BEWEGUNG2.md, E4-NACH-18): misst, wie sich die rote Linie am linken Rand zwischen den
# Bildern einer Lade-Folge verändert, getrennt vom übrigen Bild (dort bewegen sich zugleich die H1-Zeilen, sig-flucht).
# Aufruf: python3 lotband.py <ordner> [x-Breite in Gerätepixeln, Standard 12]
import sys, glob, os
import numpy as np
from PIL import Image

ordner = sys.argv[1]
breite = int(sys.argv[2]) if len(sys.argv) > 2 else 12
dateien = sorted(glob.glob(os.path.join(ordner, '*-[0-9].jpg')))
bilder = [np.asarray(Image.open(f).convert('L')).astype(int) for f in dateien]
farbe = [np.asarray(Image.open(f).convert('RGB')).astype(int) for f in dateien]
print(f'Ordner: {os.path.basename(ordner)} · {len(dateien)} Bilder · Lotband x 0–{breite} Gerätepixel')
for k in range(len(bilder) - 1):
    a, b = bilder[k][:, :breite], bilder[k + 1][:, :breite]
    d = np.abs(a - b) > 24
    print(f'  Bild {k} → {k+1}: geändert {100*d.mean():.2f} % der Lotband-Pixel, {d.sum()} Pixel')
for k, im in enumerate(farbe):
    col = im[:, :breite, :]
    rot = (col[:, :, 0] > 150) & (col[:, :, 1] < 90) & (col[:, :, 2] < 90)
    zeilen = np.where(rot.any(axis=1))[0]
    if len(zeilen):
        print(f'  Bild {k}: rote Linie von Zeile {zeilen.min()} bis {zeilen.max()} (Gerätepixel, {len(zeilen)} Zeilen)')
    else:
        print(f'  Bild {k}: keine rote Linie im Lotband')
