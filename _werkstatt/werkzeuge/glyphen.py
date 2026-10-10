#!/usr/bin/env python3
# Prüfwerkzeug Glyphenabdeckung (E0-PRUEF-02b): liest die cmap jeder Schriftdatei und meldet fehlende Zeichen.
# Aufruf im Scratchpad-venv (fonttools und brotli für woff2):
#   venv-glyphen/bin/python -I glyphen.py <zeichen.txt> <font.woff2> [<font> …]
# Ausgabe (stdout, JSON): {"<schrift>": ["U+00DF ß", …]}; bei einem Lesefehler steht in der Liste "FEHLER: …".
# Zeichen: jede Codepoint-Stelle der Datei, ohne Leerraum und Steuerzeichen; das geschützte Leerzeichen U+00A0 bleibt.
# Ein Zeichen gilt als fehlend, wenn die cmap es nicht kennt oder auf .notdef zeigt.
import json
import sys
import unicodedata

from fontTools.ttLib import TTFont

STEUER = {'Cc', 'Cf', 'Cs', 'Co', 'Cn', 'Zl', 'Zp'}


def zeichen_aus_datei(pfad):
    """Eindeutige Zeichen der Datei (UTF-8), nach Codepoint sortiert."""
    with open(pfad, encoding='utf-8') as f:
        text = f.read()
    gesehen = set()
    for c in text:
        if c == ' ':
            gesehen.add(c)
        elif c.isspace() or unicodedata.category(c) in STEUER:
            continue
        else:
            gesehen.add(c)
    return sorted(gesehen, key=ord)


def fehlende(schrift, zeichen):
    """Fehlende Zeichen einer Schrift als Liste „U+XXXX z“."""
    font = TTFont(schrift)
    try:
        cmap = font.getBestCmap() or {}
    finally:
        font.close()
    fehlt = []
    for c in zeichen:
        glyphe = cmap.get(ord(c))
        if glyphe is None or glyphe == '.notdef':
            fehlt.append(f'U+{ord(c):04X} {c}')
    return fehlt


def main(argv):
    if len(argv) < 3:
        sys.stderr.write('Aufruf: glyphen.py <zeichen.txt> <font> [<font> …]\n')
        return 2
    zeichen = zeichen_aus_datei(argv[1])
    ergebnis = {}
    for schrift in argv[2:]:
        try:
            ergebnis[schrift] = fehlende(schrift, zeichen)
        except Exception as e:  # Lesefehler je Schrift melden, nicht verschlucken
            ergebnis[schrift] = [f'FEHLER: {type(e).__name__}: {e}']
    sys.stdout.buffer.write((json.dumps(ergebnis, ensure_ascii=False, indent=1) + '\n').encode('utf-8'))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
