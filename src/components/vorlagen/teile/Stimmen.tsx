// Vorlagen · Kundenstimmen (KERN v3 K-003 Nr. 4, G8; E-025, E-044; K-016 „Ruhe“, E-047): Stimmen wörtlich aus REVIEWS als
// langsames Karussell mit gleich großen Karten (vorher eine große und kleinere Stimmen in verschiedenen Größen, das wirkte
// unruhig, E-047). Die Reihe rückt alle acht Sekunden um eine Karte, hält bei Maus und Fokus an und hat Knöpfe; darunter
// die Kennzeile mit Stand. Eine einzelne Stimme steht groß ohne Karussell; dort kann die Laserlinie die Worte unterstreichen,
// auf die es der Kundschaft ankommt (Wortlaut unverändert). Fehlt eine Kennung in REVIEWS, bricht der Bau ab.
// Serverkomponente, das Karussell ist eine Insel.
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Karussell from '@/components/kern/Karussell';
import { REVIEWS } from '@/config/reviews';

// Stellen im Wortlaut, die in der großen Stimme unterstrichen werden (fehlt die Stelle, bleibt die Stimme ohne Markierung)
export const MARKIERUNG: Record<string, string> = { 'c-wolf': 'ordnungsgemäß, sauber und pünktlich' };

type Bewertung = (typeof REVIEWS)[number];

function markiert(text: string, stelle?: string) {
  const i = stelle ? text.indexOf(stelle) : -1;
  if (!stelle || i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="underline decoration-laser decoration-2 underline-offset-4">{stelle}</span>
      {text.slice(i + stelle.length)}
    </>
  );
}

/** Stimmen zu Kennungen; bricht ab, wenn eine fehlt (statt sie still wegzulassen). */
export function stimmenZu(ids: string[]): Bewertung[] {
  return ids.map((id) => {
    const r = REVIEWS.find((x) => x.id === id);
    if (!r) throw new Error(`Kundenstimme ${id} fehlt in src/config/reviews.js`);
    return r;
  });
}

/** Eine Stimme: Sterne nur als Bild (der Name nennt die Bewertung), Wortlaut unverändert aus REVIEWS. */
export function Stimme({ s, gross }: { s: Bewertung; gross: boolean }) {
  return (
    <figure className="flex h-full flex-col">
      <span aria-hidden="true" className="flex gap-1 text-tinte">
        {Array.from({ length: s.rating }, (_, i) => (
          <Icon key={i} name="stern-voll" groesse={gross ? 5 : 4} />
        ))}
      </span>
      {/* wrap-break-word: der Wortlaut enthält Stellen ohne Leerzeichen („empfehlen.Handwerklich“), die bei großer
          Systemschrift sonst über den Rand laufen; keine Silbentrennung im Zitat */}
      <blockquote className={clsx('mt-4 min-w-0 font-text text-pretty wrap-break-word text-tinte hyphens-none', gross ? 'text-fs-4 font-semibold lg:text-fs-5' : 'text-fs-3')}>
        <p>{gross ? markiert(s.text, MARKIERUNG[s.id]) : s.text}</p>
      </blockquote>
      <figcaption className="mt-6 font-text text-fs-2 text-tinte-2">
        <span className="font-semibold text-tinte">{s.author}</span> bei {s.source}
        <span className="sr-only">, {s.rating} von 5 Sternen</span>
      </figcaption>
    </figure>
  );
}

export default function Stimmen({ ids }: { ids: string[] }) {
  const stimmen = stimmenZu(ids);
  const [erste] = stimmen;
  if (!erste) return null;
  if (stimmen.length === 1) {
    return (
      <div className="mx-auto max-w-mass">
        <Stimme s={erste} gross />
      </div>
    );
  }
  return (
    <div>
      <Karussell art="reihe" name="Kundenstimmen" selbstlauf karte="w-full md:w-1/2 lg:w-1/3">
        {stimmen.map((s) => (
          <div key={s.id} className="h-full border border-fuge bg-kalk p-6 lg:p-8">
            <Stimme s={s} gross={false} />
          </div>
        ))}
      </Karussell>
      <Bewertungszeile stand className="mt-8 text-center font-text text-fs-2 text-tinte-2 hyphens-none" />
    </div>
  );
}
