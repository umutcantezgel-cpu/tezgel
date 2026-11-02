# P7 Entität und Offpage: Liste für Umut

Stand 01.11.2026. Grundlage: `docs/seo/KONTEXT.md` Abschnitt 5 (N01 bis N06) und Abschnitt 6 (Google-Unternehmensprofil), Faktenblatt `_werkstatt/KERN.md` Anhang F. Die SEO-Runde kontaktiert niemanden und ändert keine Einträge; alles hier erledigen Umut oder Deniz selbst. Wo ich nachher etwas im Code eintrage, steht es dabei.

**Einheitliche Angaben (NAP)**, überall genau so:

- Name: Fliesenverlegung Tezgel (F-01)
- Anschrift: Hohwardstraße 14, 35614 Aßlar (F-03)
- Telefon: 06441 / 44 83 567; Mobil und WhatsApp 0172 / 67 28 504 (F-04)
- E-Mail: info@tezgel.de (F-04)
- Website: https://www.tezgel.de/

## 1. Google-Unternehmensprofil (N03, T05)

1. **Zugang klären:** Wer verwaltet das Profil? Ohne Zugang lässt sich nichts prüfen.
2. **Link an mich (T05):** im Profil auf „Teilen“, den Link kopieren und hier in den Chat schicken. Stand 02.11.2026: eingetragen (Link von Umut, `src/config/google-profil.ts`; KONTEXT.md Abschnitt 13, Zeile „Google-Profil verknüpft“). Ich trage ihn in die strukturierten Daten ein (`sameAs`, `hasMap`) und setze „Alle Bewertungen lesen“ auf das Profil statt auf eine Google-Suche. Den Link suche ich nie selbst, weil es einen zweiten Betrieb „Özcan Tezgel“ gibt.
3. **Name** genau „Fliesenverlegung Tezgel“, ohne Zusätze wie Orte oder Leistungen (Google erlaubt nur den echten Namen).
4. **Kategorie:** Hauptkategorie „Fliesenleger“, dazu nur Kategorien aus Googles Liste, die der Betrieb wirklich anbietet.
5. **Adresse oder Einzugsgebiet:** Empfängt der Betrieb an der Hohwardstraße 14 Kunden mit Personal zu festen Zeiten?
   - Ja: Adresse zeigen und Einzugsgebiet ergänzen.
   - Nein: Adresse im Profil ausblenden und nur das Einzugsgebiet pflegen (bis 20 Gebiete, darunter Aßlar und Wetzlar). Das Impressum bleibt, wie es ist.
6. **Website-Link:** https://www.tezgel.de/ (passt zu S2 Variante 1: Profil, Startseite und Aßlar zeigen auf dieselbe Seite).
7. **Telefon:** 06441 / 44 83 567 als Hauptnummer.
8. **Öffnungszeiten** wie auf der Website, sobald Deniz sie bestätigt hat (M-03; heute widersprechen sich Website und strukturierte Daten am Freitag, T07).
9. **Leistungen:** Badsanierung, Dusche ohne Stufe, barrierefreies Bad, große Fliesen, Wohnräume, Küche, Neubau, Treppen, Balkon und Terrasse, Untergrund und Abdichtung, Naturstein, Fliesenreparatur, Schadensanalyse (F-08).
10. **Beschreibung** (Vorschlag, 592 von höchstens 750 Zeichen, nur Fakten aus dem Faktenblatt):

    > Fliesenverlegung Tezgel ist ein eingetragener Fachbetrieb für Fliesen-, Platten- und Mosaikarbeiten in Aßlar, gegründet 2008 und bei der Handwerkskammer Wiesbaden eingetragen. Inhaber Deniz Tezgel betreut Ihr Vorhaben persönlich, von der ersten Skizze bis zur Abnahme. Wir sanieren Bäder, bauen Duschen ohne Stufe und barrierefreie Bäder, verlegen große Fliesen und Naturstein in Wohnräumen, Küchen und im Neubau und fliesen Treppen, Balkone und Terrassen. Der Termin bei Ihnen vor Ort ist kostenfrei, danach bekommen Sie ein Festpreisangebot. Wir arbeiten in Aßlar, Wetzlar und Mittelhessen.

11. **Fotos:** die neuen Fotos aus P5, sobald sie ausgewählt sind; keine Fotos mit erkennbaren Personen, Kennzeichen oder Hausnummern.
12. **Bewertungen (N06):** jeden Kunden nach Abschluss um eine Bewertung bitten, mit dem Kurzlink aus dem Profil („Rezensionen erhalten“). Ohne Gegenleistung und ohne Vorauswahl, also alle Kunden fragen. Jede Bewertung beantworten, auch kurz.

## 2. Verzeichnisse (N02)

| Verzeichnis | Befund (KONTEXT.md N02) | Was zu tun ist |
|---|---|---|
| Gelbe Seiten | Hauptnummer 06441 5643776, dazu 06441 2047127; die 06441 4483567 fehlt | auf die Angaben oben bringen |
| 11880 | Eintrag nur mit Mobilnummer, dazu ein Doppel „Ismail Deniz Tezgel“ | Angaben oben eintragen, Doppel zusammenführen oder löschen lassen |
| Instagram (`fliesenverlegung_tezgel`, F-24) | Titel „Deniz Ismail Tezgel“ | Name „Fliesenverlegung Tezgel“, Website-Link https://www.tezgel.de/ |
| weitere | nicht geprüft | Das Örtliche, Das Telefonbuch, Apple Maps (Apple Business Connect), Bing Places, Verzeichnis der Handwerkskammer Wiesbaden: prüfen, ob ein Eintrag besteht, und dann auf die Angaben oben bringen |

## 3. fliesen-asslar.de (N01, S8)

Die zweite Tezgel-Website (Anbieter laut Impressum STARK Deutschland GmbH) hat dieselben Angaben, ein eigenes LocalBusiness und keinen Link auf tezgel.de. Mit STARK klären:

- **Empfehlung:** 301 von fliesen-asslar.de auf https://www.tezgel.de/. Dann zählt alles, was auf die alte Adresse verweist, für tezgel.de.
- Geht das nicht: ein deutlicher Link auf https://www.tezgel.de/ auf jeder Seite.
- Dazu prüfen, welche Website im Google-Profil steht (Punkt 1.6).

## 4. Bewertungszahlen auf der Website (N05)

Auf `/referenzen` steht für Trustlocal 9,6 von 10 bei 25 Bewertungen; Trustlocal zeigt laut Analyse 8,8 bei 27. Bewertungszahlen ändere ich nur mit Freigabe: Bitte die aktuellen Zahlen von Google und Trustlocal mit Datum nennen, dann ziehe ich `src/config/reviews.js` nach.

## 5. Lokale Erwähnungen (N06)

Laut Google zählen Websites, die auf ein Unternehmen verweisen, zur Bekanntheit im lokalen Ergebnis. Möglichkeiten ohne gekaufte Links:

- Verzeichnis der Handwerkskammer Wiesbaden und, falls Mitglied, der Innung.
- Lieferanten und Händler, bei denen der Betrieb einkauft (Händlerverzeichnisse, Referenzseiten). Einen Partnerstatus nennt die Website erst, wenn er belegt ist (Faktenblatt: „Partnerstatus der Marken“ nicht verwenden).
- Vereine, die der Betrieb unterstützt, und die Lokalpresse bei einem passenden Anlass.

## 6. Zugänge für P8 (Messen)

- **Google Search Console:** Property für https://www.tezgel.de/ (oder die Domain). Bestätigung per DNS beim Domainanbieter, oder ich lege nach Freigabe eine Bestätigungsdatei oder einen Meta-Tag an. Danach Umut als Inhaber, mich braucht es dort nicht.
- **Bing Webmaster Tools:** kann die Search Console übernehmen.
- Sind `NEXT_PUBLIC_GA4_ID` und `NEXT_PUBLIC_META_PIXEL_ID` in Vercel gesetzt? Ich prüfe nur, ob die Namen vorhanden sind, nie die Werte.

## 7. Repository (N04, S7)

Das öffentliche GitHub-Repository erscheint bei der Markensuche (Nicht-Google-Index) vor tezgel.de. Vor einem Wechsel auf privat die Verbindung zu Vercel prüfen. Achtung: Die Originalfotos liegen auf Anweisung bewusst im Repo; auf privat stellen ändert daran nichts.
