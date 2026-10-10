import VerlegeplanBad from '@/components/kern/motive/VerlegeplanBad';
import Verband from '@/components/kern/motive/Verband';

// Vorschau P3-05 (wird nie freigeschaltet): Motive des Formsystems.
export default function VorschauMotive() {
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-8 k-text">
      <h1 className="k-anzeige text-k-6">Vorschau P3-05 · Motive</h1>
      <div className="mt-k-6 grid gap-k-6 md:grid-cols-2">
        <div className="bg-k-fliese p-k-5"><VerlegeplanBad /></div>
        <div className="bg-k-fliese p-k-5"><VerlegeplanBad achse={false} /></div>
      </div>
      <div className="mt-k-6 grid gap-px bg-k-fuge md:grid-cols-3">
        {(['kreuzfuge', 'halbverband', 'drittelverband'] as const).map((a) => (
          <div key={a} className="relative h-48 bg-k-kalk text-k-strich">
            <Verband art={a} />
            <span className="k-mono relative bg-k-kalk px-k-2 text-k-1 text-k-tinte-2">{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
