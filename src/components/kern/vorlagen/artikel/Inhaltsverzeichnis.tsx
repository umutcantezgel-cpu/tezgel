// Inhaltsverzeichnis (P4-02, KERN v1.2, F-16 „Inhaltsverzeichnis-Sprung“): Sprunglinks auf die Zwischenüberschriften.
// Name und Rolle wie im Bestand (`TableOfContents.jsx`): <nav aria-label="Inhaltsverzeichnis">, Kopf „Inhalt“, je
// Überschrift ein Link `#id`; der aktuelle Abschnitt trägt aria-current="location".
// Nur Darstellung: Einträge (aus dem Markdown abgeleitet) und der aktive Eintrag kommen von außen. Im Bestand stecken die
// Ableitung der Einträge (Zeilen mit ## / ###, Kennung aus dem Text) und der IntersectionObserver im Baustein; beides
// braucht einen gemeinsamen Hook bzw. Helfer (OFFENE FRAGE, G9). Ohne JavaScript springt der native Anker; der Abstand
// unter dem festen Kopf kommt aus `scroll-padding-top` (kern-global.css).
// Darstellung: Fuge links als Lineal; aktiv = Linie Tinte 2 px + kräftiger Text (nicht nur Farbe); Ebene 3 eingerückt.
// Zustände: Ruhe, Hover (feiner Zeiger: Unterstreichung), :active, Fokus 2 px Tinte am Link, aktiv.
import type { ReactNode } from 'react';
import { fokus, verbinde } from '@/components/kern/basis';

export type Verzeichniseintrag = { id: string; text: ReactNode; ebene: 2 | 3 };

export type InhaltsverzeichnisProps = {
  eintraege: Verzeichniseintrag[];
  /** Kopf über der Liste (Bestand: „Inhalt“) */
  kopf: ReactNode;
  /** zugänglicher Name der Navigation (Bestand: „Inhaltsverzeichnis“) */
  name: string;
  aktiv?: string;
  className?: string;
};

export default function Inhaltsverzeichnis({ eintraege, kopf, name, aktiv, className }: InhaltsverzeichnisProps) {
  if (eintraege.length === 0) return null;
  return (
    <div className={verbinde('flex flex-col gap-k-3', className)}>
      <p className="k-mono text-k-1 text-k-tinte-2">{kopf}</p>
      <nav aria-label={name}>
        <ul className="border-l border-k-fuge">
          {eintraege.map((e) => {
            const istAktiv = e.id === aktiv;
            return (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  aria-current={istAktiv ? 'location' : undefined}
                  data-motion="zustand"
                  className={verbinde(
                    '-ml-px flex min-h-k-7 items-center border-l-2 py-k-2 k-text text-k-2 wrap-break-word hyphens-auto',
                    'decoration-1 underline-offset-4 decoration-k-strich pointer-fine:hover:underline active:underline',
                    e.ebene === 3 ? 'pl-k-6' : 'pl-k-4',
                    istAktiv ? 'border-k-tinte font-semibold text-k-tinte' : 'border-transparent text-k-tinte-2 pointer-fine:hover:text-k-tinte',
                    fokus(),
                  )}
                >
                  {e.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
