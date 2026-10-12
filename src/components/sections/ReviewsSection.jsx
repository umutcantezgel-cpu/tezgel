"use client";
// Bewertungen auf /referenzen (KERN v2, S-23; Muster: Startseite „Kundenstimmen“ src/components/start/Stimmen.tsx).
// Kopf zweispaltig: links Etikett mit Fugenkreuz, H2 und Einleitung, rechts Google und Trustlocal als Maß in Mono mit
// „Stand“. Darunter der Themenfilter (Insel mit Zustand: Auswahlknöpfe mit aria-pressed) und die Stimmen als Feldraster an
// der Fuge. Jede Stimme ist eine Kundenstimme (K-009): Sterne als Gruppe mit role="img" und Namen, Zitat wörtlich in der
// Grundschrift, Name und Quelle in Mono an einer Fuge. Genau ein Anriss je Ansicht: das Schlüsselwort (aus @/lib/stimmen)
// der ersten Stimme der gewählten Gruppe – sonst stünden bis zu 16 rote Striche in einem Bildschirm (K-003 Nr. 2).
// Das letzte Feld füllt seine Zeile (keine grauen Restzellen bei 16, 7, 5, 4 oder 3 Stimmen).
// Sprungziel #bewertungen (Link „Bewertungen lesen“ und /referenzen#bewertungen): kein `spaet`, kein eigener Versatz.
// Wortlaut, IDs (bewertungen, reviews-heading), Gruppenname und aria-pressed wie im Bestand.
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { REVIEWS, RATING_SUMMARY } from '@/config/reviews';
import { STIMMEN, teileAnriss } from '@/lib/stimmen';
import { beobachte } from '@/lib/motion/bewegung';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { ACHSE_LAGE } from '@/components/kern/Leitachse';
import { etikettKlassen, seitenKlassen, wahlKlassen } from '@/components/kern/stile';

// Topic groups derived from the `topic` values in config/reviews.js
// (keyword match, so new reviews are sorted in automatically).
const TOPIC_FILTERS = [
    { id: 'all', label: 'Alle Bewertungen', match: () => true },
    { id: 'bad', label: 'Bad & Badsanierung', match: (topic) => /Bad|Bäder/.test(topic) },
    { id: 'haus', label: 'Haus, Treppen & Balkon', match: (topic) => /Haus|Treppe|Boden|Küche|Balkon/.test(topic) },
    { id: 'beratung', label: 'Beratung & Service', match: (topic) => /Beratung|Service|Organisation/.test(topic) },
    { id: 'qualitaet', label: 'Qualität & Sauberkeit', match: (topic) => /Qualität|Sauberkeit|Preis/.test(topic) }
];

function Stars({ count = 5 }) {
    return (
        <span className="flex items-center gap-1 text-tinte" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
                <Icon key={i} name="stern-voll" groesse={4} />
            ))}
        </span>
    );
}

/** Letztes Feld füllt die Zeile: ab md zwei, ab lg drei Spalten (wörtliche Klassen für Tailwind) */
function restKlassen(index, anzahl) {
    if (index !== anzahl - 1) return undefined;
    const md = anzahl % 2 === 1;
    const lg = anzahl % 3;
    return clsx(md && 'md:col-span-2', lg === 1 && 'lg:col-span-3', lg === 2 && 'lg:col-span-2', lg === 0 && md && 'lg:col-span-1');
}

/** Zitat mit genau einem Anriss (nur bei der ersten Stimme der Ansicht); ohne Schlüsselwort unverändert */
function Zitat({ review, mitAnriss }) {
    const teile = mitAnriss ? teileAnriss(review.text, STIMMEN[review.id]?.anriss) : null;
    return (
        <p>
            „{teile ? <>{teile[0]}<mark data-motion="anriss">{teile[1]}</mark>{teile[2]}</> : review.text}“
        </p>
    );
}

export default function ReviewsSection({ leitachse = false }) {
    const [selectedTopic, setSelectedTopic] = useState('all');
    const { google, trustlocal, asOf } = RATING_SUMMARY;
    const listeRef = useRef(null);

    const filters = useMemo(
        () =>
            TOPIC_FILTERS.map((filter) => ({
                ...filter,
                count: REVIEWS.filter((review) => filter.match(review.topic)).length
            })).filter((filter) => filter.count > 0),
        []
    );

    const activeFilter = filters.find((filter) => filter.id === selectedTopic) || filters[0];
    const filteredReviews = REVIEWS.filter((review) => activeFilter.match(review.topic));

    // Nach einem Themenwechsel steht der Anriss an einer neu gezeichneten Stimme: dem Bewegungsmodul melden (K-007),
    // sonst bliebe sein Strich bei erlaubter Bewegung unsichtbar. Ohne Bewegung tut beobachte() nichts.
    useEffect(() => {
        if (listeRef.current) beobachte(listeRef.current);
    }, [selectedTopic]);

    return (
        <section className="relative py-16 lg:py-24" id="bewertungen" aria-labelledby="reviews-heading">
            {leitachse && (
                // Fugenkreuz auf dem Lot der Leitachse an der Oberkante (wie Abschnitt mit `leitachse`)
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10">
                    <div className={clsx(seitenKlassen, 'relative')}>
                        <Fugenkreuz className={clsx('absolute top-0 size-3 -translate-x-1/2 -translate-y-1/2 text-tinte', ACHSE_LAGE)} />
                    </div>
                </div>
            )}

            <div className={seitenKlassen}>
                {/* Kopf: links Etikett, H2 und Einleitung; rechts die Bewertungen als Maß */}
                <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
                    <div className="col-span-4 md:col-span-8 lg:col-span-7">
                        <p className={clsx(etikettKlassen, 'mb-4')}>
                            <Fugenkreuz className="size-3 shrink-0 text-strich" />
                            Echte Kundenstimmen
                        </p>
                        <h2 id="reviews-heading" className="text-fs-6 text-tinte">
                            Was unsere Kunden in Mittelhessen sagen
                        </h2>
                        <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                            Wörtliche Auszüge aus öffentlichen Rezensionen – zu Badsanierungen, Balkonen, Treppen und
                            kompletten Häusern.
                        </p>
                    </div>

                    <div className="col-span-4 md:col-span-8 lg:col-span-5">
                        <div className="grid grid-cols-1 border-l border-t border-fuge sm:grid-cols-2">
                            <div className="flex flex-col gap-2 border-b border-r border-fuge bg-fliese p-4 lg:p-6">
                                <p className="font-mono text-fs-5 text-tinte">{google.displayRating}</p>
                                <Stars count={Math.round(google.rating)} />
                                <p className="font-text text-fs-2 font-semibold text-tinte">
                                    {google.source}: {google.displayRating} von {google.maxRating}
                                </p>
                                <p className="font-mono text-fs-1 text-tinte-2">
                                    aus {google.count} {google.label}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 border-b border-r border-fuge bg-fliese p-4 lg:p-6">
                                <p className="font-mono text-fs-5 text-tinte">{trustlocal.displayRating.split('/')[0]}</p>
                                <p className="font-text text-fs-2 font-semibold text-tinte">
                                    {trustlocal.source}: {trustlocal.displayRating}
                                </p>
                                <p className="font-mono text-fs-1 text-tinte-2">
                                    aus {trustlocal.count} {trustlocal.label}
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 font-mono text-fs-1 text-tinte-2">Stand: {asOf}</p>
                    </div>
                </div>

                {/* Themenfilter: Auswahlknöpfe (aria-pressed), Zahl in Mono */}
                <div className="mt-16 flex flex-wrap gap-2" role="group" aria-label="Bewertungen nach Thema filtern">
                    {filters.map((filter) => {
                        const isActive = filter.id === activeFilter.id;
                        return (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setSelectedTopic(filter.id)}
                                aria-pressed={isActive}
                                className={wahlKlassen}
                            >
                                {/* eine Zeile wie im Bestand: Name und Zahl in einem Element (der Knopf ist inline-flex) */}
                                <span>
                                    {filter.label}
                                    <span className="ml-2 font-mono text-fs-1">({filter.count})</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Stimmen als Feldraster an der Fuge */}
                <ul ref={listeRef} className="mt-8 grid grid-cols-1 gap-px border border-fuge bg-fuge md:grid-cols-2 lg:grid-cols-3">
                    {filteredReviews.map((review, index) => (
                        <li key={review.id} className={clsx('flex flex-col bg-fliese p-6 lg:p-8', restKlassen(index, filteredReviews.length))}>
                            <figure className="flex flex-1 flex-col">
                                {/* role="img": aria-label an einem span ist ohne Rolle unzulässig (axe aria-prohibited-attr) */}
                                <span role="img" className="flex items-center gap-1 text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <Icon key={i} name="stern-voll" groesse={4} />
                                    ))}
                                </span>
                                <blockquote className="mt-4 max-w-mass flex-1 font-text text-fs-3 text-tinte">
                                    <Zitat review={review} mitAnriss={index === 0} />
                                </blockquote>
                                <figcaption className="mt-6 flex flex-col gap-1 border-t border-fuge pt-4">
                                    <span className="font-text text-fs-2 font-semibold text-tinte">{review.author}</span>
                                    <span className="font-mono text-fs-1 text-tinte-2">
                                        {review.source}-Rezension &middot; {review.topic}
                                    </span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
