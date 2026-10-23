# E2-AUF-01 · Baumeister · Stufe 2 · E-014

**STATUS: NICHT ABGESCHLOSSEN.** Die Löschung wurde von der Berechtigungsprüfung abgelehnt. Das Repo ist unverändert.

## GEÄNDERTE DATEIEN
Keine im Repo. Geschrieben wurde nur diese Rückgabe. Keine Commits, keine Server-Starts, kein Build. Scratch: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-AUF-01/` (Sicherung `loeschung-sicherung/` mit den 13 Dateien, Prüfläufe, Bilder).

## WAS UND WARUM
Nutzungssuche am Arbeitsbaum (nicht nur HEAD) je Datei: Pfad mit und ohne Endung sowie relativ, Basisname im ganzen Repo (ohne `.env*`), Default- und Named-Exporte, dynamische Importe (auch mit Variable), Re-Exporte (Barrels `src/lib/email/index.ts`, `src/utils/index.js` ohne Treffer). Nutzung = Import, dynamischer Import, JSX oder Re-Export. Kommentare und Namensteile zählen nicht (Frage 4).

| Datei | Nutzungen |
|---|---|
| components/CookieConsent.tsx | 0 (aktiv: `common/CookieConsent`) |
| common/GoogleMap.tsx | 0 |
| common/WaterCursor.tsx | 0 (ClientWidgets lädt `ui/WaterCursor`, andere Datei) |
| common/WhatsAppButton.tsx | 0 |
| layout/FloatingDock.tsx | 0 (zwei Kommentare, Frage 3) |
| maps/ContactMapWrapper.tsx | 0 |
| sections/home/ContactSection.tsx | 0 |
| trust/TrustBadges.tsx | 0 |
| trust/TrustSignals.tsx | 0 |
| ui/AnimatedNumber.tsx | 0 |
| ui/OptimizedImage.tsx | 0 |
| ui/RotatingText.tsx | 0 |
| ui/TiltCard.tsx | 0 |

Alle 13 sind nach E-014 löschbar. `test-zuordnung.json` wählt nur Tests aus. Nach der Löschung ist `src/components/sections/home/` leer, `trust/` bleibt (TrustStrip.tsx). Folgen zweiter Ordnung: keine; ContactPremiumMap, HeroContactForm und GoogleIcon bleiben anderswo genutzt.

Die Löschung (`rm`, `rmdir`) hat die Berechtigungsprüfung abgelehnt („Irreversible Local Destruction“). Ich habe nichts gelöscht und keine Umgehung versucht. Zwei Shell-Lesebefehle wurden ebenfalls abgelehnt; gelesen habe ich mit Read, Grep und Glob.

## GEMEINSAME DATEIEN
Keine Änderung nötig.

## PRÜFUNG UND ERGEBNIS
Vorlauf, alle 13 Dateien noch vorhanden:
- `tsc` mit `--tsBuildInfoFile` im Scratch (tsconfig `incremental` würde sonst `tsconfig.tsbuildinfo` im Repo schreiben): 0 Fehler, Exit 0.
- `eslint src/components`: 85 Dateien, 0 Fehler, 0 Warnungen.
- `curl` GET `/` 200, `/kontakt` 200.
- `pruefe-a.sh E2-AUF-01 -- / /kontakt`: Gesamt ROT (Exit 1). tsc, eslint, Bilder GRÜN; Texte ÜBERSPRUNGEN (Basis `_werkstatt/belege/e0` fehlt). Funktionstest ROT (32 erwartet, 1 unerwartet): `funktion-einwilligung`, desktop, „Widerruf … Schild“, Timeout. Der Klick auf den Cookie-Schild wird vom Next-Dev-Overlay (`nextjs-portal`) abgefangen. Das Dev-Log zeigt zeitgleich `⨯ ./src/components/icons/sprite.svg` (fremde Icon-Arbeit). Ob das den Test allein auslöst, ist nicht bestätigt.
- Nach der Löschung nicht geprüft.

## BILDBELEGE
`/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-AUF-01/bilder/{start,kontakt}/{m390,d1440}.jpg`. Sichtprüfung `start/d1440.jpg`: Startseite normal, kein Overlay im Bild. Vorlauf-Kennzahlen, nicht durch dieses Paket (Ursache ungeprüft): `/` Konsole 4, Überlauf 3, Überlappung 89; `/kontakt` Konsole 4, Überlauf 3, Überlappung 40.

## OFFENE FRAGEN
1. **Freigabe für die Löschung nötig:** `rm -- src/components/CookieConsent.tsx src/components/common/GoogleMap.tsx src/components/common/WaterCursor.tsx src/components/common/WhatsAppButton.tsx src/components/layout/FloatingDock.tsx src/components/maps/ContactMapWrapper.tsx src/components/sections/home/ContactSection.tsx src/components/trust/TrustBadges.tsx src/components/trust/TrustSignals.tsx src/components/ui/AnimatedNumber.tsx src/components/ui/OptimizedImage.tsx src/components/ui/RotatingText.tsx src/components/ui/TiltCard.tsx` und `rmdir src/components/sections/home`. Rückgängig machbar: alle 13 sind in HEAD unverändert. Commit-Vermerk: E-014, Wahl (3).
2. **Nach Freigabe nachprüfen:** tsc und eslint gegen den Vorlauf, `curl` auf `/` und `/kontakt`, `pruefe-a.sh E2-AUF-01 src/components/layout/ClientWidgets.tsx -- / /kontakt` (alle Funktionstests, prüft die Namensgleichheit). Vorher den Dev-Fehler am `sprite.svg` beheben (Icon-Paket), dann den Einwilligungstest wiederholen.
3. **Veraltete Kommentare in fremden Dateien:** `src/components/common/CookieConsent.tsx:33` und `src/components/common/FloatingWhatsAppWidget.tsx:88` nennen FloatingDock. Bitte dem Eigentümer melden.
4. Bitte bestätigen, dass Kommentare und Namensteile nicht als Nutzung gelten.
