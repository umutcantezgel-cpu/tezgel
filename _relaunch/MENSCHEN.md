# MENSCHEN · Was nur ein Mensch klären kann

Je Punkt: Beleg · betroffenes Kriterium · Standardannahme (gilt bis zur Antwort).
Vertrauliche Details (Sicherheit, Recht) stehen bewusst nicht in diesem öffentlichen Repo; sie gehen dir per Chat und Morgenbericht zu (Kennungen I-xx).

## Offen
- M-01 · Rechtliche Prüfung: Datenschutzerklärung, Einwilligung, Formulierungen mit Rechtsbezug (Details I-03, I-05, I-06). Kriterium: Leitplanke Recht. Annahme: Texte unverändert.
- M-02 · Bildmaterial: echte Baustellen-/Projektfotos und Teamfotos werden benötigt (Details I-01, I-02). Kriterium: S-14, Leitplanke Bilder. Annahme: Gestaltung trägt über Typografie und SVG-Formsystem; vorhandene Bilder bleiben mit ehrlichen Alt-Texten.
- M-03 · Inhalte mit Zeitbezug prüfen (Öffnungszeiten, Bewertungszahlen, Erfahrungsjahre, Förderbeträge, Stellenangebote) – Details I-07. Annahme: als „möglicherweise veraltet“ gelistet.
- M-04 · Server-Einstellungen bei Vercel (Details I-09, I-11). Annahme: unverändert.
- M-05 · Geschäftslogik-Fehler mit Patch-Vorschlag (Details I-12). Annahme: unverändert (G9).
- M-06 · Geräteprobe: iPhone mit Safari, Android mit Chrome, Desktop mit Firefox und Safari – WebKit/Firefox sind in der Arbeitsumgebung nicht installierbar. Kriterium: Z-11, Z-13, A-10.
- M-07 · Geschmacksabnahme der gewählten Richtung und der Signaturmomente (Lauf 1 vollautonom; Abnahme nachträglich).
- M-08 · URLs der Original-tezgel.de vor dem Relaunch (Wayback Machine aus der Arbeitsumgebung gesperrt): Export „Seiten“ aus der Google Search Console, damit alte URLs weitergeleitet werden können. Kriterium: Z-06.
- M-09 · Lizenzen: Logo-Figur (I-08). Schriften: Archivo und IBM Plex Mono stehen unter der SIL Open Font License (frei nutzbar, Vermerk in `src/app/fonts/LIZENZEN.md`); eine Kaufschrift ist nicht nötig. Favicon bleibt unverändert; ein Favicon im Formsystem ist nur ein Vorschlag.
- M-10 · Node-Version: `npm test` braucht Node ≥ 22.6; `.nvmrc` sagt 20 (E-004). Annahme: unverändert.
- M-11 · Vercel: Das Repo ist mit zwei Vercel-Projekten verbunden (`uus-projects-dd41487b/tezgel`, `codays-projects/tezgel`); beide bauen jeden Push. Live (www.tezgel.de) ist `codays-projects`. Prüfen, ob das zweite Projekt gebraucht wird. Annahme: unverändert.
- M-05 (Ergänzung): weitere Geschäftslogik-Befunde aus den Funktionstests (Details I-18).
- M-12 · Kundenstimmen: Dürfen Google-Bewertungen mit gekürztem Namen und Quelle wörtlich gezeigt und ein Schlüsselwort angestrichen werden (E-008)? Kriterium: Z-08 Inhalt, Recht. Annahme: ja, wie bisher auf der Website, Wortlaut unverändert.
- M-13 · Preisrechner: Die Einwilligung startet künftig nicht mehr vorab angekreuzt (E-014) – ein Klick mehr, dafür eine echte Zustimmung. Bitte bestätigen. Annahme: so umsetzen.
- M-14 · Fotoliste für die Jury-Kategorie „Inhalt“ (Z-08): Inhaber beim Aufmaß, Großformat-Fuge im Streiflicht, Walk-in-Dusche mit Rinne, Terrasse auf Stelzlagern, Treppe mit Kantenschiene, fertiges Bad (je 1–2, eigene Baustellen). Annahme: bis dahin tragen gezeichnete Verlegepläne die Bildwelt.
- M-15 · Mikrotext „Anfrage verbindlich absenden“ → „Anfrage senden“ (Anfrage-Funnel; andere Formulare nennen die Anfrage „unverbindlich“). Bitte bestätigen. Annahme: so umsetzen (MIKROTEXTE.md).
