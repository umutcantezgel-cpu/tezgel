// Notiz (P4-01, K-006, K-011): sachlicher Hinweis im Abschnitt – Bestand: „Zusammenspiel mit der Installation: …“,
// „Was wir übernehmen – und was nicht: …“, „Ausnahmen kennen: …“, „„Granit“ im Handel …“ (Kästen in Orange- oder
// Bernstein-Tönung mit Info- oder Warnzeichen). Im Kern der Grundbaustein `Hinweis` (Art info: Rahmen Strich,
// Hinweis-Zeichen, Fläche Fliese; statisch, keine Ansage), im Maß. Bedeutung trägt der Text, nicht die Tönung (K-006).
// Der Wortlaut bleibt ein Absatz: Der fette Einstieg des Bestands steht als <strong> im selben Satz (keine neue Texteinheit).
// `titel`: Überschrift im Kasten, wo der Bestand eine trägt (Granit: H3).
import type { ReactNode } from 'react';
import { Hinweis, verbinde } from '@/components/kern/basis';
import { UMBRUCH, istText } from '@/components/kern/vorlagen/fachseite/typen';

export type NotizProps = {
  children: ReactNode;
  titel?: ReactNode;
  ebene?: 'h3' | 'h4';
  className?: string;
};

export default function Notiz({ children, titel, ebene: Titel = 'h3', className }: NotizProps) {
  return (
    <Hinweis ankuendigen={false} className={verbinde('max-w-(--k-mass)', className)}>
      <div className={verbinde('flex flex-col gap-k-3 text-k-tinte', UMBRUCH)}>
        {titel ? <Titel className="k-text text-k-3 font-semibold text-k-tinte">{titel}</Titel> : null}
        {istText(children) ? <p>{children}</p> : children}
      </div>
    </Hinweis>
  );
}
