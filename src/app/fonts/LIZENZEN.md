# Schriftlizenzen

| Datei | Familie | Herkunft | Lizenz | Eingebunden in |
|---|---|---|---|---|
| `archivo-variabel.woff2` | Archivo (variabel; Achsen beschnitten auf wdth 74–100, wght 400–800; Teilmenge der genutzten Zeichen) | @fontsource-variable/archivo 5.3.0 (`archivo-latin-standard-normal.woff2`), beschnitten mit fonttools `varLib.instancer`, Teilmenge mit fonttools `pyftsubset` (UM-E3-LEISTUNG) | SIL Open Font License 1.1 – `OFL-Archivo.txt` | `src/app/(bestand)/_dokument.tsx` |
| `plex-mono-400.woff2` | IBM Plex Mono 400 (Teilmenge der genutzten Zeichen, ohne ß – ß setzt Archivo, weil die Plex-Glyphe wie „B“ wirkt) | @fontsource/ibm-plex-mono 5.3.0 (`ibm-plex-mono-latin-400-normal.woff2`), Teilmenge mit fonttools `pyftsubset` (UM-E3-LEISTUNG) | SIL Open Font License 1.1 – `OFL-IBM-Plex-Mono.txt` | `src/app/(bestand)/_dokument.tsx` |

Bestandsseiten (KERN v2): Beschnitt und Teilmengen sind nach OFL erlaubt (Modified Version); der Familienname wird nicht als Reserved Font Name beansprucht. Nicht enthaltene Zeichen (z. B. ≤ ≥ → ★ ㎡ ẞ, seit der Teilmenge auch die unten aufgeführten) fallen auf die Ersatzschrift zurück – siehe KERN K-006.

Teilmenge der genutzten Zeichen (UM-E3-LEISTUNG, 28.10.2026; Archivo 57.716 → 44.364 Byte, Plex Mono 13.420 → 10.692 Byte):
- Zeichensatz: jedes Zeichen der gebauten Seiten (`.next/server/app`, HTML und RSC), der Quelltexte unter `src/` und der Client-Bündel (`.next/static/chunks`), soweit die bisherige Datei es enthielt. Dazu Buchstaben für Namen in Formularen: ç é è ê ë à â î ï ô û ù á í ó ú ñ ı œ und ihre Großbuchstaben.
- Unverändert: Achsen, alle OpenType-Merkmale (`--layout-features='*'`), Kerning, Namen (`--name-IDs='*'`), Hinting. Umrisse, Vorschübe und Kerning-Paare der behaltenen Zeichen sind bei sieben Instanzen (wght 400 bis 800, wdth 74 und 100) gleich der vorigen Datei.
- Bewusst entfernt (Archivo 61, Plex Mono 58 Codepunkte, keiner davon kommt in den Seiten vor); diese Zeichen setzt jetzt die Ersatzschrift, auch wenn jemand sie in ein Formularfeld tippt:
  - Buchstaben für Namen: A und O mit Tilde (U+00C3, U+00D5, U+00E3, U+00F5), A mit Ring (U+00C5, U+00E5), AE (U+00C6, U+00E6), I und O mit Gravis (U+00CC, U+00D2, U+00EC, U+00F2), Y mit Akut (U+00DD, U+00FD), y mit Trema (U+00FF), Eth und Thorn (U+00D0, U+00DE, U+00F0, U+00FE); nur Archivo: A mit Breve (U+0102).
  - weitere Buchstaben und Modifikatoren: Ordinalzeichen (U+00AA, U+00BA), Mikro (U+00B5), U+02BC, U+02C6, U+02DA, U+02DC; nur Plex Mono: U+02BB.
  - Zeichen: U+00A1, U+00A2, Pfund (U+00A3), U+00A4, U+00A5, U+00A6, U+00A8, U+00AC, Register (U+00AE), U+00AF, hoch drei (U+00B3), U+00B4, U+00B6, U+00B8, hoch eins (U+00B9), U+00BF, geteilt (U+00F7), die deutschen einfachen Anführungszeichen (U+201A, U+2018), das englische schließende (U+201D), Minuten und Sekunden (U+2032, U+2033), Bruchstriche (U+2044, U+2215), Marke (U+2122), Pfeile nach oben und unten (U+2191, U+2193).
  - kombinierende Zeichen U+0304 und U+0308, nur Archivo U+0301, U+0303, U+0309, U+0323; Steuerzeichen U+000D, nur Plex Mono U+0000.
  - Die Zeichen stehen hier als Codepunkte, damit diese Datei selbst kein entferntes Zeichen enthält.
- Neu bilden, wenn ein Text ein Zeichen braucht, das hier fehlt:
  1. Liste aus der cmap der aktuellen Datei: `python -c "import sys; from fontTools.ttLib import TTFont; print('\n'.join('U+%04X' % c for c in sorted(TTFont(sys.argv[1]).getBestCmap())))" archivo-variabel.woff2 > liste.txt`, die neuen Zeichen als weitere Zeilen `U+XXXX` anhängen.
  2. Quelle ist die vollständige Datei vor UM-E3-LEISTUNG aus dem Git-Verlauf (Commit 8bad2284): `git show 8bad2284:src/app/fonts/archivo-variabel.woff2 > voll.woff2`. Die Datei hier enthält die entfernten Zeichen nicht mehr.
  3. `pyftsubset voll.woff2 --unicodes-file=liste.txt --layout-features='*' --name-IDs='*' --name-languages='*' --name-legacy --notdef-outline --flavor=woff2 --output-file=archivo-variabel.woff2`.
  4. Ebenso für `plex-mono-400.woff2`; ihre Liste bleibt ohne ß (U+00DF).
  - Mit unveränderter Liste ergibt das Verfahren beide Dateien Byte für Byte neu (geprüft). Zeichen, die schon die volle Datei nicht hatte (etwa ≤ ≥ → ★ ㎡ ẞ), lassen sich so nicht ergänzen; dafür braucht es die Quelle von @fontsource und für Archivo den Beschnitt mit `varLib.instancer`.
  - Jedes zusätzliche Zeichen macht die Dateien größer. Die Wirkung auf den mobilen LCP ist gestuft (UM-E3-LEISTUNG): Schon die 19 Buchstaben für Namen aus der ersten Liste oben (Archivo +4.124, Plex Mono +676 Byte) halbieren in der Rechnung die Senkung im häufigsten Fall.
