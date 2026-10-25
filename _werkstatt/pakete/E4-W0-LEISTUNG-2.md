# E4-W0-LEISTUNG-2 · Versuchsreihe zum simulierten LCP (mobil)

Auftraggeber im Lauf: Orchestrator. Ausführung: ein Versuchsleiter, danach ein zweiter Prüfer, der den besten Stand nachmisst. Ergebnis ist eine gemessene Wirkung je Änderung, keine Änderung am Repository. Umgesetzt wird erst danach vom Orchestrator.

## Ausgang (E-061)
- Stand `5ef34982`, Reinraum `$SCRATCH/reinraum-5ef34982` (vollständig gebaut, mit `node_modules`). `$SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Lighthouse mobil, Median aus 3: `/bad` LCP 3.464 ms (Bild), `/bad/badsanierung` 2.862 ms (Bild), `/fliesen` rund 3.4 s (Text), `/standorte/wetzlar` rund 4.5 s (LCP-Element ist der Text des Einwilligungsbanners). Budget 2.500 ms.
- Im Browser malt das LCP-Element nach 0,19 bis 0,25 s. Die Simulation rechnet die vor dem LCP angeforderten Dateien mit: Dokument 36 bis 57 KB komprimiert (RSC-Daten 108 bis 186 KB roh), Schrift `archivo_variabel…woff2` 59 KB (vorgeladen, hohe Priorität), CSS 21,6 KB (blockierend), rund 15 Skripte mit zusammen rund 225 KB (davon Next-Laufzeit `3nex4q29u71w8.js` 44 KB und React DOM `075_81sg-x3zl.js` 72 KB; App-Code u. a. `0bs2finwcac7f.js` Seitenwechsel B-01, Intro, Analyse; `1-5grn2xc2q9p.js` Einwilligung; `0itv1-u6qedx3.js` Karussell; `3zdo8nxdsm6rl.js` WhatsApp). Dazu Hauptthread-Zeit des Dokuments 1,0 bis 1,4 s (vierfach gerechnet).
- Frühere Messungen: E-034 (ohne alle Skripte etwa 2,5 s), E-041 (Spur, spät zeichnende Abschnitte).

## Regeln
- Nur in Kopien unter `$SCRATCH/e4-leist-2/` arbeiten: `cp -a $SCRATCH/reinraum-5ef34982 $SCRATCH/e4-leist-2/v<N>` (oder eine Kopie wiederverwenden und zwischen Versuchen auf den Ausgang zurücksetzen). Im Repository `/home/user/tezgel` nichts ändern, nichts committen; kein Git-Befehl, der schreibt.
- Bauen in der Kopie mit `npx next build` (Umgebung wie im Reinraum; Logs in den Versuchsordner). Starten nur auf Port 4313: `cd <kopie> && setsid nohup npx next start -H 127.0.0.1 -p 4313 > <log> 2>&1 &`, eigene PID merken und nach dem Versuch nur diese Prozessgruppe beenden. Die Server 4311 und 4320 nicht anfassen, `server.sh stop` nicht benutzen (es beendet alle Reinraum-Server).
- Vor jeder Messreihe den eigenen Server neu starten und die Bildprobe machen (E-034): `curl -s -o /dev/null -m 15 -w '%{http_code} %{time_total}\n' -H 'Accept: image/avif,image/webp,*/*' 'http://127.0.0.1:4313/_next/image?url=%2Fimages%2Flogo%2Ftezgel-logo.webp&w=256&q=75'`.
- Messen mit `CHROME_PATH=/opt/pw-browsers/chromium… node /home/user/tezgel/_werkstatt/werkzeuge/lighthouse.mjs --satz e4l2-v<N> --seiten /bad,/bad/badsanierung,/fliesen,/standorte/wetzlar --laeufe 3 --formen mobil --base http://127.0.0.1:4313` mit `RELAUNCH_BELEGE=$SCRATCH/e4-leist-2/lh`. Während einer Messreihe läuft nichts anderes (kein Build, kein zweiter Browser, keine Tests). Benchmark-Abweichung melden.
- Unantastbar (G8): Verhalten der Cookie-Einwilligung (wann und wie der Banner erscheint, Texte, Knöpfe, Speicherung), Logo, Firmendaten, Formulare. Ein Versuch, der das Verhalten ändern würde, wird nur gemessen und als „ändert Verhalten“ markiert.
- Keine neuen Abhängigkeiten im Repository. Für eine Schrift-Teilmenge nur Werkzeuge, die schon da sind (prüfe `_werkstatt/werkzeuge/glyphen.mjs`, `_werkstatt/werkzeuge/node_modules`, Python-Module); fehlt etwas, den Versuch auslassen und begründen.

## Versuche (je einzeln gegen V0, dann die Kombination)
- **V0 Basis:** Kopie von 5ef34982 unverändert bauen und messen (Vergleichswert derselben Sitzung).
- **V1 CSS im Dokument:** `next.config.ts` `experimental.inlineCss: true` (Next-16-Doku `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/inlineCss.md`).
- **V2 Schrift:** Teilmenge der Archivo-Variable auf die verwendeten Zeichen (Deutsch, Ziffern, Satzzeichen, €, ², ×, Pfeile im Text), Achsen behalten; oder ohne Vorladen, falls Teilmenge nicht möglich. Größe vorher und nachher.
- **V3 LCP-Bild ohne Platzhalter:** `Bildfeld` mit `lcp` ohne unscharfen Platzhalter (`placeholder="empty"`).
- **V4 Skripte nach dem LCP:** Inseln, die für den ersten Bildschirm nicht gebraucht werden, später laden (z. B. Seitenwechsel B-01 erst bei der ersten Zeige- oder Tipp-Bewegung, WhatsApp-Baustein, Karussell unterhalb). Die Einwilligung nur messen und als „ändert Verhalten“ markieren, falls ihr Erscheinen sich verschiebt. Für jede verschobene Insel angeben, was sich für Nutzer ändert.
- **V5 Kleineres Dokument:** größte Posten im HTML und in den RSC-Daten der vier Seiten bestimmen (z. B. Inline-SVG der Momente, lange Klassenketten, doppelte Listen) und eine Änderung messen, die den größten Posten verkleinert, ohne die Darstellung zu ändern.
- **V6 Kombination** der Versuche mit Wirkung (ohne „ändert Verhalten“).

## Rückgabe (Schema des Workflows)
Je Versuch: Änderung (Dateien, Diff kurz), Build ok, Messwerte je Seite (LCP-Median und Spanne, Leistung, TBT, LCP-Element, beobachteter LCP), Abstand zu V0, Nebenwirkungen (Darstellung, Verhalten, Größe), Pfade der Rohberichte. Am Ende die empfohlene Kombination mit dem Diff gegen 5ef34982 als Datei `$SCRATCH/e4-leist-2/empfehlung.diff`.
