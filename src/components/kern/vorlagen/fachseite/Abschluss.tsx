// Abschluss der Fachseite (P4-01, KERN v1.2 K-011): der seitenbezogene Schlussaufruf des Bestands
// („Neues Bad oder neue Dusche geplant?“, „Schicken Sie uns Fotos Ihres Balkons“, „Fotos per WhatsApp senden“) –
// zentrierte Kachel mit Verlauf im Bestand, im Kern ein Feldraster auf Kalk: links Etikett, H2, Text, Punkte und
// Hinweiszeile (Sp. 1–7), rechts die Knöpfe untereinander (Sp. 8–12, Hauptknopf zuerst). Links bündig, nicht zentriert.
// Bewusst hell: Der gemeinsame Schlussabschnitt `FinalCTA` des Bestands hat im Kern seine eigene Fassung auf Tinte
// (`@/components/kern/start/Abschluss`); Seiten mit FinalCTA setzen jene ein, nicht diese.
// `davor`: Block vor dem Feldraster im selben Abschnitt (Bestand Balkonsanierung: „Was wir übernehmen – und was nicht“);
// `children`: Blöcke danach (Bestand: Ratgeber-Navigation im selben Abschnitt). `hauptaktion`: WhatsApp-Kanal weicht aus.
import { useId, type ReactNode } from 'react';
import { Etikett, Feldraster, Rasterfeld, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import Abschnitt, { type AbschnittRahmenProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import Knopfreihe from '@/components/kern/vorlagen/fachseite/Knopfreihe';
import { Punkte } from '@/components/kern/vorlagen/fachseite/Punkte';
import { UMBRUCH, istText, type KnopfAngabe } from '@/components/kern/vorlagen/fachseite/typen';

export type AbschlussProps = AbschnittRahmenProps & {
  etikett?: ReactNode;
  titel: ReactNode;
  titelId?: string;
  text?: ReactNode;
  /** Aufzählung im Feld (Bestand Reparatur: „Hilfreich sind: …“) */
  punkte?: readonly ReactNode[];
  /** Zeile mit Zeichen unter dem Text (Bestand Reparatur: Erreichbarkeit mit Uhr) */
  hinweis?: ReactNode;
  hinweisZeichen?: IconName;
  knoepfe: readonly KnopfAngabe[];
  davor?: ReactNode;
  children?: ReactNode;
};

export default function Abschluss({
  etikett,
  titel,
  titelId,
  text,
  punkte = [],
  hinweis,
  hinweisZeichen = 'uhr',
  knoepfe,
  davor,
  children,
  dichte = 'normal',
  hauptaktion = true,
  ...rahmen
}: AbschlussProps) {
  const eigeneId = `k-abschluss${useId()}`;
  const tid = titelId ?? eigeneId;
  return (
    <Abschnitt dichte={dichte} hauptaktion={hauptaktion} {...rahmen}>
      {davor ? <div className="mb-k-8">{davor}</div> : null}
      <section aria-labelledby={tid}>
        <Feldraster>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 7 }} innen="keiner" flaeche="fliese" className="flex flex-col p-k-5 lg:p-k-7">
            {etikett ? (
              <Etikett rahmen ton="tinte" className="self-start">
                {etikett}
              </Etikett>
            ) : null}
            <h2 id={tid} className={verbinde('k-anzeige text-k-6 text-k-tinte', etikett ? 'mt-k-5' : undefined, UMBRUCH)}>
              {titel}
            </h2>
            {text ? (
              <div className={verbinde('mt-k-5 flex max-w-(--k-mass) flex-col gap-k-3 k-text text-k-3 text-k-tinte-2', UMBRUCH)}>
                {istText(text) ? <p>{text}</p> : text}
              </div>
            ) : null}
            {punkte.length ? <Punkte punkte={punkte} spalten={2} groesse="klein" className="mt-k-5" /> : null}
            {hinweis ? (
              <p className="mt-k-5 flex items-start gap-k-2 k-text text-k-2 text-k-tinte-2">
                <span aria-hidden="true" className="flex h-lh shrink-0 items-center text-k-tinte">
                  <Icon name={hinweisZeichen} groesse={16} />
                </span>
                <span className={UMBRUCH}>{hinweis}</span>
              </p>
            ) : null}
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 5 }} innen="keiner" className="flex flex-col justify-center p-k-5 lg:p-k-7">
            <Knopfreihe knoepfe={knoepfe} anordnung="spalte" groesse="gross" />
          </Rasterfeld>
        </Feldraster>
      </section>
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
