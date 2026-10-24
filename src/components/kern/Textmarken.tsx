// Textmarken (KERN v3 K-011): setzt einen Text mit Auszeichnungen aus den Seitentexten (`[[id|Wort]]`) als Fließtext mit
// dem Baustein `Fachwort` (dfn und Erklärung in Klammern). Zerlegung und Prüfung der Kennungen in `src/lib/textmarken.ts`.
// Die Texte zeichnen nur das erste Vorkommen eines Fachworts je Seite aus (Schreibregel der Texter); spätere Vorkommen
// stehen ohne Marke und bleiben einfacher Text. Serverkomponente.
import Fachwort from './Fachwort';
import { zerlege } from '@/lib/textmarken';

export default function Textmarken({ text }: { text: string }) {
  return (
    <>
      {zerlege(text).map((s, i) => (s.art === 'text' ? s.text : <Fachwort key={i} id={s.id}>{s.wort}</Fachwort>))}
    </>
  );
}
