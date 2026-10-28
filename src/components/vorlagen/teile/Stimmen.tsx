// Vorlagen · Kundenstimmen (KERN v3 K-003 Nr. 4, G8; E-025, E-044; K-016 „Ruhe“, E-047): Stimmen wörtlich aus REVIEWS als
// langsames Karussell mit gleich großen Karten, groß (Über uns, Unsere Arbeiten) oder klein (jede andere Seite) (vorher eine große und kleinere Stimmen in verschiedenen Größen, das wirkte
// unruhig, E-047). Die Reihe rückt alle acht Sekunden um eine Karte, hält bei Maus und Fokus an und hat Knöpfe; darunter
// die Kennzeile mit Stand. Eine einzelne Stimme steht groß ohne Karussell; dort kann die Laserlinie die Worte unterstreichen,
// auf die es der Kundschaft ankommt (Wortlaut unverändert). Fehlt eine Kennung in REVIEWS, bricht der Bau ab.
// Form „einzeln“ (Startseite, UM-E3-FIX F4): eine große Stimme je Schritt statt drei gleicher Karten nebeneinander (eine
// Fliese, ein Gedanke); ab 36rem Breite Sterne und Name im ersten Drittel, der Wortlaut in den zwei Dritteln dahinter an der
// Fuge (Versatz um ein Drittel der Spaltenbreite, K-005). So folgen auf die Fotoreihe keine zweiten drei gleichen Karten.
// Ist eine gezeigte Google-Stimme gekürzt (endet wie bei Google mit „…“), führt einmal unter den Stimmen an der Kennzeile ein
// Link zu allen Bewertungen beim Anbieter, dort steht der ganze Text (UM-E3-FIX F10); der Wortlaut bleibt unverändert (G8).
// Serverkomponente, das Karussell ist eine Insel.
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Karussell from '@/components/kern/Karussell';
import { RATING_SUMMARY, REVIEWS } from '@/config/reviews';
import { linkKlassen } from '@/components/kern/stile';
import { umbruchNachSatzzeichen } from '@/components/kern/zusammen';

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

/** gekürzter Wortlaut (REVIEWS kürzt dort, wo Google den Text abschneidet, mit „…“) */
const gekuerzt = (s: Bewertung) => s.text.trimEnd().endsWith('…');

/** Weg zum ganzen Wortlaut beim Anbieter (UM-E3-FIX F10): einmal unter den Stimmen, nur wenn eine gezeigte Google-Stimme
 *  gekürzt ist. Google hat keine feste Adresse je Rezension, der Link führt zu allen Bewertungen des Betriebs und sagt das
 *  (vorher „Ganze Bewertung bei Google“ in jeder Karte: Der Name versprach die einzelne Rezension, alle Links hatten dasselbe
 *  Ziel, auf /bad standen vier gleiche nebeneinander, und in der Karte stand der Link hinter der figcaption, gegen das
 *  Inhaltsmodell von figure; Prüfung Teil B). Fließtext: Bricht der Link um, bleibt das Zeichen für „extern“ am letzten Wort;
 *  Trefffläche mit dem Innenabstand über 44 px hoch. */
function AlleBewertungen({ stimmen, className }: { stimmen: Bewertung[]; className?: string }) {
  if (!stimmen.some((s) => s.source === 'Google' && gekuerzt(s))) return null;
  return (
    <p className={className}>
      <a
        href={RATING_SUMMARY.google.url}
        target="_blank"
        rel="noopener noreferrer"
        data-motion="zustand"
        className={clsx(linkKlassen, 'inline-block py-3 font-text text-fs-2 font-semibold')}
      >
        Alle Bewertungen bei Google{' '}
        <span className="whitespace-nowrap">
          lesen
          <Icon name="link-extern" groesse={4} className="ml-2 align-middle text-tinte-2" />
        </span>
        <span className="sr-only">, öffnet in neuem Tab</span>
      </a>
    </p>
  );
}

function Sterne({ s, groesse }: { s: Bewertung; groesse: 4 | 5 }) {
  return (
    <span aria-hidden="true" className="flex gap-1 text-tinte">
      {Array.from({ length: s.rating }, (_, i) => (
        <Icon key={i} name="stern-voll" groesse={groesse} />
      ))}
    </span>
  );
}

/** Eine Stimme: Sterne nur als Bild (der Name nennt die Bewertung), Wortlaut unverändert aus REVIEWS. `klein`: Karte im kleinen
 *  Karussell, Wortlaut eine Stufe kleiner. */
export function Stimme({ s, gross, klein = false }: { s: Bewertung; gross: boolean; klein?: boolean }) {
  return (
    <figure className="flex h-full flex-col">
      <Sterne s={s} groesse={gross ? 5 : 4} />
      {/* wrap-break-word: der Wortlaut enthält Stellen ohne Leerzeichen („empfehlen.Handwerklich“), die bei großer
          Systemschrift sonst über den Rand laufen; lange Wörter trennt der Browser mit Strich (globals.css, E-065) */}
      <blockquote className={clsx('mt-4 min-w-0 font-text text-pretty wrap-break-word text-tinte', gross ? 'text-fs-4 font-semibold lg:text-fs-5' : klein ? 'text-fs-2' : 'text-fs-3')}>
        <p>{gross ? markiert(s.text, MARKIERUNG[s.id]) : umbruchNachSatzzeichen(s.text)}</p>
      </blockquote>
      <figcaption className="mt-6 font-text text-fs-2 text-tinte-2">
        <span className="font-semibold text-tinte">{s.author}</span> bei {s.source}
        <span className="sr-only">, {s.rating} von 5 Sternen</span>
      </figcaption>
    </figure>
  );
}

/** Eine große Stimme je Schritt (Form „einzeln“): schmal Sterne und Name über dem Wortlaut, ab 36rem Breite der Stimme links
 *  im ersten Drittel an der Fuge, der Wortlaut in den zwei Dritteln dahinter. Sterne und Name stehen vorn, im Bild wie für den
 *  Vorleser. Die Breite misst als Container in rem (wächst mit großer Systemschrift): Das Drittel fasst die fünf Sterne samt
 *  Innenabstand ab knapp 34rem (Sterne 7,25rem, Innenabstand zweimal 2rem); vorher teilte md nach der Bildschirmbreite, bei 200 % ragte der fünfte
 *  Stern auf t768 bis t1024 über die Fuge in den Wortlaut (Prüfung Teil B). */
function EinzelStimme({ s }: { s: Bewertung }) {
  return (
    <div className="@container h-full">
      <figure className="grid h-full grid-cols-1 border border-fuge bg-kalk @xl:grid-cols-3">
        <figcaption className="flex flex-col gap-4 border-b border-fuge p-6 font-text text-fs-2 text-tinte-2 @xl:border-r @xl:border-b-0 @xl:p-8 @4xl:p-12">
          <Sterne s={s} groesse={5} />
          <span>
            <span className="block font-semibold text-fs-3 text-tinte">{s.author}</span>
            bei {s.source}
            <span className="sr-only">, {s.rating} von 5 Sternen</span>
          </span>
        </figcaption>
        <div className="min-w-0 p-6 @xl:col-span-2 @xl:p-8 @4xl:p-12">
          <blockquote className="font-text text-fs-4 font-semibold text-pretty wrap-break-word text-tinte lg:text-fs-5 lg:leading-snug">
            <p>{markiert(s.text, MARKIERUNG[s.id])}</p>
          </blockquote>
        </div>
      </figure>
    </div>
  );
}

// Karussell einzeln (eine Stimme auf jeder Breite), groß (drei Karten ab lg) oder klein (vier Karten ab lg); Teiler der Breite,
// damit keine Karte angeschnitten ist
const KARTE = { einzeln: 'w-full', gross: 'w-full md:w-1/2 lg:w-1/3', klein: 'w-full sm:w-1/2 lg:w-1/4' } as const;

export default function Stimmen({ ids, form = 'gross' }: { ids: string[]; form?: keyof typeof KARTE }) {
  const stimmen = stimmenZu(ids);
  const [erste] = stimmen;
  if (!erste) return null;
  if (stimmen.length === 1) {
    // auch unter der einzelnen Stimme die Kennzeile mit Stand aus den Daten (Abnahme E3-BAU-05/11: sonst stand sie als
    // fester Text im Inhalt)
    return (
      <div className="mx-auto max-w-mass">
        <Stimme s={erste} gross />
        <Bewertungszeile stand className="mt-8 font-text text-fs-2 text-tinte-2 hyphens-none" />
        <AlleBewertungen stimmen={stimmen} className="mt-1" />
      </div>
    );
  }
  return (
    <div>
      <Karussell art="reihe" name="Kundenstimmen" selbstlauf karte={KARTE[form]}>
        {stimmen.map((s) =>
          form === 'einzeln' ? (
            <EinzelStimme key={s.id} s={s} />
          ) : (
            <div key={s.id} className={clsx('h-full border border-fuge bg-kalk p-6', form === 'gross' && 'lg:p-8')}>
              <Stimme s={s} gross={false} klein={form === 'klein'} />
            </div>
          ),
        )}
      </Karussell>
      <Bewertungszeile stand className="mt-8 text-center font-text text-fs-2 text-tinte-2 hyphens-none" />
      <AlleBewertungen stimmen={stimmen} className="mt-1 text-center" />
    </div>
  );
}
