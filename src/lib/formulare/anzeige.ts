// Anzeige von Auswahlwerten in Alltagssprache (E3-WERKZEUG-TEXTE-5, E-057). Viele Auswahlwerte der Werkzeuge gehen als Text
// in Nutzlast und Mail an den Betrieb (Preisrechner, Projektcheck, Express-Anfrage) und werden von den Funktionsprüfungen
// wörtlich erwartet; sie bleiben, wie sie sind. Angezeigt wird diese Fassung: zuerst die feste Zuordnung, sonst Spannen mit
// „bis“ statt Strich und „und“ statt „&“ (K-010: keine Gedankenstriche, keine Bindestrichwörter außerhalb K-010-B).
const FEST: Readonly<Record<string, string>> = {
  // Preisrechner: Gewerke (Titel, Untertitel, Hinweis)
  'Badsanierung & Walk-In Dusche': 'Badsanierung und bodengleiche Dusche',
  'Wand & Boden, Gefälle, Nischen & Komplettbad': 'Wand und Boden, Gefälle, Nischen, ganzes Bad',
  'XXL-Großformat (ab 120 cm)': 'Große Fliesen (ab 120 cm)',
  'Fugenarme Fliesen, Vakuumheber & Kalibrierung': 'Wenige Fugen, genau ausgerichtet',
  'Wohnraum, Flur & Küche': 'Wohnraum, Flur und Küche',
  'Feinsteinzeug, Holzoptik & durchgehende Fugen': 'Feinsteinzeug, Holzoptik und durchgehende Fugen',
  'Balkon, Terrasse & Außen': 'Balkon, Terrasse und draußen',
  'Frostsichere 2-cm-Keramik, Stelzlager & Gefälle': 'Frostfeste Platten, auch auf Stelzlagern, mit Gefälle',
  'DIN 18534 Abdichtung & Estrich': 'Abdichtung nach DIN 18534 und Estrich',
  'Verbundabdichtung, Dichtbänder & Nivellierung': 'Abdichtung unter den Fliesen, Dichtbänder, Boden ausgleichen',
  'Reparatur & Schadensbeseitigung': 'Reparatur und Schäden beheben',
  'Fliesentausch, Silikonfugen & Ursachenprüfung': 'Fliesen tauschen, Fugen erneuern, Ursache finden',
  Zertifiziert: 'Nach Norm',
  // Preisrechner: Raumgrößen
  'Kompakt / Gäste-WC': 'Klein oder Gäste-WC',
  'Standard-Raum / Bad': 'Normales Bad oder Zimmer',
  'Großraum / Wohnbereich': 'Großer Raum oder Wohnbereich',
  'Gesamtes Objekt / Etage': 'Ganzes Haus oder Etage',
  // Preisrechner: Vorarbeiten
  'Altfliesen entfernen & entsorgen': 'Alte Fliesen entfernen und entsorgen',
  'Untergrundausgleich / Estrich nötig': 'Boden oder Wand ausgleichen',
  'Fußbodenheizung vorhanden / geplant': 'Fußbodenheizung da oder geplant',
  'Barrierefreier / schwellenloser Zugang': 'Barrierefrei, ohne Schwellen',
  'Material- & Fliesenberatung gewünscht': 'Beratung zu Fliesen gewünscht',
  'Verlegung erfordert hochflexible S1/S2 Mörtel für thermische Spannungen':
    'Dafür braucht es einen Kleber, der Wärme und Bewegung aushält',
  'Einsatz von Staubschutztüren & HEPA-Luftreinigern während der Arbeiten':
    'Mit Staubschutztüren und Luftreinigern während der Arbeiten',
  // Preisrechner: Art des Objekts, Zeitraum
  'Bestandsimmobilie / Sanierung': 'Bestehendes Haus, Sanierung',
  'Neubau / Erstbezug': 'Neubau oder Erstbezug',
  'Mietobjekt / Wohnanlage': 'Mietwohnung oder Wohnanlage',
  'Gewerbe / Praxis / Büro': 'Geschäft, Praxis oder Büro',
  'Flexibel / In Planung': 'Noch offen, in Planung',
  // Express-Anfrage
  'In mehr als 3 Monaten / Flexibel': 'In mehr als 3 Monaten oder noch offen',
  // Projektcheck: Ausstattung und Stufen
  'Bodengleiche Walk-In-Dusche': 'Bodengleiche Dusche',
  'Badewanne / Komfortwanne': 'Badewanne oder Komfortwanne',
  'Dusch-WC mit Hygiene-Spülung': 'WC mit Duschfunktion',
  'Möbel-Doppelwaschtisch': 'Doppelwaschtisch mit Unterschrank',
  'Design-Heizkörper': 'Moderner Badheizkörper',
  'LED-Lichtspiegel': 'Spiegel mit Licht',
  'Großformat-Fliesenverlegung': 'Große Fliesen',
  'Spa-Charakter, Dusch-WC': 'Wellness und WC mit Duschfunktion',
  'Sanitär & Keramik': 'Sanitär und Fliesen',
  'Funktional & zeitlos': 'Funktional und zeitlos',
};

/** Anzeigefassung eines Auswahlwerts; der Wert selbst (Nutzlast, Mail, Prüfungen) bleibt unverändert */
export function anzeige(wert: string): string {
  const fest = FEST[wert];
  if (fest) return fest;
  return wert.replace(/(\d)\s+-\s+(\d)/g, '$1 bis $2').replace(/\s+&\s+/g, ' und ');
}
