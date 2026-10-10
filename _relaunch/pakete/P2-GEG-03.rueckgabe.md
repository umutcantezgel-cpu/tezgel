# P2-GEG-03 · Rückgabe · Gegenprüfung Gesamtplan (L0 Runde 3, letzte Runde)

Kennung P2-GEG-03 · Rolle Gegenprüfer · Stufe 3 · Opus (frisch) · Kern v1.2 · Schreibrechte: nur diese Datei · Umfang: PLAN.md „Gesamtplan · L0 Runde 3“ (Z. 444–497) mit Runde 2 (Z. 362–440) gegen P2-GEG-02 (N-01–N-23), E-014–E-017, KERN v1.2 und die Werkzeuge `freischalten.sh`, `live-browser.mjs`, `live-rauchtest.sh`, `testzahl.mjs`, `reinraum.sh`, `commit.sh`. Dazu gelesen: `build-vergleich.mjs`, `server.sh`, `umzug/umzug-bestand.py`, `src/lib/motion/*`, `src/styles/kern.css`, PRUEFPUNKT, STATUS, NEBELKARTE, ABNAHME, AUFTRAG §12. Kein Build, kein Server, kein Netz. Stand: HEAD = origin/main = 50352ad.

## Urteil
**L0 bestanden mit Auflagen.** Runde 3 setzt die Auflagen der zweiten Gegenprüfung in der Sache um:
- drei Tore T1–T3 (E-017), die Freischaltung als geprüfter, selbst committender Ablauf mit Baumvergleich gegen den Kandidaten,
- Vorschau-Kandidat, Bauregeln 1–9, P3-00k–o,
- P5–P7 mit Kriterien, korrigierter Pfad, KERN v1.2.

Von 23 Befunden sind 16 erledigt und 7 teilweise erledigt; keiner ist offen geblieben. Neu ist ein Befund „hoch“ (H-1): Das Wellen-Tor T1 erkennt Änderungen an JavaScript, Inline-Skripten und CSS-Werten nicht. Der „Ruhe-Beweis“ gilt deshalb nur für Markup und CSS-Namen. Die Gegenmaßnahme ist Skript- und Textarbeit von wenigen Stunden (Auflage 1). Sie ist fällig, bevor zum ersten Mal ein Push nur mit T1 Dateien unter `src/` berührt. P3-00o, P3-00h, P3-00k und P3-00l laufen ohnehin über T2 und dürfen beginnen.

## A) Befunde N-01 … N-23 → Status
| Nr | GEG-02 | Status | Fundstelle Runde 3 | Rest → Auflage |
|---|---|---|---|---|
| N-01 | hoch | **teilweise** | T1 build-vergleich gegen Live (PLAN:449); Bauregel 1 Einfrieren (:457); Bauregel 2 `@source not` (:458); `globals.css`-Ausschlüsse im Umzug (`umzug-bestand.py` Z. 66–67) | (a) Der Ruhe-Beweis ist für JS/CSS-Werte blind, siehe H-1 (A1). (b) Der Pfad `"../app/(kern)/_entwurf"` ist relativ zur festgelegten Lage `src/app/(kern)/kern-global.css` (KERN:45) falsch und zeigt auf `src/app/app/(kern)/_entwurf`; richtig wäre `"./_entwurf"` (A2). (c) `globals.css` schließt `src/lib/kern` nicht aus (A2). (d) Bauregel 1 widerspricht KERN K-004/K-005: Tokens liegen in `src/styles/kern.css`, Schriften in `src/app/fonts/kern.ts`, Bewegung in `src/lib/motion/` – alle außerhalb der erlaubten Ordner (A3). |
| N-02 | hoch | erledigt | `freischalten.sh` Z. 13–18 (sauberer Baum, HEAD = Basis), Z. 25–26 (`git mv`/`git rm`), Z. 51–68 (eigener Commit, `git archive` ↔ Kandidat, Exit 4/5); PLAN:454 (Live-Prüfung aller Routen, je Vorlage 2); `live-browser.mjs --routen` (Z. 12–14) | Vorschau und Kandidat teilen `reinraum-<sha>-k`. Nach Exit 5 bleibt der Commit lokal liegen, und kein Rückweg ist beschrieben. `git add -A -- <Ordner>` (Z. 52) ist überflüssig und weicht vom Wortlaut von G2 ab (A4). |
| N-03 | hoch | erledigt | Vorschau-Kandidat (PLAN:452), Vorschaubaum für unfertige Arbeit; E-015 berichtigt (ENTSCHEIDUNGEN:134 „nicht gebaut … gebaut und angesehen im Vorschau-Kandidaten“); `RELAUNCH_BASE` in `lib.mjs` Z. 10 | Gleicher Verzeichnis- und Servername wie beim Kandidaten (A4) |
| N-04 | mittel | erledigt (Plan) | P3-00o (PLAN:472) am Anfang des kritischen Pfads (:492), Belege ins Repo, Rückfall Weg 2 | NEBELKARTE:19 sagt weiter „erprobt (Status 404 …)“ (A7). P3-00o muss den `_entwurf`-Ausschluss an der echten Dateilage prüfen (A2). |
| N-05 | mittel | erledigt | Bauregel 3 (:459), P3-00l (:469) mit T2, Nachweis: build-vergleich + Funktionstests + Mutationsprobe | Die Ausnahme „(oder build-vergleich „gleich“)“ in Bauregel 1 würde spätere Hook-Änderungen ohne Test zulassen (H-1, A1c) |
| N-06 | mittel | teilweise | Bauregel 4 (:460): Pflichtinhalt vollständig, `metadaten.ts` ohne `_dokument`-Import, F-11 erweitert; P3-14c (:473) | Kein Vergleich des Kopfbereichs Bestand ↔ Kern (Geo-Meta, Verifizierung, Icons, `x-build`); die SEO-Invarianten decken nur Canonical, robots und JSON-LD ab (A5) |
| N-07 | mittel | erledigt | Bauregel 5 (:461); P3-15 mit `(kern)/not-found.tsx` (:473); F-17 je dynamischer Vorlage; W10-02 (:487); KERN:50 | – |
| N-08 | mittel | erledigt | Bauregel 6 (:462); `freischalten.sh` Z. 9–10, 23, 27, 42 | Verwaiste Bestands-Layouts bleiben bis W10-03 liegen (harmlos, der Kandidat-Build prüft) |
| N-09 | mittel | teilweise | E-017 (ENTSCHEIDUNGEN:145–150): T1/T2/T3, Freischalt-Schwelle getrennt vom Ziel; P3-16 = T2 + T3 mit Probeläufer, Fünf-Sekunden-Probe, Gegenprüfer (:473) | Die laut E-017 nach P4 vorgezogenen sechs Hauptseiten-Entwürfe stehen weder in der P4-Tabelle (:406–415) noch im Pfad (:492). „Jury ≥ Bestand + 2,0 je Seite“ ist nur auf Hauptseiten messbar, denn nur dort gibt es eine Jury-Basis (A6). |
| N-10 | mittel | erledigt | P5–P7-Tabelle mit „hängt ab“ und Kriterien (:475–489); -T/-P je Welle; F-01–F-19 lückenlos zugeordnet (P3-14a–d, W1, W2, W3, W4, W6, W9); P7: Probeläufer 15, Fünf-Sekunden-Probe, Jury 10 %, Slop-Jäger Grundmenge, Mutationsprobe je F | Spalte „Dateien“ fehlt; P3-00k–o haben kein Kriterium (Plantor: „jedes Paket dient einem Kriterium“) (A6) |
| N-11 | mittel | teilweise | Pfad korrigiert (:492), P3-14 geteilt (:473), Messfenster nur für Lighthouse und Framezeiten, Planwert 10–13 Tage (:493) | Paketsumme und Formel sind nicht neu gerechnet (Runde 2: 90; neu sind k–o, P3-14b–d, etwa 6 Varianten, etwa 14 -T/-P, 6 Hauptseiten-Entwürfe). Der erste T2 ist P3-00h, nicht P3-16. STATUS nennt keinen Puffer in Tagen. (A6) |
| N-12 | mittel | teilweise | KERN v1.2: K-004 (:45 Tokens nur im Kern-CSS, :46 Schriften am Kern-`<html>`, :50 404-Weg), K-005 (:56/:60 Latin einheitlich, Plex-Ersatz wie gebaut), K-009 (:114 Seitenwechsel optional nur im Kern); Aufträge P3-00a–j auf v1.2 | Neuer Widerspruch zu Bauregel 1 (siehe N-01 d). E-009 (ENTSCHEIDUNGEN:85) sagt weiter „P4: MotionProvider, Kartenhüllen“, obwohl der Bestand bis W10 eingefroren ist (A3). |
| N-13 | mittel | erledigt | Bauregel 9 (:465); P3-09, W1-01, W2-01 je 2 Varianten (:473, :478–479); Pfad „P3-09 (Varianten)“ | Die Mehrkosten fehlen in der Summe (A6) |
| N-14 | mittel | erledigt | P3-00k (:468) mit T2 und Test „ohne Haken kein Versand“; E-014 (ENTSCHEIDUNGEN:126) „im Bestand sofort“ | – |
| N-15 | mittel | erledigt | `live-browser.mjs` Z. 4–5, 15–16, 29: Warteschlange ≥ 1 s für alle Live-Abrufe, Antwortspeicher Z. 18/28/33; `live-rauchtest.sh` Z. 8–10 mit Pausen | – (G1 eingehalten) |
| N-16 | gering | teilweise | Kleinpunkte „L5 nach jedem Paket“ (:496); Nebelkarte Markenbruch (NEBELKARTE:20); E-011–E-013 angeglichen | PRUEFPUNKT:4 und STATUS:1 nennen „live 6d6a4c9“, tatsächlich ist origin/main = 50352ad. „Nächster Schritt: Plan Runde 3“ ist überholt. PLAN:289 „Vorschau-Status“ steht noch da. (A7) |
| N-17 | gering | erledigt | `testzahl.mjs` Z. 3–4, 19–25, 42–51 (Laufzeit je Spec × Projekt); Basis mit Laufzeit in `belege/testzahl-basis.json` | Der Plan nennt 289 Fälle, die Laufzeitbasis 292 Fälle mit 13 ausgelassenen (statisch 109/3/6). T1 enthält keinen Playwright-Lauf, die Laufzeit-Sperrklinke gehört deshalb zu T2. (A8) |
| N-18 | gering | erledigt | T2 „Fragment-Ziele“ (:450), Kleinpunkte (:496); `texte2.mjs` Z. 7, 241–253 (in Arbeit, noch nicht getrackt) | Abnahme des Werkzeugs steht aus |
| N-19 | gering | erledigt | P3-00m (:470), T2 „Klassen-Abdeckung Kern-CSS“ (:450) | – |
| N-20 | gering | erledigt | Bauregel 7 (:463), T1-grep (:449) | – |
| N-21 | gering | erledigt | T2 für jedes sofort wirksame Paket, Volltest 120 × 4 außerhalb der Kern-Ordner (:450) | – |
| N-22 | gering | erledigt | Bauregel 8 (:464), „P3-08 mit Bauregel 8“ (:473) | – |
| N-23 | gering | teilweise | `seitenart` → P3-00n; M-06 nicht blockierend; gemeinsame Dateien ergänzt; W10-04 Rückroll; V-01 in W3 (PLAN:294) | `commit.sh` Z. 4/13: `PAKET=` weiter optional, obwohl der Plan es zur Pflicht macht. R1-Befund 23 („gescheitertes Paket vor dem Push zurücknehmen“) weiter offen. `pixel.mjs` Z. 21 „eigene Welle (P4)“. (A4, A8) |

Bilanz: 16 erledigt, 7 teilweise, 0 offen. Die drei „hoch“ der Runde 2: N-02 und N-03 sind erledigt, N-01 ist teilweise erledigt, der Rest wird zu H-1.

## B) Neuer Befund (hoch)

**H-1 · T1 hält Änderungen an JS, Inline-Skripten und CSS-Werten für „ruhend“, ohne sie zu prüfen.**
- **Beleg, Werkzeug:** `build-vergleich.mjs` normalisiert bei T1 so, dass mehreres verloren geht:
  - Z. 14 entfernt alle `<script>` außer JSON-LD, also auch das Kopfskript `KOPF_SKRIPT` und die RSC-Nutzlast.
  - Z. 15 ersetzt jeden Pfad `/_next/static/…` durch `X`; geänderte JS- oder CSS-Chunks fallen damit nicht auf.
  - Z. 37–39 vergleichen beim CSS nur die Menge der Selektoren, Variablennamen und Keyframe-Namen. Deklarationen und Werte werden nicht verglichen.
- **Beleg, Plan:**
  - PLAN:449 lautet „gleich ⇒ ruhend bestätigt ⇒ Push“.
  - Bauregel 1 (PLAN:457) lässt Ausnahmen außerhalb des Kerns „mit T2 (oder build-vergleich „gleich“)“ zu.
  - Das alte Push-Tor mit betroffenen Tests und axe ist ersetzt (PLAN:446). Auf eine T1-Welle folgen deshalb weder Funktionstests noch Pixel noch axe.
- **Folge 1 (Live-Schaden auf `/` ab P3-16):** P4, P5 und P6 ändern Dateien, die die live geschaltete `/` nutzt. Gemeint sind `src/components/kern/**`, `src/lib/motion/**` und `src/styles/kern.css` (Bauregel 1 hält sie bewusst offen). Zwei Fälle laufen ungeprüft live:
  - Eine reine JS-Änderung, etwa am Mobilmenü, an der Banner-Logik oder an `BewegungsRegie`, deren Beobachter den Startzustand `opacity: 0` aufhebt (`kern.css` Z. 124–126).
  - Eine Wertänderung, etwa an einem Farb-Token mit Kontrastfolgen oder an einer Dauer.

  Der Live-Rauchtest prüft nur Status, Konsole und CSP, nicht die Sichtbarkeit. Nicht erkannt würden also zum Beispiel unsichtbare Inhalte, ein Kontrastverlust unter AA (Z-11 „ohne Verlust“) oder ein Menü, das nicht mehr öffnet.
- **Folge 2 (G9/UNANTASTBAR):** Nach P3-00l liegt die Geschäftslogik aller Formulare in `src/lib/formulare/use*.ts`. Eine spätere Änderung dort zeigt „build-vergleich gleich“ und wäre nach Bauregel 1 ohne Test zulässig. G9 verlangt „mit Test“.
- **Vorschlag (Auflage 1):**
  1. Einstufung über die Dateiliste statt über die Build-Ausgabe (N-01 d): `git diff --name-only <Live>..HEAD`. „Ruhend“ ist eine Welle nur, wenn alle Pfade unter `src/app/(kern)/_entwurf/**` oder `_relaunch/**` liegen. Vor der ersten Kern-Freischaltung zählen zusätzlich die Kern-Ordner als ruhend, wenn build-vergleich gleich ist. Jeder andere Pfad heißt T2 für die Seiten seiner Importhülle: Kern-Pfade für alle live Kern-Seiten, übrige mit Volltest.
  2. build-vergleich erweitern:
     - CSS als vollständige, normalisierte Regeln (Selektor und Deklarationen),
     - Inline-Skripte ohne RSC wörtlich,
     - je HTML die geladenen JS- und CSS-Dateien mit Inhalts-Hash, die Build-ID normalisiert,
     - die RSC-Nutzlast normalisiert.

     So belegt auch T2 die nicht betroffenen Seiten deterministisch, ergänzend zur Pixel-Stichprobe.
  3. In Bauregel 1 „(oder build-vergleich „gleich“)“ streichen.
  4. Klarstellen, dass T1–T3 nur Schritt 3–4 des alten Push-Tors ersetzen und die Schritte 1, 2, 5, 7 und 8 weiter gelten (unverfolgte Dateien, Commit je Paket, fetch/merge, Live-Rauchtest, Revert). Nach jedem Push, auch nach T1, läuft `live-browser.mjs --routen <alle live Kern-Routen>` und prüft zusätzlich, dass die H1 und alle `[data-motion]`-Elemente nach Durchscrollen die Deckkraft 1 haben. Das ist lesend und G7-neutral.

Weitere Befunde „hoch“ gibt es nicht. UNANTASTBAR, G1, G3–G8 sind im Plan und in den Werkzeugen eingehalten. Bei G2 nimmt `freischalten.sh` Z. 52 per `git add -A` ganze Ordner auf. Wegen der Vorbedingung „sauberer Baum“ (Z. 18) und des Baumvergleichs (Z. 63–68) ist das ohne Wirkung; es wird nur zur wörtlichen Angleichung bereinigt (A4). Jedes Z-Kriterium hat Pakete und Werkzeug. Kein Kriterium ist unbelegbar.

## C) Urteil und Auflagen
**L0 bestanden mit Auflagen.** Die Auflagen werden in den genannten Paketen erledigt. Eine neue Plan-Runde gibt es nicht.

1. **H-1 → P3-00p (neu, Orchestrator, Werkzeug + PLAN-Text), fällig vor dem ersten Push nur mit T1, der `src/` berührt (also vor P3-01):** Einstufung über die Dateiliste, build-vergleich erweitert, Ausnahme in Bauregel 1 streichen, Push-Tor-Schritte 1, 2, 5, 7, 8 bestätigen, Live-Browser über alle live Kern-Routen mit Sichtbarkeitsprüfung.
2. **N-01 b/c → P3-00o und P3-00h:**
   - P3-00o prüft an der echten Lage von `kern-global.css`, dass eine Klasse, die nur im Entwurf vorkommt, nicht im Kern-CSS landet.
   - Bauregel 2 bekommt den korrekten relativen Pfad (bei `src/app/(kern)/kern-global.css`: `"./_entwurf"`).
   - Der Umzug ergänzt in `globals.css` `@source not` für `../lib/kern` (und `../lib/motion`, falls dort Klassen stehen).
3. **N-01 d / N-12 → Orchestrator (PLAN + ENTSCHEIDUNGEN), vor P3-01:**
   - Bauregel 1 um `src/styles/kern.css`, die Kern-Dateien in `src/app/fonts/`, `src/lib/motion/` und den Ort des Sprites erweitern, oder die Dateien in die Kern-Ordner verlegen.
   - E-009 an E-015 angleichen: Der Bestand behält MotionProvider bis W10-03.
4. **N-02/N-03, R1-23 → P3-00p (Werkzeug):**
   - Der Vorschau-Kandidat bekommt ein eigenes Suffix (`-v`, Port 4320).
   - Die Kandidat-Kopie bekommt eine Stempeldatei mit Basis und Routenliste. `freischalten.sh --commit` und die T2-Belege prüfen diesen Stempel.
   - Den Rückweg bei Exit 4/5 festschreiben: eigenen Freischalt-Commit vor jedem Push zurücknehmen; dazu die allgemeine Regel „gescheitertes Paket vor dem Push zurücknehmen“.
   - Z. 52 `git add -A -- <Ordner>` entfernen.
5. **N-06 → P3-14c / T2:** Kopfvergleich Bestand ↔ Kern über alle `<head>`-Meta- und Link-Einträge außer Titel, Beschreibung und Canonical, bei jeder Freischaltung.
6. **N-09/N-10/N-11/N-13 → Orchestrator (PLAN, Plantor), vor P4:**
   - Die sechs Hauptseiten-Entwürfe aus E-017 (W1-01, W2-01, W3-01, W6-01, W8-01, W9-01, zwei davon mit Varianten) mit „hängt ab“ und Kriterium in die P4-Tabelle und in den Pfad aufnehmen.
   - Kriterien für P3-00k–o ergänzen; P5 bekommt eine Spalte „Dateien“.
   - Paketsumme und Formel neu rechnen; den ersten T2 (P3-00h) messen und den Planwert danach festschreiben; Puffer in Tagen in STATUS.
   - Freischalt-Schwelle präzisieren: „Jury ≥ Bestand + 2,0 je betroffener Hauptseite“.
7. **N-16/N-04 → Orchestrator (L5), sofort:**
   - PRUEFPUNKT und STATUS auf live 50352ad und den nächsten Schritt nach L0 stellen.
   - NEBELKARTE:19 „erprobt“ ersetzen durch „Erprobung 2 offen (P3-00o)“.
   - PLAN:289 „Vorschau-Status“ als ersetzt markieren.
8. **N-17/N-23 → P3-00p (Kleinpunkte):**
   - Die Testzahl im Plan an die Basis angleichen: 292 Fälle im Lauf, davon 13 ausgelassen; statisch 109 Fälle, 3 fixme, 6 skip.
   - Die Laufzeit-Sperrklinke in T2 statt T1 führen.
   - `commit.sh` erzwingt `PAKET=`, außer mit einem ausdrücklichen Orchestrator-Schalter.
   - Kommentar in `pixel.mjs` Z. 21 berichtigen.
9. **Hinweis aus dem Quellcode → P3-02 und P3-00a (kein Plan-Befund):** K-009 (KERN:115) verlangt „nach 2 s `k-bereit` … zeigt alles“. `kopfskript.ts` entfernt `k-bewegung` aber nur, wenn das Modul fehlt. Fehlt ein IO-Treffer, bleibt der Inhalt bei `opacity: 0`, zum Beispiel bei einem Element, das höher ist als Viewport ÷ 0,2. Die Fotos laufen mit reduzierter Bewegung und sehen das nicht. Vorschlag:
   - Code und KERN angleichen.
   - P3-00a prüft mit erlaubter Bewegung „nach Durchscrollen ist alles mit Deckkraft 1 sichtbar“.

## OFFENE FRAGEN
- Ist die Turbopack-Ausgabe bei gleichem Quelltext Byte für Byte gleich? Davon hängt ab, ob ein Inhalts-Hash je Chunk (A1, Punkt 2) ohne Rauschen funktioniert. Andernfalls trägt die Einstufung über die Dateiliste (Punkt 1) allein.
- Ändert `next build` im Reinraum getrackte Dateien, etwa `tsconfig.json`? Dann würde der Baumvergleich in `freischalten.sh` immer rot. Das schadet nicht, der erste Lauf zeigt es.

## RISIKEN DIESER PRÜFUNG
- Wie Tailwind `@source`-Pfade auflöst (relativ zur CSS-Datei), habe ich aus der Konvention und aus `globals.css` (`"../../_relaunch"`) abgeleitet, nicht gebaut.
- Die Lücke in H-1 habe ich aus dem Code von `build-vergleich.mjs` gelesen, nicht vorgeführt.
- `texte2.mjs` und die drei geänderten Werkzeuge sind laufende Arbeit anderer Pakete; ich habe sie nur auf die Fragment-Prüfung angesehen.

=== ENDE P2-GEG-03 · BEREIT ZUR RÜCKGABE ===
