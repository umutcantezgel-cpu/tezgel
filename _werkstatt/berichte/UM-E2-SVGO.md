# UM-E2-SVGO · Bericht Grafiker (Stand 2026-10-27)

## GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/werkzeuge/svgo-statisch.config.mjs` (neu)
- `/home/user/tezgel/_werkstatt/werkzeuge/svgo-animiert.config.mjs` (neu)
- `/home/user/tezgel/_werkstatt/werkzeuge/svg.mjs`: Kopfkommentar sowie die Definitionen von STATISCH und ANIMIERT durch zwei Importe ersetzt.
- `/home/user/tezgel/_werkstatt/berichte/UM-E2-SVGO.md` (neu)
- Keine SVG-Datei verändert.
- Die drei Werkzeugdateien stehen bereits im Commit `7a8e83e6` (05:30:42). Den habe nicht ich erstellt; ich habe nichts committet oder gepusht. Seine Co-Author-Zeile ist nicht die vorgegebene.

## WAS UND WARUM
- **Konfigurationen:** Die Werte sind unverändert übernommen. Ergänzt habe ich nur `multipass: false` in beiden. Grund: svg.mjs prüft den Fixpunkt mit zwei einzelnen Läufen. Mit `multipass: true` wäre jeder Lauf schon ein Fixpunkt, die Prüfung also immer „ja“.
- **svg.mjs:** Die Konstanten bleiben benannt; an ihrer Stelle stehen zwei Importe. `node --check` ist grün.
- **Erkennung „animiert“:** svg.mjs kennt nur die Option `--animiert` für einen ganzen Lauf, keine Regel je Datei. Deshalb zwei Läufe.
- **Einordnung:** Animiert ist nur `sprite.svg`. Es hat 47 `id`, auf die `Icon.tsx` über `sprite.svg#name` verweist. Die statische Konfiguration entfernt sie (Test: 0 übrig). Alle anderen Dateien sind statisch. `pause` und `abspielen` steuern die Karussell-Bewegung, tragen aber selbst keine Animation.
- **Gegenprobe:** Die alte Fassung (Elternstand von `7a8e83e6`, Kopie im Scratchpad) und die neue liefern identische Ergebnisse: 102 von 102 (51 Dateien, beide Modi), ebenso die Optimierungsausgaben. HEAD zeigt inzwischen die neue Fassung, daher der Elternstand.

## GEMEINSAME DATEIEN
keine

## PRÜFUNG UND ERGEBNIS
- `node --check` ist für alle drei `.mjs`-Dateien grün; beide Konfigurationen laden.
- Zahl der Dateien: 51 (wie E0 erwartet). Die Tabelle hat 51 Zeilen.
- Lauf statisch: 50 Dateien, Fixpunkt 50 von 50, optimiert 42 von 50.
- Lauf animiert: 1 Datei (sprite.svg), Fixpunkt 1 von 1, optimiert 0 von 1 (siehe OFFENE FRAGEN 1).
- Gesamt: nicht Fixpunkt 0, mit Pixelbild 2, ohne viewBox 0, über Budget 3 (zwei Logos, Sprite).
- Nicht optimiert: 9 Dateien, davon fünf Icons. Deren Geometrie stimmt; svgo schreibt nur die Pfaddaten anders (von Hand an pause und verband-halb geprüft).
- Ersparnis je Icon 25 bis 27 Byte. Der Sprite-Wert (*) ist keine echte Ersparnis.
- Alle 51 Dateien sind reines ASCII.

Tabelle (`*` markiert den nicht echten Sprite-Wert):

| Datei | Art | Bytes roh | Fixpunkt ja/nein | Ersparnis bei Optimierung in Byte | Pixelbild ja/nein | viewBox ja/nein | Budget eingehalten ja/nein |
|---|---|---|---|---|---|---|---|
| public/images/logo/tezgel-logo-dark.svg | statisch | 395903 | ja | 49 | ja | ja | nein |
| public/images/logo/tezgel-logo.svg | statisch | 395903 | ja | 46 | ja | ja | nein |
| public/images/logo/tezgel-mark.svg | statisch | 977 | ja | 201 | nein | ja | ja |
| src/components/icons/sprite.svg | animiert | 10903 | ja | 10819 * | nein | ja | nein |
| src/components/icons/svg/abdichtung.svg | statisch | 273 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/abspielen.svg | statisch | 202 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/aufmass.svg | statisch | 271 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/bad.svg | statisch | 242 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/balkon.svg | statisch | 266 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/dokument.svg | statisch | 255 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/download.svg | statisch | 232 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/dusche-rinne.svg | statisch | 260 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/fehler.svg | statisch | 200 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/fliese.svg | statisch | 231 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/fussbodenheizung.svg | statisch | 234 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/grossformat.svg | statisch | 218 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/haken.svg | statisch | 208 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/haus.svg | statisch | 231 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/hinweis.svg | statisch | 213 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/info.svg | statisch | 252 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/kalender.svg | statisch | 265 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/link-extern.svg | statisch | 239 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/mail.svg | statisch | 227 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/menue.svg | statisch | 224 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/minus.svg | statisch | 193 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/naturstein.svg | statisch | 247 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/ort.svg | statisch | 316 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/pause.svg | statisch | 211 | ja | 27 | nein | ja | ja |
| src/components/icons/svg/pfeil-links.svg | statisch | 222 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/pfeil-rechts.svg | statisch | 223 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/plus.svg | statisch | 206 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/reparatur.svg | statisch | 227 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/schliessen.svg | statisch | 217 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/schloss.svg | statisch | 249 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/sprechblase.svg | statisch | 212 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/stern-voll.svg | statisch | 276 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/stern.svg | statisch | 268 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/suche.svg | statisch | 240 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/teilen.svg | statisch | 267 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/telefon.svg | statisch | 315 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/treppe.svg | statisch | 220 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/uhr.svg | statisch | 251 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/untergrund.svg | statisch | 249 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/verband-diagonal.svg | statisch | 303 | ja | 26 | nein | ja | ja |
| src/components/icons/svg/verband-drittel.svg | statisch | 292 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/verband-fischgraet.svg | statisch | 345 | ja | 26 | nein | ja | ja |
| src/components/icons/svg/verband-halb.svg | statisch | 283 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/verband-kreuz.svg | statisch | 245 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/verband-wild.svg | statisch | 304 | ja | 26 | nein | ja | ja |
| src/components/icons/svg/winkel-rechts.svg | statisch | 209 | ja | 25 | nein | ja | ja |
| src/components/icons/svg/winkel-unten.svg | statisch | 208 | ja | 25 | nein | ja | ja |

## BILDBELEGE
keine nötig

## OFFENE FRAGEN
1. **Sprite (dringend).** Die animierte Konfiguration leert das Sprite: svgo entfernt mit `removeHiddenElems` alle 47 Symbole, die Ausgabe ist 84 statt 10.903 Byte. Ich habe die Werte wie vorgegeben übernommen. Im Scratchpad geprüft: Mit `removeHiddenElems: false` in den Overrides bleiben 47 Symbole und alle Kennungen erhalten, Fixpunkt ja. Soll dieser Override aufgenommen werden? Heute schreibt kein Werkzeug mit diesen Konfigurationen; `sprite.mjs` nutzt svgo nicht.
2. **`multipass`.** Gesetzt auf `false`. Meint K-009 mit Fixpunkt, dass die Konfiguration selbst zum Fixpunkt führt, wäre `true` richtig; dann müsste die Prüfung in svg.mjs anders aufgebaut werden.
3. **Budget des Sprites.** Es fällt nach der Icon-Regel durch (10,9 KB). Jedes Symbol liegt bei 193 bis 345 Byte. Soll es als Ausnahme gelten oder je Symbol geprüft werden?
4. **Logos.** `tezgel-logo.svg` und `tezgel-logo-dark.svg` (je 395.903 Byte, eingebettetes PNG) werden im Code nicht als SVG eingebunden. K-009 verlangt Ersetzen oder Entfernen mit Vermerk. Nicht angefasst (Logo unverändert, G8).
5. **`tezgel-mark.svg`** hat im Code keine Verwendung. Als statisch eingeordnet; bestätigen oder als ungenutzt markieren?
6. **Icon-Zahl.** K-009 nennt 45 Icons, es gibt 47. Nur gemeldet.
7. **Kleinigkeit in svg.mjs.** `optimiert_bytes` zählt Zeichen statt Byte; bei reinem ASCII ohne Wirkung. Nicht geändert.

=== ENDE UM-E2-SVGO · BEREIT ZUR RÜCKGABE ===
