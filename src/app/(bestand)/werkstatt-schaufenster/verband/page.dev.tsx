// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „verband“ (E3-GRAF-06) im Schlitz seiner Vorlage,
// bevor /fliesen umgestellt ist: Wissensblock wie später auf /fliesen (E3-BAU-05; Prüfstufe A, E-045).
import Einstieg from '@/components/kern/Einstieg';
import Leitachse from '@/components/kern/Leitachse';
import { Block } from '@/components/vorlagen/teile/Wissen';
import VerbandProbe from '@/components/momente/verband/VerbandProbe';

export const metadata = { title: 'Schaufenster · verband', robots: { index: false, follow: false } };

export default function SchaufensterVerband() {
  return (
    <>
      <Einstieg art="arbeit" etikett="Schaufenster · nur Entwicklung" titel="Großer Moment „verband“" />
      <Leitachse>
        <Block
          nummer={1}
          block={{
            titel: 'Alles beginnt mit dem Boden.',
            absatz:
              'Zuerst prüfen wir den [[untergrund|Untergrund]]. Ist er eben und trocken genug, verlegen wir die Fliesen sauber, mit passenden Fugen und Übergängen. Wie die Fliesen angeordnet sind, bestimmt, wie eine Fläche wirkt. Hier sind vier Muster zum Ausprobieren.',
            zeichnung: 'verband',
          }}
          zeichnung={<VerbandProbe />}
        />
      </Leitachse>
    </>
  );
}
