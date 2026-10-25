"use client";
// Bewertungen auf /referenzen (KERN v2, S-23; Abnahme E3-BAU-07 nach K-016 „Ruhe“ und dem Seitentext
// `_werkstatt/texte/referenzen.md` Abschnitt 5). Kopf mittig untereinander: H2, Satz und Absatz der Textdatei (vorher zweispaltig
// mit den Bewertungen als Maß rechts daneben, ein zweiter Strang). Darunter der Themenfilter (Insel mit Zustand:
// Auswahlknöpfe mit aria-pressed, Zahl je Thema) und die Stimmen der gewählten Gruppe als langsames, großes Karussell mit
// gleich großen Karten (K-016: „groß auf Über uns und Unsere Arbeiten“, vorher ein Raster mit bis zu 16 Feldern). Jede Stimme
// ist eine Kundenstimme (K-009): Sterne als Gruppe mit role="img" und Namen, Zitat wörtlich, Name und Quelle an einer Fuge.
// Zum Schluss die Kennzeile mit Stand, der Satz zu Trustlocal und das Motto. Werte aus RATING_SUMMARY und Wortlaut der
// Stimmen unverändert (G8). Sprungziel #bewertungen (/referenzen#bewertungen): kein `spaet`, kein eigener Versatz.
// IDs (bewertungen, reviews-heading), Gruppenname und aria-pressed wie im Bestand.
import { useState } from 'react';
import clsx from 'clsx';
import { REVIEWS, RATING_SUMMARY } from '@/config/reviews';
import { COMPANY_DATA } from '@/config/company';
import Icon from '@/components/icons/Icon';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Karussell from '@/components/kern/Karussell';
import { ACHSE_LAGE } from '@/components/kern/Leitachse';
import { seitenKlassen, wahlKlassen } from '@/components/kern/stile';

// Topic groups derived from the `topic` values in config/reviews.js
// (keyword match, so new reviews are sorted in automatically).
const TOPIC_FILTERS = [
    { id: 'all', label: 'Alle Bewertungen', match: () => true },
    { id: 'bad', label: 'Bad & Badsanierung', match: (topic) => /Bad|Bäder/.test(topic) },
    { id: 'haus', label: 'Haus, Treppen & Balkon', match: (topic) => /Haus|Treppe|Boden|Küche|Balkon/.test(topic) },
    { id: 'beratung', label: 'Beratung & Service', match: (topic) => /Beratung|Service|Organisation/.test(topic) },
    { id: 'qualitaet', label: 'Qualität & Sauberkeit', match: (topic) => /Qualität|Sauberkeit|Preis/.test(topic) }
];

/** Zahl in deutscher Schreibweise („9,6“) */
const zahl = (wert) => String(wert).replace('.', ',');

export default function ReviewsSection({ leitachse = false }) {
    const [selectedTopic, setSelectedTopic] = useState('all');
    const { trustlocal } = RATING_SUMMARY;
    const filters = TOPIC_FILTERS.map((filter) => ({
        ...filter,
        count: REVIEWS.filter((review) => filter.match(review.topic)).length
    })).filter((filter) => filter.count > 0);

    const activeFilter = filters.find((filter) => filter.id === selectedTopic) || filters[0];
    const filteredReviews = REVIEWS.filter((review) => activeFilter.match(review.topic));
    const quellen = [...new Set(REVIEWS.map((review) => review.source))];

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
                {/* Kopf mittig untereinander (K-016), Wortlaut aus der Textdatei; Zahl und Quelle aus den Daten */}
                <div className="mx-auto max-w-mass text-center text-balance">
                    <h2 id="reviews-heading" className="text-fs-6 text-tinte">
                        Was unsere Kunden wörtlich geschrieben haben.
                    </h2>
                    <p className="mt-6 font-text text-fs-3 text-tinte-2">Wählen Sie ein Thema, zum Beispiel das Bad.</p>
                    <p className="mt-4 font-text text-fs-3 text-tinte-2">
                        Hier stehen {REVIEWS.length} Stimmen aus unseren Bewertungen bei {quellen.join(' und ')}, wörtlich übernommen.
                        Wo ein Text gekürzt ist, steht „…“.
                    </p>
                </div>

                {/* Themenfilter: Auswahlknöpfe (aria-pressed), Zahl in Mono */}
                <div className="mt-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Bewertungen nach Thema filtern">
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

                {/* Stimmen der Gruppe als großes Karussell; ein neues Thema beginnt wieder bei der ersten Karte */}
                <div className="mt-8">
                    <Karussell key={activeFilter.id} art="reihe" name="Bewertungen" selbstlauf>
                        {filteredReviews.map((review) => (
                            <figure key={review.id} className="flex h-full flex-col border border-fuge bg-fliese p-6 lg:p-8">
                                {/* role="img": aria-label an einem span ist ohne Rolle unzulässig (axe aria-prohibited-attr) */}
                                <span role="img" className="flex items-center gap-1 text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <Icon key={i} name="stern-voll" groesse={4} />
                                    ))}
                                </span>
                                <blockquote className="mt-4 min-w-0 flex-1 font-text text-fs-3 text-pretty wrap-break-word text-tinte hyphens-none">
                                    <p>„{review.text}“</p>
                                </blockquote>
                                <figcaption className="mt-6 flex flex-col gap-1 border-t border-fuge pt-4">
                                    <span className="font-text text-fs-2 font-semibold text-tinte">{review.author}</span>
                                    <span className="font-text text-fs-2 text-tinte-2">bei {review.source}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </Karussell>
                </div>

                {/* Kennzeile, Trustlocal und Motto (Textdatei Abschnitt 5), mittig */}
                <div className="mx-auto mt-12 max-w-mass text-center">
                    <Bewertungszeile stand className="font-text text-fs-2 text-tinte-2 hyphens-none" />
                    <p className="mt-4 font-text text-fs-3 text-tinte-2">
                        Auf {trustlocal.source} haben wir {zahl(trustlocal.rating)} von {trustlocal.maxRating} Punkten aus {trustlocal.count} Bewertungen.
                    </p>
                    <figure className="mt-12">
                        <blockquote className="font-anzeige text-fs-5 font-extrabold text-balance text-tinte">
                            <p>„{COMPANY_DATA.motto}“</p>
                        </blockquote>
                    </figure>
                </div>
            </div>
        </section>
    );
}
