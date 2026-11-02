// Galerie „Unsere Arbeiten“ auf /referenzen (KERN v3.4 K-007 `galerie-filter`, K-012; E3-GRAF-08): Daten und reine Logik
// des großen Moments, ohne JSX und nur mit Typ-Importen (test/galerie-filter.test.mjs lädt die Datei direkt). Filter und Satz
// wörtlich aus _werkstatt/texte/referenzen.md (Abschnitt 5), „Alle Fotos“ und die Statuszeile neu. Je Foto eine Gruppe nach
// dem, was zu sehen ist (nicht nach `raum` in arbeiten.ts: bad-beleg-4 ist eine Dusche, Baustellenbilder sind „So arbeiten
// wir“), und eine kurze Unterschrift aus dem Alt-Text, ohne Orte (K-015) und ohne Fachwort. Nur Fotos im Format 4 : 5, jede
// Bilddatei einmal, das Einstiegsbild der Seite (`REFERENZEN.worum.bild`) nicht. Reihenfolge abwechselnd nach Gruppe, damit „Alle Fotos“
// gemischt beginnt. Neue Bildplätze aus E3-BILD-01 hier ergänzen.
import type { ArbeitId } from '@/config/arbeiten';
import type { IconName } from '@/components/icons/namen';

export type GruppeId = 'bad' | 'dusche' | 'balkon-und-terrasse' | 'treppe-und-eingang' | 'wohnen-und-kueche' | 'so-arbeiten-wir';
export type Wahl = 'alle' | GruppeId;

export interface Gruppe {
  id: Wahl;
  /** Beschriftung des Knopfs */
  name: string;
  /** Zeichen im Knopf (eigene Icon-Familie); gedrückt steht dort das Fugenkreuz */
  icon: IconName;
  /** Satzende der Statuszeile („Sie sehen 7 Fotos aus dem Bad.“); leer bei „Alle Fotos“ */
  zusatz: string;
  /** Leistungsseite zu den Fotos dieser Gruppe (Link auf der Glasfläche, K-016, E-047); ohne: nur der Name */
  href?: string;
}

export interface GalerieFoto {
  bild: ArbeitId;
  gruppe: GruppeId;
  unterschrift: string;
}

/** Satz über den Knöpfen (wörtlich aus dem Seitentext), zugleich Name der Knopfgruppe */
export const SATZ = 'Wählen Sie einen Raum. Dann sehen Sie nur die Fotos aus diesem Raum.';

export const GRUPPEN: Gruppe[] = [
  { id: 'alle', name: 'Alle Fotos', icon: 'fliese', zusatz: '' },
  { id: 'bad', name: 'Bad', icon: 'bad', zusatz: 'aus dem Bad', href: '/bad/badsanierung' },
  { id: 'dusche', name: 'Dusche', icon: 'dusche-rinne', zusatz: 'von Duschen', href: '/bad/barrierefreies-bad' },
  { id: 'balkon-und-terrasse', name: 'Balkon und Terrasse', icon: 'balkon', zusatz: 'von Balkon und Terrasse', href: '/balkon-terrasse' },
  { id: 'treppe-und-eingang', name: 'Treppe und Eingang', icon: 'treppe', zusatz: 'von Treppe und Eingang', href: '/treppen' },
  { id: 'wohnen-und-kueche', name: 'Wohnräume und Küche', icon: 'haus', zusatz: 'aus Wohnräumen und Küchen', href: '/leistungen/wohnen' },
  { id: 'so-arbeiten-wir', name: 'So arbeiten wir', icon: 'reparatur', zusatz: 'von unserer Arbeit auf der Baustelle', href: '/ueber-uns' },
];

// Browserprüfung E4-W1, Runde 2: fertige Räume zuerst (abwechselnd nach Gruppe), die Fotos von der Baustelle als eigener
// Block am Ende, damit „Alle Fotos“ nicht Baustelle und fertige Räume mischt; 24 Fotos, damit Zwei- und Dreierraster
// ohne Loch enden (Gäste-WC dazu). Runde 3: die Dusche mit Sitzbank zeigt noch Rohranschlüsse ohne Armatur und steht
// deshalb als erstes Foto im Block von der Baustelle. UM-E4-SICHT-FIX M-A2: start-dusche ist der Einstieg von /referenzen und
// verlässt die Galerie; das bisherige Einstiegsbild tritt ans Ende der fertigen Räume (Tausch, weiter 24 Fotos). An seine Stelle
// rückt die helle Dusche mit Sitzbank (gleiche Gruppe): Die erste Reihe beginnt wie vorher mit einer Dusche statt mit drei
// dunklen Motiven (Nacharbeit SF-A; die Reihenfolge im Ganzen legt M-C3).
// UM-E4-SICHT-FIX-2 M2-C1 Nr. 4 (Bildtabelle M2-B1): start-dusche wird Einstieg von /bad/badsanierung und kehrt in die Galerie
// zurück, an den Platz von bad-beleg-3 (Gruppe Dusche, Name aus dem Alt-Text), nicht an Platz 1; bad-beleg-3 ist dafür der
// Einstieg von /referenzen und verlässt die Galerie (weiter 24 Fotos, jede Bilddatei einmal). Rückweg: Tausch in dieser Zeile und
// in referenzen.ts zurück.
// SEO-Runde P5 (02.11.2026, Freigabe Umut „alle Bilder“): die neuen Fotos „nb-…“ hinter den bisherigen, fertige Räume
// abwechselnd nach Gruppe vor dem Block von der Baustelle; neue Gruppe „Wohnräume und Küche“; Summe in Sechserschritten.
export const GALERIE: GalerieFoto[] = [
  { bild: 'start-galerie-1', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit Sitzbank und Mosaik' },
  { bild: 'start-beleg-bad', gruppe: 'bad', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
  { bild: 'start-galerie-3', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt' },
  { bild: 'start-beleg-treppe', gruppe: 'treppe-und-eingang', unterschrift: 'Außentreppe mit anthrazitfarbenen Fliesen und Handlauf' },
  { bild: 'start-dusche', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit großen grauen Fliesen' },
  { bild: 'start-galerie-4', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse mit großen hellgrauen Platten' },
  { bild: 'kontakt-eingang', gruppe: 'treppe-und-eingang', unterschrift: 'Stufen am Eingang mit beigen Fliesen und hellen Kanten' },
  { bild: 'badsanierung-einstieg', gruppe: 'bad', unterschrift: 'Badewanne mit blauen und beigen Ornamentfliesen' },
  { bild: 'balkon-beleg-2', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkon mit rosébraunen Fliesen und Geländer' },
  { bild: 'bad-beleg-4', gruppe: 'dusche', unterschrift: 'Dusche mit Mosaikstreifen an der Wand' },
  { bild: 'bad-beleg-1', gruppe: 'bad', unterschrift: 'Badewanne mit Lichtlinie und gemustertem Boden' },
  { bild: 'balkon-beleg-3', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse in Erdtönen mit einem Gitter für das Regenwasser' },
  { bild: 'ort-gaeste-wc', gruppe: 'bad', unterschrift: 'Gäste-WC mit weißen Metrofliesen' },
  { bild: 'balkon-beleg-aluprofil', gruppe: 'balkon-und-terrasse', unterschrift: 'Graue Terrassenplatten mit heller Kante aus Metall' },
  { bild: 'bad-beleg-2', gruppe: 'bad', unterschrift: 'Bad im Landhausstil mit Wanne und Holzregal' },
  { bild: 'referenzen-einstieg', gruppe: 'bad', unterschrift: 'Bad in Marmoroptik mit Regendusche' },
  { bild: 'nb-019', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit Rinne' },
  { bild: 'nb-084', gruppe: 'bad', unterschrift: 'Bad mit großen Fliesen in Beige' },
  { bild: 'nb-073', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkon mit beigen Bodenfliesen in Steinoptik' },
  { bild: 'nb-004', gruppe: 'treppe-und-eingang', unterschrift: 'Treppenhaus mit neuem Boden aus Ornamentfliesen im Sternmuster' },
  { bild: 'nb-013', gruppe: 'wohnen-und-kueche', unterschrift: 'Küchenboden mit Ornamentfliesen im Achteckmuster in Grau und Weiß' },
  { bild: 'nb-085', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit Ablauf und Diagonalschnitten im Boden' },
  { bild: 'nb-086', gruppe: 'bad', unterschrift: 'Badewanne mit gefliester Verkleidung' },
  { bild: 'nb-074', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkonboden mit beigen Fliesen in Steinoptik in der Draufsicht' },
  { bild: 'nb-076', gruppe: 'treppe-und-eingang', unterschrift: 'Außentreppe zum Keller mit beigen Fliesen' },
  { bild: 'nb-049', gruppe: 'wohnen-und-kueche', unterschrift: 'Boden aus Patchworkfliesen mit Ornamenten und Fliesensockel' },
  { bild: 'nb-082', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit großen grauen Fliesen' },
  { bild: 'nb-014', gruppe: 'bad', unterschrift: 'Bad mit Waschtisch und beleuchtetem Spiegelschrank' },
  { bild: 'nb-078', gruppe: 'balkon-und-terrasse', unterschrift: 'Dachterrasse zwischen Ziegeldach und Metalldach mit grauen Fliesen' },
  { bild: 'nb-008', gruppe: 'treppe-und-eingang', unterschrift: 'Außentreppe am Hauseingang mit Podest und zwei Stufen aus großen beigen Fliesen' },
  { bild: 'nb-102', gruppe: 'wohnen-und-kueche', unterschrift: 'Holzherd mit Rauchrohr vor einer Wandverkleidung aus Bruchmosaik' },
  { bild: 'nb-100', gruppe: 'dusche', unterschrift: 'Duschbereich mit einem senkrechten Streifen aus Stäbchenmosaik' },
  { bild: 'nb-083', gruppe: 'bad', unterschrift: 'Bad in Beige mit Dusche ohne Stufe' },
  { bild: 'nb-088', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse mit grauen Platten in Betonoptik und offener Fuge' },
  { bild: 'nb-077', gruppe: 'treppe-und-eingang', unterschrift: 'Außentreppe von unten mit beigen Fliesen' },
  { bild: 'nb-123', gruppe: 'wohnen-und-kueche', unterschrift: 'Kamin mit Wandverkleidung aus weißem Marmor mit kleinen schwarzen Einlegern' },
  { bild: 'nb-105', gruppe: 'dusche', unterschrift: 'Dusche mit Boden in brauner Marmoroptik' },
  { bild: 'nb-101', gruppe: 'bad', unterschrift: 'Hängendes WC vor einer Wand mit Stäbchenmosaik in Natursteinoptik' },
  { bild: 'nb-089', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse mit grauen Platten in offener Fuge' },
  { bild: 'nb-044', gruppe: 'wohnen-und-kueche', unterschrift: 'Boden mit großen hellen Fliesen und schmalen Fugen' },
  { bild: 'nb-117', gruppe: 'dusche', unterschrift: 'Dusche hinter Glastüren mit senkrechtem Mosaikstreifen an der Rückwand' },
  { bild: 'nb-111', gruppe: 'bad', unterschrift: 'Badewanne mit gefliester Schürze und Rautenbordüre' },
  { bild: 'nb-079', gruppe: 'balkon-und-terrasse', unterschrift: 'Dachterrasse von oben mit grauen Fliesen im versetzten Verband' },
  { bild: 'nb-065', gruppe: 'bad', unterschrift: 'Wandnische mit Metallprofilen über einer Badewanne' },
  { bild: 'nb-103', gruppe: 'wohnen-und-kueche', unterschrift: 'Türöffnung mit Einfassung aus Bruchmosaik' },
  { bild: 'nb-118', gruppe: 'dusche', unterschrift: 'Dusche mit Glastür und Wandnische' },
  { bild: 'nb-120', gruppe: 'bad', unterschrift: 'Trennwand mit Travertin im römischen Verband und Kantenprofil aus Metall' },
  { bild: 'nb-099', gruppe: 'dusche', unterschrift: 'Wandnische mit Metallprofilen in weiß gefliester Wand' },
  { bild: 'nb-109', gruppe: 'bad', unterschrift: 'Bad mit diagonal verlegten beigen Fliesen und Rautenbordüre' },
  { bild: 'bereich-dusche-streifen-sitzbank', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche fertig gefliest, die Armaturen kommen noch' },
  { bild: 'entstehung-dusche-2', gruppe: 'so-arbeiten-wir', unterschrift: 'Die Fliesen sind schräg zum Ablauf geschnitten, so läuft das Wasser gut ab' },
  { bild: 'sanierung-weg-1', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, die Wand ist halb gefliest' },
  { bild: 'start-galerie-6', gruppe: 'so-arbeiten-wir', unterschrift: 'Balkonboden vor dem Verlegen: ein blaues Band dichtet die Ränder ab' },
  { bild: 'entstehung-dusche-1', gruppe: 'so-arbeiten-wir', unterschrift: 'Kleine Klemmen bringen große Fliesen genau auf eine Höhe' },
  { bild: 'sanierung-weg-2', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, die Decke ist noch offen' },
  { bild: 'balkon-stelzlager', gruppe: 'so-arbeiten-wir', unterschrift: 'Große Platten liegen auf kleinen Füßen, darunter läuft Regen ab' },
  { bild: 'sanierung-weg-3', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, brauner Boden in der Dusche' },
  { bild: 'nb-001', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschrückwand aus großen Fliesen in grüner Marmoroptik über weißer Duschwanne' },
  { bild: 'nb-011', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche ohne Stufe mit weißen Wandfliesen in Marmoroptik' },
  { bild: 'nb-018', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschecke mit weißer Duschtasse' },
  { bild: 'nb-020', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad mit dunklem Boden aus großen Fliesen' },
  { bild: 'nb-022', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad unter der Dachschräge mit Raumsparwanne und großen beigen Fliesen' },
  { bild: 'nb-024', gruppe: 'so-arbeiten-wir', unterschrift: 'Leerer Raum mit Gewebebahnen auf dem Boden und blauen Randstreifen an den Wänden' },
  { bild: 'nb-026', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche ohne Stufe mit Rinne unter dem Fenster' },
  { bild: 'nb-030', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad im Bau mit großen Fliesen in Betonoptik' },
  { bild: 'nb-031', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche ohne Stufe mit Ablauf und diagonalen Schnitten im Boden' },
  { bild: 'nb-038', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche ohne Stufe mit Mosaik in Weiß und Grau und Bodenablauf' },
  { bild: 'nb-039', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad mit hellen Wandfliesen' },
  { bild: 'nb-042', gruppe: 'so-arbeiten-wir', unterschrift: 'Lange weiße Duschwanne mit gefliester Einfassung' },
  { bild: 'nb-045', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad im Bau mit grünen Stäbchenfliesen an der Rückwand' },
  { bild: 'nb-047', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad im Bau mit großen Fliesen in Steinoptik' },
  { bild: 'nb-048', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche ohne Stufe im Bau mit großen Fliesen in Steinoptik' },
  { bild: 'nb-054', gruppe: 'so-arbeiten-wir', unterschrift: 'Raum im Ausbau mit großen hellen Bodenfliesen' },
  { bild: 'nb-064', gruppe: 'so-arbeiten-wir', unterschrift: 'Gästetoilette mit grauen Fliesen in Steinoptik halbhoch an der Wand und am Boden' },
  { bild: 'nb-070', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschbereich unter dem Fenster mit Rinne und Kantenprofil' },
  { bild: 'nb-071', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschnische mit Rückwand in Holzoptik' },
  { bild: 'nb-092', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschecke mit beigen Wandfliesen' },
  { bild: 'nb-096', gruppe: 'so-arbeiten-wir', unterschrift: 'Wandecke mit quer verlegten Fliesen in Holzoptik' },
  { bild: 'nb-098', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche im Bau mit großen Wandfliesen in Anthrazit' },
  { bild: 'nb-110', gruppe: 'so-arbeiten-wir', unterschrift: 'Begehbare Dusche mit gebogener Mosaikwand und Sitzbank' },
  { bild: 'nb-119', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad im Bau: Badewanne mit gefliester Verkleidung und Mosaikstreifen' },
  { bild: 'nb-125', gruppe: 'so-arbeiten-wir', unterschrift: 'Badewanne mit Verkleidung aus Travertin und Rautenbordüre' },
  { bild: 'nb-127', gruppe: 'so-arbeiten-wir', unterschrift: 'Fensterwand mit diagonal verlegtem Travertin' },
  { bild: 'nb-002', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad im Bau mit Fliesen in beiger Steinoptik an Wand und Boden' },
  { bild: 'nb-003', gruppe: 'so-arbeiten-wir', unterschrift: 'Treppenhaus mit Holztreppe nach dem Abbruch des alten Bodenbelags' },
  { bild: 'nb-005', gruppe: 'so-arbeiten-wir', unterschrift: 'Abbruch des alten Bodens am Fuß einer Holztreppe' },
  { bild: 'nb-006', gruppe: 'so-arbeiten-wir', unterschrift: 'Raumecke nach dem Abbruch mit freigelegtem Boden' },
  { bild: 'nb-007', gruppe: 'so-arbeiten-wir', unterschrift: 'Reste roter Fliesen auf dickem Mörtel am Fuß einer Holztreppe' },
  { bild: 'nb-009', gruppe: 'so-arbeiten-wir', unterschrift: 'Fliesenboden in Holzoptik im Dielenformat vor einer weißen Tür' },
  { bild: 'nb-010', gruppe: 'so-arbeiten-wir', unterschrift: 'Schmaler Toilettenraum nach dem Rückbau mit freigelegtem Boden' },
  { bild: 'nb-017', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad mit blauen Bodenfliesen in Marmoroptik' },
  { bild: 'nb-021', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad mit dunklem Boden aus großen Fliesen und Wand für das WC' },
  { bild: 'nb-023', gruppe: 'so-arbeiten-wir', unterschrift: 'Raum mit neu verlegtem Boden in dunkler Betonoptik' },
  { bild: 'nb-043', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschbereich beim Umbau mit neuem Boden und Bodenablauf' },
  { bild: 'nb-046', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche ohne Stufe mit großen grauen Fliesen und Rinne an der Wand' },
  { bild: 'nb-051', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad mit hellen Wandfliesen im Querformat bis zur Decke' },
  { bild: 'nb-053', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad nach dem Fliesen: helle Wandfliesen im Querformat mit durchgehenden Fugen' },
  { bild: 'nb-056', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche ohne Stufe mit Rinne und großen grauen Wandfliesen in Steinoptik' },
  { bild: 'nb-058', gruppe: 'so-arbeiten-wir', unterschrift: 'Zwei Räume im Ausbau mit durchgehenden hellen Bodenfliesen' },
  { bild: 'nb-060', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschnische ohne Stufe mit Rinne' },
  { bild: 'nb-061', gruppe: 'so-arbeiten-wir', unterschrift: 'Leerer Raum mit großen hellen Bodenfliesen' },
  { bild: 'nb-062', gruppe: 'so-arbeiten-wir', unterschrift: 'Raum im Ausbau mit großen hellen Bodenfliesen' },
  { bild: 'nb-063', gruppe: 'so-arbeiten-wir', unterschrift: 'Flur mit großen hellen Bodenfliesen' },
  { bild: 'nb-068', gruppe: 'so-arbeiten-wir', unterschrift: 'Wandnische in schwarzer Marmoroptik mit Metallprofilen' },
  { bild: 'nb-080', gruppe: 'so-arbeiten-wir', unterschrift: 'Außentreppe zum Keller nach Entfernen des alten Belags' },
  { bild: 'nb-087', gruppe: 'so-arbeiten-wir', unterschrift: 'Duschbereich mit flacher Duschwanne und glänzenden Wandfliesen in Marmoroptik' },
  { bild: 'nb-090', gruppe: 'so-arbeiten-wir', unterschrift: 'Wandnische mit Metallprofil zwischen großen dunklen Fliesen' },
  { bild: 'nb-091', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche im Bau mit großen anthrazitfarbenen Fliesen' },
  { bild: 'nb-093', gruppe: 'so-arbeiten-wir', unterschrift: 'Große Bodenfliesen beim Verlegen mit kleinen Klemmen' },
  { bild: 'nb-094', gruppe: 'so-arbeiten-wir', unterschrift: 'Graue Wandfliesen beim Verlegen mit kleinen Klemmen' },
  { bild: 'nb-095', gruppe: 'so-arbeiten-wir', unterschrift: 'Wand für das WC mit großen schwarzen Fliesen im Bau' },
  { bild: 'nb-097', gruppe: 'so-arbeiten-wir', unterschrift: 'Boden mit Fliesen in Holzoptik im Dielenformat' },
  { bild: 'nb-112', gruppe: 'so-arbeiten-wir', unterschrift: 'Flur mit Fliesen in Travertinoptik im römischen Verband und passendem Sockel' },
  { bild: 'nb-126', gruppe: 'so-arbeiten-wir', unterschrift: 'Wandecke über der Badewanne mit diagonal verlegtem Travertin und dunklem Rahmen' },
];

/** höchste Staffelstufe: K-005 erlaubt eine Staffel über höchstens 8 Elemente (Stufen 0 bis 7) */
export const STAFFEL_MAX = 7;

/** Eingeklappt (UM-E4-SICHT-FIX M-C3 Nr. 2): bei „Alle Fotos“ zuerst drei Reihen, schmal (eine oder zwei Spalten) 6 Fotos, im
 *  Dreierraster 9; darunter „Alle {n} Fotos zeigen“. Ein Raum zeigt immer alle Fotos seiner Gruppe */
export const ZUERST = { schmal: 6, breit: 9 } as const;

/** Marke für die Fotos, die eingeklappt fehlen: ab dem 7. Foto schmal, ab dem 10. auch im Dreierraster */
export function mehrMarke(index: number): 'schmal' | 'breit' | undefined {
  if (index >= ZUERST.breit) return 'breit';
  return index >= ZUERST.schmal ? 'schmal' : undefined;
}

/** Staffelstufen beim Nachzeigen: die Fotos ab `ab` blenden in Lesefolge ein (0, 1, 2 … höchstens STAFFEL_MAX), wie beim
 *  Filtern (Register galerie-filter) */
export function stufenNachzeigen(anzahlFotos: number, ab: number): (number | null)[] {
  return Array.from({ length: anzahlFotos }, (_, i) => (i >= ab ? Math.min(i - ab, STAFFEL_MAX) : null));
}

export function istSichtbar(gruppe: GruppeId, wahl: Wahl): boolean {
  return wahl === 'alle' || gruppe === wahl;
}

export function anzahl(wahl: Wahl, fotos: readonly { gruppe: GruppeId }[]): number {
  return fotos.filter((f) => istSichtbar(f.gruppe, wahl)).length;
}

/** Blendet ein Foto nach einem Wechsel ein? Beim Laden nie (vorher null); bei einem Raum alle seine Fotos (sie legen sich
 *  neu); bei „Alle Fotos“ nur die, die vorher verborgen waren (die stehenden bleiben ruhig). */
export function blendetEin(gruppe: GruppeId, wahl: Wahl, vorher: Wahl | null): boolean {
  if (vorher === null || !istSichtbar(gruppe, wahl)) return false;
  return wahl !== 'alle' || !istSichtbar(gruppe, vorher);
}

/** Staffelstufe je Foto in Lesefolge: 0, 1, 2 … höchstens STAFFEL_MAX für einblendende Fotos, sonst null */
export function stufen(fotos: readonly { gruppe: GruppeId }[], wahl: Wahl, vorher: Wahl | null): (number | null)[] {
  let n = 0;
  return fotos.map((f) => (blendetEin(f.gruppe, wahl, vorher) ? Math.min(n++, STAFFEL_MAX) : null));
}

/** Text der Statuszeile (role="status"), z. B. „Sie sehen 7 Fotos aus dem Bad.“. `eingeklappt` (UM-E4-SICHT-FIX-2 M2-C1 Nr. 2,
 *  Mikrotext): Bei „Alle Fotos“ stehen eingeklappt nur drei Reihen, die Zeile sagt dann ehrlich „eine Auswahl“ statt „alle“ (vorher
 *  „Sie sehen alle 24 Fotos.“ über einer Galerie, die mit „Alle 24 Fotos zeigen“ endet); aufgeklappt oder gefiltert wie bisher */
export function ansage(wahl: Wahl, n: number, eingeklappt = false): string {
  if (wahl === 'alle') return eingeklappt ? `Sie sehen eine Auswahl aus ${n} Fotos.` : `Sie sehen alle ${n} Fotos.`;
  const zusatz = GRUPPEN.find((g) => g.id === wahl)?.zusatz ?? '';
  return `Sie sehen ${n === 1 ? '1 Foto' : `${n} Fotos`} ${zusatz}.`;
}
