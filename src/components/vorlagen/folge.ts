// Folge der Teile nach dem Einstieg (KERN v4 K-009 Seitenformel, alt K-009 in K-010; UM-E4-SICHT-FIX M-B7): Die Seitenformel
// bleibt Standard (Ihre Lage · Was wir tun · So läuft es ab · Beleg · Nächster Schritt). Abweichungen gibt es nur über einen
// Schalter im Inhalt der Seite, je mit Seitenliste und Grund in K-009 und ENTSCHEIDUNGEN; test/seitenformel-folgen.test.mjs
// prüft die erlaubten Folgen und dass nur die gelisteten Seiten einen Schalter setzen.
// - `belegVorn` (Erzählseite): der Beleg mit seinen Momenten (und `nachBeleg`) direkt nach der Lage, danach Tun, Ablauf,
//   Versprechen, Schritt (erst echt zeigen, dann erklären).
// - `wissenVorLage` (Wissensseite): die Wissensblöcke (z. B. Suche und Liste des Ratgebers) direkt nach dem Einstieg, die Lage
//   danach.
// - `nachLage` (Erzählseite, Slot der Seite): ein eigener Abschnitt direkt nach der Lage.
// - `momentZuerst` (Was wir tun) ändert nur die Folge innerhalb des Abschnitts (teile/Tun.tsx), nicht die der Teile.
// Der Einstieg steht immer zuerst (vor der Leitachse, außerhalb dieser Folge). Ein Werkzeug ohne `imSchritt` steht wie bisher
// nach dem Schritt. Reine Daten ohne React, damit der Test sie ohne Bau lesen kann.

/** Teile der Erzählseite nach dem Einstieg; die Vorlage setzt nur die Teile, die die Seite hat */
export type ErzaehlTeil = 'lage' | 'nachLage' | 'tun' | 'vergleich' | 'nachTun' | 'ablauf' | 'beleg' | 'nachBeleg' | 'versprechen' | 'schritt' | 'werkzeug';

/** Teile der Wissensseite nach dem Einstieg */
export type WissenTeil = 'lage' | 'wissen' | 'ablauf' | 'beleg' | 'versprechen' | 'schritt' | 'werkzeug';

/** Abschnitt der Seitenformel je Teil (1 Worum es geht ist der Einstieg); Versprechen und Vergleich gehören zu Beleg bzw. Tun
 *  (`data-formel` der Bausteine), ein Werkzeug nach dem Schritt zu keinem */
export const FORMEL_NUMMER: Record<ErzaehlTeil | WissenTeil, 2 | 3 | 4 | 5 | 6 | null> = {
  lage: 2,
  nachLage: 2,
  tun: 3,
  vergleich: 3,
  nachTun: 3,
  wissen: 3,
  ablauf: 4,
  beleg: 5,
  nachBeleg: 5,
  versprechen: 5,
  schritt: 6,
  werkzeug: null,
};

const ERZAEHL_STANDARD: ErzaehlTeil[] = ['lage', 'nachLage', 'tun', 'vergleich', 'nachTun', 'ablauf', 'beleg', 'nachBeleg', 'versprechen', 'schritt', 'werkzeug'];
const ERZAEHL_BELEG_VORN: ErzaehlTeil[] = ['lage', 'nachLage', 'beleg', 'nachBeleg', 'tun', 'vergleich', 'nachTun', 'ablauf', 'versprechen', 'schritt', 'werkzeug'];

/** Folge der Erzählseite: Standard nach K-009, mit `belegVorn` der Beleg direkt nach der Lage */
export function erzaehlFolge({ belegVorn = false }: { belegVorn?: boolean } = {}): ErzaehlTeil[] {
  return [...(belegVorn ? ERZAEHL_BELEG_VORN : ERZAEHL_STANDARD)];
}

/** Folge der Wissensseite: Standard nach K-009, mit `wissenVorLage` die Wissensblöcke vor der Lage */
export function wissenFolge({ wissenVorLage = false }: { wissenVorLage?: boolean } = {}): WissenTeil[] {
  return wissenVorLage ? ['wissen', 'lage', 'ablauf', 'beleg', 'versprechen', 'schritt', 'werkzeug'] : ['lage', 'wissen', 'ablauf', 'beleg', 'versprechen', 'schritt', 'werkzeug'];
}
