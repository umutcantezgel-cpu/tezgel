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
// UM-E4-SICHT-FIX-2 M2-C3 Nr. 2 (Sicht E4 Anlauf 2: Hierarchiebruch, zwei Werte groß, vier als Tabellenzeilen): alle sechs Werte
// gleich gebaut, je Wert eine Zeile an der Fuge: Zeichen links (dekorativ, aus den Daten), Name in fs-4 halbfett, Satz in fs-3.
// Die belegten Fakten tragen nur einen kleinen Hinweis „belegt“ (Mikrotext, mit Haken in fs-2), keine zweite Hierarchie. Satzspiegel v2
// (K-003 „Fläche“): sechs Einträge stehen voll breit in zwei Spalten (`satzSpalten`), zwei Spalten derselben Liste sind ein Strang.
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt, { satzSpalten } from '@/components/kern/Abschnitt';
import Textmarken from '@/components/kern/Textmarken';
import { zusammen } from '@/components/kern/zusammen';
import type { IconName } from '@/components/icons/Icon';
import type { Markentext } from '@/components/vorlagen/inhalt';
import { GARANTIE } from '@/components/vorlagen/teile/Versprechen';

export interface Wert {
  name: string;
  satz: Markentext;
  zeichen: IconName;
  /** belegter Fakt aus dem Faktenblatt (Vertrauensliste mit HWK und DIN): kleiner Hinweis „belegt“ an der Zeile (M2-C3 Nr. 2) */
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
  const spalten = satzSpalten(inhalt.werte.length);
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
      satz="breit"
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
    >
      {/* eine Zeile je Wert an der Fuge, voll breit in zwei Spalten (Hülle mit Container-Abfrage für satzSpalten) */}
      <div className="@container text-left">
        <ul className={clsx(spalten.liste, 'border-t border-fuge')}>
          {inhalt.werte.map((w, i) => (
            <li key={w.name} className={clsx('flex gap-4 border-b border-fuge py-6 lg:gap-6', i === inhalt.werte.length - 1 && spalten.letzte)}>
              <Icon name={w.zeichen} groesse={6} className="mt-1 shrink-0 text-tinte-2" />
              <div className="min-w-0">
                <h3 className="font-text text-fs-4 font-semibold text-pretty text-tinte">{zusammen(w.name)}</h3>
                <p className="mt-2 max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
                  <Textmarken text={w.satz} />
                </p>
                {/* Hinweis sichtbar in fs-2 halbfett mit Haken (Nacharbeit: in Mono fs-1 grau fiel er kaum auf); Wortlaut laut Plan,
                    genauere Fassung als Textvorschlag T-C-2 */}
                {w.belegt && (
                  <p className="mt-3 flex items-center gap-2 font-text text-fs-2 font-semibold text-tinte">
                    <Icon name="haken" groesse={4} className="shrink-0" />
                    belegt
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Abschnitt>
  );
}
