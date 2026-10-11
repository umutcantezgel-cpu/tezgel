// Fragen der Fachseite (P4-01, KERN v1.2 K-011, Register `aufklappen`): FAQ mit dem Grundbaustein `Akkordeon`
// (<details>/<summary>: ohne JavaScript bedienbar, Antworten im Server-HTML, Seitensuche öffnet sie).
// Struktur wie „Fragen“ auf `/` (Kopf seitlich Sp. 1–5, Fragen Sp. 6–12), Kopf oben wählbar.
// Zustände aus `AkkordeonEintrag`: zu (Plus), offen (Minus), Hover (Unterstreichung, feiner Zeiger), Fokus 2 px am summary;
// `offen` je Frage = beim Laden offen. `ebene`: Frage als Überschrift, wo der Bestand eine trägt (Förderung: H3).
// FAQ-JSON-LD bleibt Sache der Seite (Wortlaut dort gleich halten). Kein Anruf-Hinweis je Antwort: Er gehört zu
// `FAQAccordion` (Bestand), das die Fachseiten dieser Vorlage nicht nutzen – siehe Rückgabe P4-01, OFFENE FRAGEN.
// Server-Komponente; nur `AkkordeonEintrag` ist eine Client-Insel.
import type { ReactNode } from 'react';
import { Akkordeon, AkkordeonEintrag, verbinde } from '@/components/kern/basis';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { UMBRUCH, istText, type KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type Frage = {
  frage: ReactNode;
  antwort: ReactNode;
  /** beim Laden offen */
  offen?: boolean;
  id?: string;
};

export type FragenProps = AbschnittProps & {
  fragen: readonly Frage[];
  ebene?: 'h3' | 'h4';
  /** Knöpfe unter den Fragen (Bestand Förderung: Telefon, „Weitere Fragen & Antworten“) */
  aktionen?: readonly KnopfAngabe[];
};

export default function Fragen({ fragen, ebene, aktionen = [], kopfLage = 'seitlich', children, ...abschnitt }: FragenProps) {
  if (fragen.length === 0) return null;
  return (
    <Abschnitt kopfLage={kopfLage} {...abschnitt}>
      <Akkordeon>
        {fragen.map((f, i) => (
          <AkkordeonEintrag key={i} id={f.id} titel={f.frage} offen={f.offen} ebene={ebene}>
            <div className={verbinde('flex flex-col gap-k-3 text-k-tinte-2', UMBRUCH)}>{istText(f.antwort) ? <p>{f.antwort}</p> : f.antwort}</div>
          </AkkordeonEintrag>
        ))}
      </Akkordeon>
      <Knopfreihe knoepfe={aktionen} className="mt-k-6" />
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
