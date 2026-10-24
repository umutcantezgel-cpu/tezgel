// Vorlagen · Kundenstimmen (KERN v3 K-003 Nr. 4, G8; E-025): Stimmen wörtlich aus REVIEWS, gebaut wie auf der
// Startseite: ab lg eine große Stimme links (oben an der Fuge) und weitere kleinere rechts untereinander, getrennt durch
// Fugen statt Kästen; mobil untereinander. In der großen Stimme kann die Laserlinie die Worte unterstreichen, auf die es
// der Kundschaft ankommt (Wortlaut unverändert). Fehlt eine Kennung in REVIEWS, bricht der Bau ab. Serverkomponente.
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
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
      <blockquote className={clsx('mt-4 min-w-0 font-text text-pretty wrap-break-word text-tinte hyphens-none', gross ? 'text-fs-4 font-semibold' : 'text-fs-3')}>
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
  const [erste, ...weitere] = stimmenZu(ids);
  if (!erste) return null;
  if (!weitere.length) {
    return (
      <div className="max-w-mass border-t border-fuge pt-12">
        <Stimme s={erste} gross />
      </div>
    );
  }
  return (
    <div className="grid gap-12 border-t border-fuge pt-12 lg:grid-cols-12 lg:gap-x-12">
      <div className="min-w-0 lg:col-span-7">
        <Stimme s={erste} gross />
      </div>
      <ul className="flex min-w-0 flex-col gap-12 border-t border-fuge pt-12 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
        {weitere.map((s, i) => (
          <li key={s.id} className={clsx(i > 0 && 'border-t border-fuge pt-12')}>
            <Stimme s={s} gross={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}
