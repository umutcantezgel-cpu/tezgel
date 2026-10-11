# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P4 (Fundament, ruhend) · P3 abgeschlossen
- Live auf main: 8b4f9cd (P4-07 Wege, P4-04 Sprite, P4-05a/b/c/d Hooks + Kalender-Fix, P4-09 Zuklappen, Fuß-Sockel; ruhend P4-01/02/03/10a/10b). Server: 4334 = 35c0883, 4335 = 4bd371f (≈ Live-Produkt), 4320 = Vorschau a361e9c-v (veraltet).
- Tests: `KERN_SEITEN = ['/']` in `tests/fixtures.mjs` entspricht jetzt dem Live-Stand; Läufe gegen 4310/4323 mit `RELAUNCH_FASSUNG=bestand`.
- Laufend (Stand 09:55 UTC): Nutzungslimit traf um 09:48 UTC alle Unteragenten. P4-08d (/blog + Hook) und P4-08e (/ueber-uns) fertig und lokal committet (fd11be7, e22b027); P4-08a/b/c mit Teildateien fortgesetzt (gleicher Agent, Kontext erhalten); P4-08f (/kontakt) und Gegenprüfer P4-08d noch zu starten. Bestandsänderung /blog (useBlogListe) nicht gepusht: erst Gegenprüfer + T2.
- Nächster exakter Schritt: Je Rückgabe prüfen und committen (ruhend; P4-08d mit Gegenprüfer + T2). Sobald ein Platz frei ist: P4-08f /kontakt, danach P4-06 (Briefing liegt). SIG-2-Regel aus P4-08a in `kern.css` eintragen. Dann Vorschau-Kandidat `VORSCHAU="bad leistungen standorte blog ueber-uns kontakt"`: texte2, SEO-Invarianten, axe, a11y-zusatz, Wortbruch, Überlauf, Fotos → P4-Tor (T3: Z-05, Z-11, Z-13 + Probeläufer, Fünf-Sekunden, Gegenprüfer, Mutationsprobe). Offen aus P4-10a: Einstieg der Fachseiten mit Plan ohne Rot (K-003).
- Offene Abweichungen: ABNAHME „Offene Abweichungen“ (Z-04 Tastatur, Z-12 TBT).
