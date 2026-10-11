// Qualitätsversprechen (P4-01): Kern-Fassung des gemeinsamen Bestandsabschnitts `src/components/sections/QualityPromise.jsx`,
// der auf 53 Bestandsseiten steht (fast alle Fachseiten). Wie `start/Abschluss` für `FinalCTA`: Der Wortlaut ist der des
// gemeinsamen Bausteins (Standardwerte unten, wörtlich), kein Seitentext; die acht Punkte kommen aus
// `COMPANY_DATA.qualityPromises` (Single Source), Telefon aus `COMPANY_DATA.contact`.
// Struktur (K-003 „Fuge statt Karte“, S-04/S-11): statt acht Glas-Karten mit Icon-Kachel und Hover-Heben ein Feldraster aus
// acht Fugenfeldern (Fugenraster nach Behälterbreite: 1 · ab 36rem 2 · ab 72rem 4 je Reihe; P4-10a – vorher vier je Reihe ab
// 1024 px, „Großformatverlegung“ und „Verbundabdichtung“ brachen) – Etikett „Punkt 01“ in Mono, Titel (Stufe nach dem längsten
// Wort, höchstens k-4), Text, Fußzeile mit Haken;
// darunter eine Zeile mit dem Schlusssatz links und den Knöpfen rechts (Hauptknopf zuerst, K-011). Lucide-Icons entfallen.
// Server-Komponente, kein Auftritt.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { Etikett, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { type AbschnittRahmenProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import { Fugenfeld, Fugenraster } from '@/components/kern/vorlagen/teile/Fugenraster';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { Trenner } from '@/components/kern/vorlagen/teile/Mass';
import { stufeFuerAlle, stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, feldFlaeche } from '@/components/kern/vorlagen/teile/typen';

export type QualitaetsversprechenProps = AbschnittRahmenProps & {
  /** ID der H2 (Bestand: „quality-promise-heading“) */
  titelId?: string;
};

type Versprechen = { title: string; description: string };

export default function Qualitaetsversprechen({ titelId = 'quality-promise-heading', flaeche = 'kalk', dichte = 'weit', ...rahmen }: QualitaetsversprechenProps) {
  const { authority, contact, owner } = COMPANY_DATA;
  const punkte: readonly Versprechen[] = COMPANY_DATA.qualityPromises;
  const feld = feldFlaeche(flaeche);
  const titelStufe = stufeFuerAlle(punkte.map((p) => p.title), 'feld', 'text-k-4');
  // Wortlaut wörtlich aus QualityPromise.jsx (Eyebrow mit „·“, H2 ohne Verlaufsschrift, Vorspann, Punkt-Etikett, Fußzeile, Schlusszeile).
  const etikett: ReactNode = (
    <>
      <span>HWK Fachbetrieb</span>
      <Trenner />
      <span>{authority.shortName}</span>
    </>
  );
  return (
    <Abschnitt
      titelId={titelId}
      etikett={etikett}
      titel="Unser 8-Punkte-Qualitätsversprechen für Ihr Fliesenprojekt"
      einleitung="Vom Aufmaß bis zur fertigen Fuge: Wir stehen zu unseren Vereinbarungen, Preisen und Terminen – in Aßlar, Wetzlar und ganz Hessen."
      flaeche={flaeche}
      dichte={dichte}
      {...rahmen}
    >
      <Fugenraster als="ul" spalten={4}>
        {punkte.map((p, i) => (
          <Fugenfeld key={p.title} als="li" flaeche={feld} className="flex flex-col">
            <Etikett>Punkt {String(i + 1).padStart(2, '0')}</Etikett>
            <p className={verbinde('mt-k-3 k-anzeige text-k-tinte', titelStufe, UMBRUCH)}>{p.title}</p>
            <p className={verbinde('mt-k-3 k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{p.description}</p>
            <div className="mt-auto pt-k-5">
              <p className="flex items-center gap-k-2 border-t border-k-fuge pt-k-3 k-mono text-k-1 text-k-tinte">
                <span aria-hidden="true" className="flex shrink-0">
                  <Icon name="haken" groesse={16} />
                </span>
                <span>Garantierter Standard</span>
              </p>
            </div>
          </Fugenfeld>
        ))}
      </Fugenraster>

      <div className="mt-k-7 flex flex-col gap-k-5 border-t border-k-strich pt-k-6 lg:flex-row lg:items-center lg:justify-between lg:gap-k-7">
        <div className="min-w-0 max-w-(--k-mass)">
          <p className={verbinde('k-anzeige text-k-tinte', stufeNachWort('Überzeugen Sie sich selbst von unserer Fachqualität', 'abschnitt', 'text-k-5'), UMBRUCH)}>
            Überzeugen Sie sich selbst von unserer Fachqualität
          </p>
          <p className="mt-k-2 k-text text-k-2 text-k-tinte-2">
            Kostenfreies Vor-Ort-Aufmaß durch {owner.fullName} – in Aßlar, Wetzlar, Gießen und Umgebung.
          </p>
        </div>
        <Knopfreihe
          className="lg:shrink-0"
          knoepfe={[
            { text: 'Aufmaß anfragen', href: '/kontakt', art: 'haupt', zeichen: 'pfeil' },
            { text: contact.phone, href: `tel:${contact.phoneLink}`, art: 'neben', zeichen: 'telefon', mono: true },
          ]}
        />
      </div>
    </Abschnitt>
  );
}
