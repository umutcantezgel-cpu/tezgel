# LAGEBILD · Ausgangslage am Basisstand 745335f (E0-ORCH-02)

Stand 10.10.2026, Belege `_werkstatt/belege/e0/ausgang/AUSGANG.md`, Vorlauf `_relaunch/`, Kundschafterberichte `_werkstatt/berichte/E0-KUN-01…05`. Lighthouse-Werte folgen aus E0-PRUEF-03L (Ruhefenster), die Funktionsliste aus E0-PRUEF-04.

## Was da ist
- 76 Seitendateien, 121 Prüfseiten, 170 HTML-Seiten, Sitemap 163, 0 kaputte interne Links; je Seite genau eine Überschrift erster Ebene, Titel und Beschreibung vollständig, strukturierte Daten auf allen Seiten.
- Neun Anfragewege über eine Route (`/api/anfrage`) mit Schutz gegen Spam, Bestätigungs-E-Mail und Referenznummer; Einwilligung nach DSGVO/TTDSG mit gleichwertigem Ablehnen und Widerruf; Karten erst nach Einwilligung.
- 292 Funktionstests (F-01 bis F-19) aus dem Vorlauf, bekannte Altfehler als `fixme` markiert.
- Schriften schlank (75,7 KB), keine Konsolenfehler, kein Überlauf in 390/768/1440.

## Wo es hakt
- **Gestaltung:** generischer Baukasten (Verläufe, Leuchtkugeln, Pill-Badges, Kartenraster mit Schatten, Orange überall), keine eigene Formensprache; Jury-Wert im Vorlauf 4,2–4,4 von 10.
- **Zugänglichkeit:** 349 ernste Befunde auf den 12 Hauptansichten, fast alle Kontrast (344), dazu Fokus (5); 3.836 dekorative Grafiken ohne `focusable="false"`.
- **Bewegung:** 34–95 Animationen je Seite ohne Ordnung, 2–5 Bewegungen trotz „weniger Bewegung“; Ziehen-und-Werfen-Physik bei Banner und WhatsApp-Kreis, Wasser-Cursor.
- **Tempo:** mobil wird das größte Element im Vorlauf nach 3,4–6,6 s sichtbar (Budget 2,5 s); Ursachen laut Planprüfung: Anmelde- und Inhaltsdaten in jedem Bündel, `/blog` vollständig im Browser gerendert, Einwilligungsbanner als spätes größtes Element (auf `/kontakt` gemessen).
- **Überdeckung:** fester Kopf und untere Leiste verdecken beim Scrollen Inhalt (2.041 Befunde), dazu schwebende Ebenen (WhatsApp-Kreis, Schild, Banner).
- **Altfehler (M-06):** Konfigurator sendet ohne Flächenangabe 20 m² und verliert Treppendaten; Fußbodenheizung „unklar“ wird als „Nein“ übermittelt; Info-Kasten der Standortkarte überdeckt mobil den Knopf (V-01).

## Hebel (in der Reihenfolge des Plans)
1. Eigenes System statt Baukasten: KERN v2 (Verlegeplan, Fuge, eine rote Laserachse, Archivo/Plex Mono, eigene Icons) – schon umgesetzt: Fundament, Bewegungssystem, Formsystem (38 Icons), Referenzbausteine, Rahmen.
2. Umbau an der Ursache: Umbauskript für alle Seiten (Icons, Farben, Schrift, Abstände) mit Textschutz; Funnels zerlegt, damit sie parallel gestaltet werden können.
3. Tempo an der Ursache (E2-ORCH-05c): Provider an ihren Nutzungsort, `/blog` als Server-Komponente, Banner kleiner als die Überschrift.
4. Zugänglichkeit über die Tokens: Kontrast in Tinte/Kalk, Fokus sichtbar, Grafiken mit ARIA aus einer Quelle.

## Risiken
- LCP-Budget mobil: hängt am Banner und an den Bündeln; Messung im Ruhefenster nötig (Last durch parallele Pakete verfälscht Werte).
- Textschutz bei 20.600 Zeilen Markup: Umbauskript und Funnel-Zerlegung prüfen den Text-Fingerabdruck; Textbasis aller 121 Seiten liegt vor.
- Zwei Altlasten brauchen Menschen: Löschfreigabe der verwaisten Komponenten (M-15), rechtliche und Bildrechte-Fragen (M-01, M-02).
