// Über uns · Werte (UM-E4-EP2, KERN v4 K-003 Nr. 1 und 4, K-009; Rückführung des Werte-Blocks aus E0 nach UM-5): die sechs Werte
// als Vertrauensliste an der Fuge, als eigener Abschnitt nach „Was wir tun“ (Slot `nachTun` der Erzählseite). Eine Wand aus
// ungleichen Fliesen statt eines gleichförmigen Kartenrasters: Die belegten Fakten (eingetragen bei der Handwerkskammer,
// Abdichtung nach DIN 18534; Anhang F, F-05 und F-15) stehen ab xl als zwei große Fliesen über je der halben Breite, die übrigen
// vier als kleine Fliesen in einer Reihe darunter; die Fugen sind 1-px-Linien in `fuge`, die Seiten bleiben offen. Mobil eine
// Spalte, ab md zwei (bis xl: vier Spalten wären bei t1024 zu schmal für die Sätze). Je Wert ein Zeichen der eigenen Icon-Familie (dekorativ), der Name als H3 und ein Satz. Fläche Fliese:
// Sie setzt den Abschnitt gegen „Was wir tun“ auf Kalk ab; auf Fliese steht kein Kopf des Leitfadens neben den H3. Ohne
// Bewegung (Ruhe). Wortlaut und Anpassungen (Garantie-Wörter nach M-07, K-011) in `src/inhalte/ueber-uns.ts`; Garantie-Wörter
// prüft der Baustein beim Bau mit demselben Muster wie das Qualitätsversprechen (M-07 in einer Linie). Serverkomponente.
// UM-E4-SICHT-FIX M-C4 Nr. 2: Vertrauensliste an der Fuge ohne Symbolraster (Sichtabnahme E4 a2/b3: generische Zeichen im
// Kartenraster). Die zwei belegten Fakten stehen groß nebeneinander (ab md je die halbe Breite), die übrigen vier als Zeilen an
// der Fuge darunter: Name links, Satz rechts daneben (ab md), mobil untereinander; alles linksbündig. Die Zeichen der Werte
// bleiben in den Daten (`zeichen`), der Baustein zeigt sie nicht mehr. Wortlaut unverändert.
import Abschnitt from '@/components/kern/Abschnitt';
import Textmarken from '@/components/kern/Textmarken';
import { zusammen } from '@/components/kern/zusammen';
import type { IconName } from '@/components/icons/Icon';
import type { Markentext } from '@/components/vorlagen/inhalt';
import { GARANTIE } from '@/components/vorlagen/teile/Versprechen';

export interface Wert {
  name: string;
  satz: Markentext;
  zeichen: IconName;
  /** belegter Fakt aus dem Faktenblatt: steht groß in der ersten Reihe (Vertrauensliste mit HWK und DIN) */
  belegt?: boolean;
}

export interface WerteInhalt {
  titel: string;
  einleitung?: Markentext;
  werte: Wert[];
}

export default function Werte({ inhalt }: { inhalt: WerteInhalt }) {
  for (const w of inhalt.werte) {
    if (GARANTIE.test(`${w.name} ${w.satz}`)) throw new Error(`Werte: Garantie-Wort in „${w.name}“ (M-07 offen).`);
  }
  const belegt = inhalt.werte.filter((w) => w.belegt);
  const uebrige = inhalt.werte.filter((w) => !w.belegt);
  return (
    // Kennungen wie im Bestand (E0: Abschnitt `werte`, Überschrift `werte-heading`)
    <Abschnitt
      id="werte"
      titelId="werte-heading"
      formel="tun"
      leitachse
      spaet
      flaeche="fliese"
      mitte
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
    >
      <div className="text-left">
        {/* belegte Fakten (Kammer, Abdichtung nach Norm): groß, an der Fuge nebeneinander */}
        <ul className="grid grid-cols-1 gap-px border-y border-fuge bg-fuge md:grid-cols-2">
          {belegt.map((w) => (
            <li key={w.name} className="bg-fliese py-6 md:p-8">
              <h3 className="font-anzeige text-fs-5 font-extrabold text-tinte">{zusammen(w.name)}</h3>
              <p className="mt-2 max-w-mass font-text text-fs-3 text-pretty text-tinte">
                <Textmarken text={w.satz} />
              </p>
            </li>
          ))}
        </ul>
        {/* übrige Werte als Zeilen: Name und Satz, je Zeile eine Fuge */}
        <ul className="border-b border-fuge">
          {uebrige.map((w) => (
            <li key={w.name} className="grid gap-2 border-b border-fuge py-4 last:border-b-0 md:grid-cols-3 md:gap-8 md:px-8 md:py-6">
              <h3 className="font-text text-fs-3 font-semibold text-tinte">{zusammen(w.name)}</h3>
              <p className="max-w-mass font-text text-fs-3 text-pretty text-tinte-2 md:col-span-2">
                <Textmarken text={w.satz} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Abschnitt>
  );
}
