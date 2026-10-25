"use client";
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen } from '@/components/kern/stile';
import { Themenmotiv } from '@/components/blog/BlogCard';
import Kennzeile, { Angabe, Datum } from '@/components/blog/liste/Kennzeile';
import Textmarken from '@/components/kern/Textmarken';

/**
 * Hervorgehobener Leitfaden über der Liste (F-03, Fusion E-039): Kasten und Zeichnung aus A, Technik aus B.
 * Einziger Link ist der Titel in der H2 (kurzer Linkname), per ::after über den ganzen Kasten gestreckt; „Vollständigen
 * Leitfaden lesen“ ist Teil dieser Fläche. Der Fokusring liegt wie in A um den ganzen Kasten: am ::after (2 px Tinte,
 * Abstand 2 px), am Text selbst kein Ring, nur die Unterstreichung.
 * Auf jeder Breite: Zeichnung (96 px, ab md 128 px) neben Etikett und Kennzeile, Titel und Auszug darunter über die volle
 * Breite (Abnahme E3-BAU-11: die Liste steht in der Lesebreite, zwei Spalten wären dort zu schmal). Der Auszug steht voll.
 */
export default function Leitfaden({ post, lesezeit, anriss }) {
    return (
        <article
            data-motion="zustand"
            className="@container wrap-break-word relative flex flex-wrap items-center gap-4 border border-fuge bg-fliese p-4 transition-colors dauer-1 ease-setzen hover:border-strich md:gap-6 md:p-6"
        >
            <Themenmotiv
                post={post}
                className="size-24 shrink-0 border border-fuge bg-fliese md:size-32"
            />

            {/* Telefon: Etikett und Kennzeile neben der Zeichnung, Titel und Auszug darunter; ab md eine Spalte rechts */}
            <div className="contents">
                <div className="flex min-w-0 flex-1 flex-col gap-3 @max-xs:basis-full md:flex-none md:gap-4">
                    <p className={etikettKlassen}>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Empfohlener Leitfaden
                    </p>
                    <Kennzeile>
                        <Datum post={post} />
                        <Angabe zeichen="uhr">{lesezeit} Lesezeit</Angabe>
                    </Kennzeile>
                </div>

                <div className="min-w-0 basis-full">
                    <h2 className="text-fs-5 text-tinte hyphens-auto">
                        <Link
                            href={`/blog/${post.slug}`}
                            data-motion="zustand"
                            className="text-tinte no-underline decoration-strich underline-offset-4 hover:underline focus-visible:underline focus-visible:decoration-tinte focus-visible:outline-hidden after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-solid focus-visible:after:outline-tinte"
                        >
                            {post.title}
                        </Link>
                    </h2>

                    {/* Anriss aus dem Seitentext (mit Textmarken), sonst der Auszug aus den Beitragsdaten */}
                    <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
                        {anriss ? <Textmarken text={anriss} /> : post.excerpt}
                    </p>

                    <span className="mt-4 flex items-center gap-2 border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte">
                        <span className="underline decoration-strich underline-offset-4">Vollständigen Leitfaden lesen</span>
                        <Icon name="pfeil-rechts" groesse={5} />
                    </span>
                </div>
            </div>
        </article>
    );
}
