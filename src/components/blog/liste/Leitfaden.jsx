"use client";
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen } from '@/components/kern/stile';
import Kennzeile, { Angabe, Datum } from '@/components/blog/liste/Kennzeile';
import Textmarken from '@/components/kern/Textmarken';

/**
 * Hervorgehobener Leitfaden über der Liste (F-03, Fusion E-039): Kasten und Zeichnung aus A, Technik aus B.
 * Einziger Link ist der Titel in der H2 (kurzer Linkname), per ::after über den ganzen Kasten gestreckt; „Vollständigen
 * Leitfaden lesen“ ist Teil dieser Fläche. Der Fokusring liegt wie in A um den ganzen Kasten: am ::after (2 px Tinte,
 * Abstand 2 px), am Text selbst kein Ring, nur die Unterstreichung.
 * Ruhiger Wissensmoment (UM-E4-SICHT-FIX M-C8 Nr. 4): Über die volle Breite des Kastens steht groß der Verlegeplan des
 * Themas (fertiger Knoten vom Server, `zeichnung`, ohne rote Achse, dekorativ), darunter Etikett und Kennzeile, Titel,
 * Anriss und Weg in der Lesebreite. Das Fugenbild rückt beim Zeigen in die Flucht (Register sig-plan am Kasten wie die
 * Leistungspläne: am Desktop bei Hover und Fokus, auf Touch beim Eintritt; ruhig, reduziert und ohne JavaScript steht es in
 * der Flucht). Der Auszug steht voll.
 */
export default function Leitfaden({ post, lesezeit, anriss, zeichnung }) {
    return (
        <div data-motion="sig-plan" className="sig-plan-ziel">
            <article
                data-motion="zustand"
                className="@container wrap-break-word relative flex flex-col border border-fuge bg-fliese transition-colors dauer-1 ease-setzen hover:border-strich"
            >
                {zeichnung && (
                    <div aria-hidden="true" className="border-b border-fuge bg-kalk p-4 text-tinte md:p-6 lg:p-8">
                        <div className="mx-auto w-full md:w-2/3 lg:w-1/2">{zeichnung}</div>
                    </div>
                )}

                <div className="flex flex-col gap-4 p-4 md:p-6 lg:mx-auto lg:w-full lg:max-w-mass lg:px-0 lg:py-8">
                    <div className="flex min-w-0 flex-col gap-3 md:gap-4">
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

                        {/* Pfeil hängt am letzten Wort, auch wenn die Zeile bei großer Schrift umbricht (Browserprüfung E4-W1, Runde 2) */}
                        <span className="mt-4 block border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte">
                            {/* eine Unterstreichung über den ganzen Text (auch das Leerzeichen); der Pfeil ist kein Text und bleibt frei */}
                            <span className="underline decoration-strich underline-offset-4">
                                Vollständigen Leitfaden{' '}
                                <span className="whitespace-nowrap">
                                    lesen
                                    <Icon name="pfeil-rechts" groesse={5} className="ml-2 inline-block align-text-bottom" />
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </article>
        </div>
    );
}
