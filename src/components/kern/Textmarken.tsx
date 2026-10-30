// Textmarken (KERN v3 K-011): setzt einen Text mit Auszeichnungen aus den Seitentexten (`[[id|Wort]]`) als Fließtext mit
// dem Baustein `Fachwort` (dfn und Erklärung in Klammern). Zerlegung und Prüfung der Kennungen in `src/lib/textmarken.ts`.
// Die Texte zeichnen nur das erste Vorkommen eines Fachworts je Seite aus (Schreibregel der Texter); spätere Vorkommen
// stehen ohne Marke und bleiben einfacher Text. Mit `fugen` trennen die Wörter aus FUGEN (zusammen.tsx) im einfachen Text nur
// an ihrer Fuge („Bad-sanierung“ statt „Badsa-nierung“, UM-E4-INHALT Teil B, FS-K Nr. 10), seit UM-E4-START (FS-K Nr. 6) auch
// im Fachwort („Verbund-abdichtung“). Der Wortlaut bleibt Zeichen für Zeichen gleich, es kommt nur eine weiche Trennstelle
// hinzu; die Glossarprüfung (lesbarkeit.mjs) findet den Begriff weiter in dfn[data-glossar]. Serverkomponente.
import Fachwort from './Fachwort';
import { mitFugen } from './zusammen';
import { zerlege } from '@/lib/textmarken';
import { Fragment } from 'react';

export default function Textmarken({ text, fugen = false }: { text: string; fugen?: boolean }) {
  return (
    <>
      {zerlege(text).map((s, i) =>
        s.art === 'text' ? <Fragment key={i}>{fugen ? mitFugen(s.text) : s.text}</Fragment> : <Fachwort key={i} id={s.id}>{fugen && s.wort ? mitFugen(s.wort) : s.wort}</Fachwort>,
      )}
    </>
  );
}
