# P4-Tor Runde 2 und T2 `/` · Vorschau c5ef582-v (nach P4-13)

**Gegenstand:**
- Vorschau-Kandidat `c5ef582-v`, Port 4321: `/` (live Kern) und die sechs Hauptseiten-Entwürfe, freigeschaltet in der Kopie.
- Kandidat `c5ef582`, Port 4324: das, was nach dem Push live geht; Entwürfe ruhend.

**Bezug:**
- Live f2c4180 (4337)
- Bestand-`/` a8e049f (4323)
- Ausgangsstand 707a93d (4310)

**Anlass:** Der Gegenprüfer P4-GEG ließ Runde 1 nicht bestehen (H1, H2, M1–M4, N1–N8). P4-13 (0d26ca5, Abnahme E-034) behebt H1 und H2 und wirkt sofort auf die Live-Startseite `/`. Deshalb gehört zu dieser Runde das volle T2 für `/`.

## Befunde aus Runde 1
| Befund | Stand | Beleg |
|---|---|---|
| **H1** ohne JS: kein WhatsApp-Weg am Desktop, Kanal verborgen im Server-HTML | **behoben.** a11y-zusatz „ohne JS“ 0 (Runde 1: rot 4). Server-HTML aller 7 Kern-Seiten: Kopf-Link „WhatsApp-Chat starten“ vorhanden, Kanal nicht vorhanden; nach der Hydrierung Kanal mit unverändertem Namen (m375 und d1440) | `../p4tor-r2-a11y/`, `kanal/kanal-probe-4321.json` |
| **H2** Banner verdeckt am Desktop die Einleitung (Fünf-Sekunden) | **behoben.** Protokoll Desktop auf allen 7 Seiten ≥ Bestand; strenge Lesart `/standorte` d1440 3 → 5 (dort stand die Zielgruppe unter dem alten Banner). Offen bleibt wie in Runde 1 der **Wortlaut** (M-20) | `fuenf/ERGEBNIS.md` |
| M1 Kern-Fall F-12 `/standorte` mobil übersprungen | behoben (Runde 1) und jetzt durch Mutation belegt: P6 einzeln → `/standorte` mobil rot | `mutation/MUTATION.md` |
| M2 Sperrklinke | Laufzeit-Sperrklinke grün: 398 Fälle; statisch 12 Specs, 116 Fälle, 507 `expect` | `suite.json`, `../testzahl-basis.json` |
| M3 Pixel nicht freigeschalteter Seiten | **Runde-1-Ergebnis ungültig (E-036, Maskenfehler).** Mit berichtigtem Werkzeug: Rauschen 64/0, Vorschau gegen Live 64 Vergleiche, 1 abweichend (`/fliesen` m375, zeitabhängige Sprechblase des Bestands-Kanals), mit ergänzter Maske 2 × 4/0 | `pixel/` |
| M4 axe in Fehlerzuständen | 8 Läufe Fehlerzustand, 0 | `../p4tor-r2-axe/` |
| N1–N8 | wie in Runde 1 umgesetzt; N3: Gegenprobe mit denselben Eingaben wiederholt | unten |

## Ergebnis je Kriterium (Vorschau c5ef582-v)
| Kriterium | Prüfung | Ergebnis | Beleg |
|---|---|---|---|
| Z-05 | Reinraum c5ef582-v und c5ef582: npm ci, Build, typecheck, lint, `npm test`, qa:graph | alle Exit 0 | `../../cache/reinraum-c5ef582*/ergebnis.txt` (lokal) |
| Z-05 | Suite (12 Specs, beide Projekte, `RELAUNCH_FASSUNG=vorschau`, Kern-Zweige für 7 Seiten) | **382 grün · 1 rot · 15 übersprungen**; Sperrklinke grün. Rot: Konfigurator „Gutfall WhatsApp“ Desktop, eine **Bestandsseite** (`/fliesen/konfigurator`), unter Last (parallel a11y-zusatz): Der Klick traf nacheinander wechselnde Elemente, weil die Seite noch rollte (`scroll-behavior: smooth` im Bestand). Einzeln wiederholt: Vorschau 6/6, Live 6/6. Die Seite ist im HTML gleich Live (T1); P4-13 berührt sie nicht. Test-Härtung → Testschreiber W4 (LERNEN) | `suite.json`, `konfigurator-wdh-4321.json`, `konfigurator-wdh-4337.json` |
| Z-11 | a11y-zusatz, 7 Seiten × m375/d1440, harte Kennzahlen | 0, außer **„dünn“ 1**: `/` m375 Erstbesuch, Stimmen-Bereich, 1 492/1 526, `ring-unter-fester-ebene`. Das ist derselbe Fall wie Live (E-018 Nachtrag, entschieden). Ohne JS 0 (Runde 1: 4). Information: Ring teilverdeckt (fest) 51 (Runde 1: 133 bei 6 Seiten), Zoom-CSS horizontal 7/verdeckt 7 (gleichwertige Probe 0) | `../p4tor-r2-a11y/a11y-zusatz.json` |
| Z-11 | axe (wcag2a/aa, 21a/aa, 22aa), 7 Seiten | **57 Läufe, 0 ernst/kritisch**: 4 Ansichten normal (28), Menü m375 (7), Erstbesuch m375/d1440 (14), Fehlerzustände (8) | `../p4tor-r2-axe/axe.json` |
| Z-13 | Fotos 7 Seiten × 4 Ansichten, Überlauf, Kontaktbögen selbst gesichtet | 28/28, 0 Fehler, **0 Überlauf**, 0 Konsolenfehler; Kopf mit WhatsApp ab lg, untere Leiste darunter | `../p4tor-r2-fotos/` |
| Z-13 | Wortbruch 7 Seiten × 320/375/768/1024/1440/1920 | **0** | `../p4tor-r2-wortbruch/` |
| Z-13 | Pixel, nicht freigeschaltete Seiten (M3) | siehe oben, nach Maske 0 | `pixel/` |
| Z-06 | texte2 gegen f2c4180 mit MIKROTEXTE, 7 Seiten | **1 rot, erklärt:** `/` „entfernt aria-label ‚WhatsApp-Nachricht an Fliesenverlegung Tezgel senden‘“. Das ist die Maßnahme H1: Der Kanal steht nicht mehr im Server-HTML, im Browser schon, mit unverändertem Namen (Kanal-Probe, Funktionstest F-10 „Widget /“). Gelb neu auf `/`: Kopf-Link „WhatsApp-Chat starten“ (Bestandswortlaut, MIKROTEXTE-Zeile aufgehoben, E-034) und Neugliederung Telefon/Aufmaß im Kopf. Sechs Entwürfe wie Runde 1 (Unterschiede nur durch dieselbe Kopf-/Kanal-Änderung) | `texte2/vergleich.json` |

## L3
| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Gegenprobe (15 Wege des Ausgangsstands, Eingaben wie Runde 1) | **13/15 ≤ Bezug.** a3-m375 14 (12), wie Runde 1 → Auflage W9. a3-d1440-maus 6 (5) → E-034, Auflage P6. Tastatur a1 22 (23), a3 30 (34), a5 36 (114): je +1 gegenüber Runde 1 durch den Kopf-Link, weiter unter Bezug. a4 endet nach erreichtem Ziel mit „nicht gefunden“ (Ortsknöpfe heißen im Kern anders, wie Runde 1). „1 hoch“ in a5-Tastatur ist aus den Eingaben des Ausgangsstands übernommen (N3) | `gegenprobe/matrix.json` |
| Probeläufer frei | nicht wiederholt. P4-13 ändert nur die Hülle; die Gegenprobe deckt dieselben Wege | Runde 1 |
| Fünf-Sekunden-Probe (Regel vorab, 3 Bewerter) | **H2 behoben; rot bleibt der Wortlaut.** Protokoll: Desktop überall ≥ Bestand; mobil `/kontakt` 2 (5), `/leistungen` 4 (5), `/ueber-uns` 3 (3, unter Schwelle). Umkehrprobe 140/140 Zielgruppen-Urteile gleich. Strenge Lesart gesamt 37 → 46; Desktop `/ueber-uns` 4 → 0 (Einleitung frei, nennt keine Zielgruppe → M-20). `/` 5/5 und 5/5 | `fuenf/ERGEBNIS.md` |
| Mutationsprobe | **P6 einzeln: 6/6 Kartenfälle rot**, darunter `/standorte` mobil; übrige 42 grün | `mutation/MUTATION.md` |

## T2 `/` (P4-13 wirkt sofort live)
| Prüfung | Ergebnis | Beleg |
|---|---|---|
| build-vergleich streng f2c4180 → c5ef582 | HTML 172: nur `index.html` abweichend. CSS: 7 Selektoren weg (alte Banner-Mess-Klassen, `k-anzeige` umgestellt), 29 neu (Leiste, Tokens), 5 Variablen neu (`--k-banner-*`) | `../build-vergleich-f2c4180-c5ef582-streng/bericht.json` |
| Pixel `/` Live gegen Kandidat (berichtigtes Werkzeug) | Rauschen 4/0. m375, t768 gleich; d1440/d1920 je 4 060 px nur Zeile 8–55 (Kopf: WhatsApp-Link, Navigation rückt zusammen), erwartet | `pixel-start/` |
| Lighthouse `/` mobil, 10 verschränkte Paare, ruhiges Fenster | gegen Live: Punkte 86 → 85, TBT 253 → 249, LCP 3 465 → 3 469, Speed Index 1 507 → 1 074; Desktop 100 = 100. Gegen Bestand: Punkte 84 → 86, LCP −17,9 %, **TBT 159 → 247** → E-035 | `../t2-c5ef582-gegen-live/`, `../t2-c5ef582-gegen-bestand/` |
| INP `/` verschränkt gegen Bestand (4×, je 5) | Kandidat **max 80 ms**, keine Interaktion über Budget (200) oder über Bestand: m375 Menü 136 → 64, Formular 112 → 56, Seitenwechsel 80 = 80; d1440 Menü 296 → 48, Formular 376 → 64 (1 Lauf Messqualität „unsicher“), Seitenwechsel 280 → 72 ms | `inp.json` |
| Suite, a11y, axe, Fotos, Wortbruch, texte2, Fünf-Sekunden `/` | wie oben (alle schließen `/` ein) | oben |

**Z-12:** Die Frist „TBT ≤ 200 ms und ≤ Bestand bis zum P4-Tor“ ist verfehlt (E-035). P4-13 verschlechtert nichts gegen Live. Maßnahme A (Aufschub) kommt als P4-14 vor der Freischaltung von W1. Die nötige Werkzeugregel entscheidet der Gegenprüfer (P4-GEG2, Frage 5).

## Werkzeugbefund dieser Runde
**E-036:** Die Pixelvergleiche seit P2-PLAN-01 waren blind, weil die Kanal-Maske die ganze Seite ausblendete. Das Werkzeug ist berichtigt (Maske nur Knopf und Sprechblase, Selbstprüfungen gegen „zu viel maskiert“ und „leere Aufnahme“). Nachgeprüft wurden:
- `/` (T2)
- die M3-Stichprobe
- rückwirkend Ausgangsstand gegen Live über dieselbe Stichprobe: einzige Abweichung ist der gewollt leere Einwilligungshaken auf `/leistungen/aussen` (N-14)

Ein Vollvergleich aller Bestandsseiten läuft als Nachtrag.

## Auflagen (übernommen und ergänzt)
- **W1 `/bad`:** wie Runde 1, dazu **P4-14 (TBT) vorher**.
- **W2 `/leistungen`, W9 `/kontakt`:** Fünf-Sekunden mobil (M-20).
- **W8 `/ueber-uns`:** Zielgruppe im Wortlaut (M-20), jetzt auch m375 unter Schwelle und d1440 in der strengen Lesart.
- **W3 `/standorte`:** erfüllt (Einleitung frei, strenge Lesart 5/5).
- **P6 `/`:** Absenden des Hero-Formulars im Bild (E-034); kürzere Einstiege bei 1024/1280.
- **W4 `/fliesen`:** Test-Härtung Konfigurator (Rollstand vor Klick).

## Urteil (Orchestrator, vor dem Gegenprüfer)
- **Z-05, Z-11, Z-13 auf den Hauptseiten:** erfüllt. Ausnahmen sind der erklärte Lastfall der Suite (Bestandsseite, einzeln grün) und „dünn“ 1 (E-018-Nachtrag, wie Live).
- **L3:** ausgewertet. Die Fünf-Sekunden-Probe bleibt im Wortlaut rot; das ist eine Auflage an W2, W8 und W9 und hängt an M-20.
- **T2 `/`:** Ränge 1–4 grün, nichts schlechter als Live. Gegen den Bestand bleibt TBT offen (E-035, P4-14).
- **Entscheidung über Push und Tor:** P4-GEG2.
