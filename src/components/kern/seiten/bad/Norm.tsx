// Satz mit Normangaben (P4-08a, K-003 „Maß statt Behauptung“, K-005): „DIN 18534“, „DIN 18040-2“ stehen in Mono und
// brechen nicht (Wortlücke schmal, wie die Auflage 4 im Einstieg von `/`). Der Text bleibt wörtlich: Die Teile werden nur
// in Spans gelegt, Leerzeichen bleiben in den Textstücken davor und danach.
import { NORM } from '@/components/kern/seiten/bad/daten';

export default function MitNorm({ text }: { text: string }) {
  const teile = text.split(NORM);
  return (
    <>
      {teile.map((teil, i) =>
        i % 2 === 1 ? (
          <span key={i} className="k-mono whitespace-nowrap">
            {teil}
          </span>
        ) : (
          teil
        ),
      )}
    </>
  );
}
