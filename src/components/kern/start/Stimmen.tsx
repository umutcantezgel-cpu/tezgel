// Startseite · Kundenstimmen (P3-12, KERN v1.2): „Was unsere Kunden in Mittelhessen sagen“ mit Bewertungs-Karussell (F-19).
// Struktur: Kopf mit Überschrift links und zwei Bewertungsfeldern rechts (Mono-Werte), darunter eine Reihe aus Fugenfeldern
// (Scroll-Snap, ohne JS lesbar), die Bedienung ergänzt `Karussell` (Client). Je Stimme: Thema als Etikett, großes
// wörtliches Zitat in Archivo mit genau einem Anriss (`data-motion="anriss" data-ausloeser="sicht"`, IO 50 %),
// Name und Quelle in Mono; eine Randnotiz nur als Verweis auf einen bestehenden Schritttitel (K-012).
// Der Anriss ist der einzige Auftritt mit Gewicht im Abschnitt. Sterne nur mit Textwert daneben, keine Sternenflut.
// Inhalt wörtlich aus dem Bestand (Abschnitt „7. SOCIAL PROOF“, `ReviewCarousel`, `ReviewCard`), Daten aus `@/config/reviews`.
import { processSteps } from '@/config/company';
import { RATING_SUMMARY, REVIEWS } from '@/config/reviews';
import { Etikett, Knopf, Textlink } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Karussell from '@/components/kern/start/vertrauen/Karussell';
import Sterne from '@/components/kern/start/vertrauen/Sterne';
import { ANRISS, RANDNOTIZ } from '@/components/kern/start/vertrauen/stimmen-daten';

type Stimme = { id: string; author: string; rating: number; source: string; topic?: string; text: string };

/** Zitat mit Anriss unter dem Schlüsselwort; der Text bleibt vollständig und unverändert. */
function Zitat({ text, wort }: { text: string; wort?: string }) {
  const stelle = wort ? text.indexOf(wort) : -1;
  if (!wort || stelle < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, stelle)}
      <span data-motion="anriss" data-ausloeser="sicht" data-schwelle="0.5" className="whitespace-nowrap">
        {wort}
      </span>
      {text.slice(stelle + wort.length)}
    </>
  );
}

/** Randnotiz: Verweis auf einen Ablaufschritt mit dessen Wortlaut („01 Planung & Aufmaß vor Ort“). */
function Randnotiz({ schritt }: { schritt: string }) {
  const treffer = processSteps.find((s) => s.step === schritt);
  if (!treffer) return null;
  return (
    <p className="mt-k-4 k-mono text-k-1">
      <Textlink href="#ablauf" className="inline-flex items-center gap-k-1">
        <Icon name="pfeil" groesse={16} />
        <span>
          {treffer.step} {treffer.title}
        </span>
      </Textlink>
    </p>
  );
}

function Stimmenkarte({ stimme }: { stimme: Stimme }) {
  const max = RATING_SUMMARY.google.maxRating;
  const notiz = RANDNOTIZ[stimme.id];
  return (
    <li data-karte className="flex w-5/6 shrink-0 snap-start border-y border-r border-k-fuge bg-k-fliese md:w-1/2 lg:w-1/3">
      <figure className="flex w-full flex-col p-k-5 lg:p-k-6">
        {stimme.topic ? <Etikett>{stimme.topic}</Etikett> : null}
        <blockquote className="mt-k-4 mb-k-5 k-anzeige text-k-4 text-k-tinte">
          <p>
            <span aria-hidden="true">„</span>
            <Zitat text={stimme.text} wort={ANRISS[stimme.id]} />
            <span aria-hidden="true">“</span>
          </p>
        </blockquote>
        {notiz ? <Randnotiz schritt={notiz} /> : null}
        <figcaption className="mt-auto flex flex-wrap items-center gap-x-k-4 gap-y-k-1 border-t border-k-fuge pt-k-4 k-mono text-k-1 text-k-tinte-2">
          {/* Kein Haken „Verifizierter Kunde“: nicht belegt, Quelle ist Google (MIKROTEXTE Kl. 4, P3-16-GEG H-1) */}
          {/* Eigenes Element: Der Name bleibt eine eigene Texteinheit (Text-Invarianten), auch ohne Zeichen daneben */}
          <div className="text-k-tinte">{stimme.author}</div>
          <span>{stimme.source} Rezension</span>
          <span className="inline-flex items-center gap-k-1">
            <span aria-hidden="true" className="flex text-k-tinte">
              <Icon name="stern-voll" groesse={16} />
            </span>
            {stimme.rating} / {max}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export default function Stimmen() {
  const { google, trustlocal } = RATING_SUMMARY;
  const stimmen: readonly Stimme[] = REVIEWS;
  return (
    <section aria-labelledby="bewertungen-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="grid grid-cols-1 gap-k-6 lg:grid-cols-12 lg:items-end lg:gap-0">
          <div className="lg:col-span-7 lg:pr-k-7">
            <Etikett kreuz>Echte Kundenstimmen</Etikett>
            <h2 id="bewertungen-heading" className="mt-k-4 k-anzeige text-k-6 text-k-tinte">
              Was unsere Kunden in Mittelhessen sagen
            </h2>
          </div>
          <ul className="grid grid-cols-2 border-t border-l border-k-fuge lg:col-span-5">
            <li className="flex flex-col gap-k-1 border-r border-b border-k-fuge p-k-4">
              <span className="flex flex-wrap items-center gap-k-2">
                <Sterne wert={google.rating} max={google.maxRating} />
                <span className="k-mono text-k-4 text-k-tinte">
                  {google.displayRating} / {google.maxRating}
                </span>
              </span>
              <span className="k-text text-k-2 text-k-tinte-2">
                <span className="k-mono">{google.count}</span> {google.label}
              </span>
            </li>
            <li className="flex flex-col gap-k-1 border-r border-b border-k-fuge p-k-4">
              <span className="k-mono text-k-4 text-k-tinte">{trustlocal.displayRating}</span>
              <span className="k-text text-k-2 text-k-tinte-2">
                <span className="k-mono">{trustlocal.count}</span> {trustlocal.label}
              </span>
            </li>
          </ul>
        </div>

        <Karussell className="mt-k-8" titel="Echte Kundenstimmen aus Mittelhessen" anzahl={stimmen.length}>
          <ul className="flex border-l border-k-fuge">
            {stimmen.map((stimme) => (
              <Stimmenkarte key={stimme.id} stimme={stimme} />
            ))}
          </ul>
        </Karussell>

        <div className="mt-k-7">
          <Knopf art="neben" href="/referenzen" hinten={<Icon name="pfeil" groesse={20} />}>
            Alle Kundenbewertungen ansehen
          </Knopf>
        </div>
      </div>
    </section>
  );
}
