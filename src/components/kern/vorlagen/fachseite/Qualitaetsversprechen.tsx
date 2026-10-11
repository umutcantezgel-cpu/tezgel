// Qualitätsversprechen (P4-01): Kern-Fassung des gemeinsamen Bestandsabschnitts `src/components/sections/QualityPromise.jsx`,
// der auf 53 Bestandsseiten steht (fast alle Fachseiten). Wie `start/Abschluss` für `FinalCTA`: Der Wortlaut ist der des
// gemeinsamen Bausteins (Standardwerte unten, wörtlich), kein Seitentext; die acht Punkte kommen aus
// `COMPANY_DATA.qualityPromises` (Single Source), Telefon aus `COMPANY_DATA.contact`.
// Struktur (K-003 „Fuge statt Karte“, S-04/S-11): statt acht Glas-Karten mit Icon-Kachel und Hover-Heben ein Feldraster aus
// acht Fugenfeldern (4 je Reihe ab lg, 2 ab md, mobil 1) – Etikett „Punkt 01“ in Mono, Titel, Text, Fußzeile mit Haken;
// darunter eine Zeile mit dem Schlusssatz links und den Knöpfen rechts (Hauptknopf zuerst, K-011). Lucide-Icons entfallen.
// Server-Komponente, kein Auftritt.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { Etikett, Feldraster, Rasterfeld, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { type AbschnittRahmenProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import Knopfreihe from '@/components/kern/vorlagen/fachseite/Knopfreihe';
import { Trenner } from '@/components/kern/vorlagen/fachseite/Mass';
import { UMBRUCH, feldFlaeche } from '@/components/kern/vorlagen/fachseite/typen';

export type QualitaetsversprechenProps = AbschnittRahmenProps & {
  /** ID der H2 (Bestand: „quality-promise-heading“) */
  titelId?: string;
};

type Versprechen = { title: string; description: string };

export default function Qualitaetsversprechen({ titelId = 'quality-promise-heading', flaeche = 'kalk', dichte = 'weit', ...rahmen }: QualitaetsversprechenProps) {
  const { authority, contact, owner } = COMPANY_DATA;
  const punkte: readonly Versprechen[] = COMPANY_DATA.qualityPromises;
  const feld = feldFlaeche(flaeche);
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
      <Feldraster als="ul">
        {punkte.map((p, i) => (
          <Rasterfeld key={p.title} als="li" breite={{ mobil: 4, tablett: 4, desktop: 3 }} flaeche={feld} className="flex flex-col">
            <Etikett>Punkt {String(i + 1).padStart(2, '0')}</Etikett>
            <p className={verbinde('mt-k-3 k-anzeige text-k-4 text-k-tinte', UMBRUCH)}>{p.title}</p>
            <p className={verbinde('mt-k-3 k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{p.description}</p>
            <div className="mt-auto pt-k-5">
              <p className="flex items-center gap-k-2 border-t border-k-fuge pt-k-3 k-mono text-k-1 text-k-tinte">
                <span aria-hidden="true" className="flex shrink-0">
                  <Icon name="haken" groesse={16} />
                </span>
                <span>Garantierter Standard</span>
              </p>
            </div>
          </Rasterfeld>
        ))}
      </Feldraster>

      <div className="mt-k-7 flex flex-col gap-k-5 border-t border-k-strich pt-k-6 lg:flex-row lg:items-center lg:justify-between lg:gap-k-7">
        <div className="min-w-0 max-w-(--k-mass)">
          <p className={verbinde('k-anzeige text-k-5 text-k-tinte', UMBRUCH)}>Überzeugen Sie sich selbst von unserer Fachqualität</p>
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
