// Kontakt (E2-ORCH-09, Referenz der Arbeitsansichten): kompakter Einstieg, Kontaktwege als Schriftfeld, danach
// Karte, regionaler Kontakt, Terminkalender und Express-Anfrage in ruhigen Abschnitten. Texte, IDs und Anker unverändert.
import React from 'react';
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import ContactPremiumMap from '@/components/maps/ContactPremiumMap';
import LocationContact from '@/components/locations/LocationContact';
import FinalCTA from '@/components/ui/FinalCTA';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

import DirectContactCard from '@/components/contact/DirectContactCard';
import BookingCalendar from '@/components/contact/BookingCalendar';

export default function KontaktPage() {
    return (
        <>
            <Einstieg
                art="arbeit"
                etikett={<>Fachbetrieb Aßlar &middot; Wetzlar &middot; Hessen</>}
                titel={<>Kontakt &amp; <span>Aufmaß Fliesenleger Tezgel</span></>}
                vorspann={
                    <p>
                        Ihr Fliesenleger für Aßlar, Wetzlar und ganz Hessen: Rufen Sie uns direkt an, schreiben Sie uns per WhatsApp oder sichern Sie sich über unsere Express-Anfrage Ihr kostenfreies Vor-Ort-Aufmaß mit verbindlichem Festpreisangebot.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="#express-anfrage" icon="pfeil-rechts">Zur Express-Anfrage</Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            {COMPANY_DATA.contact.phone}
                        </Knopf>
                    </>
                }
            />

            {/* Kontaktwege und Zusage */}
            <Abschnitt art="arbeit" aria-label="Direkter Kontakt und Qualitätsversprechen">
                <div className="grid grid-cols-1 gap-px border border-fuge bg-fuge md:grid-cols-2">
                    <DirectContactCard />

                    <div className="flex flex-col justify-between bg-fliese p-6 sm:p-8 lg:p-12">
                        <div>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className={etikettKlassen}>Qualitätsversprechen</span>
                                <span className="font-mono text-fs-1 text-tinte">{COMPANY_DATA.authority.shortName}</span>
                            </div>

                            <h2 className="mt-4 text-fs-5 text-tinte">
                                Persönliche Fachberatung
                            </h2>
                            <p className="mt-2 text-fs-3 text-tinte-2">
                                Inhaber {COMPANY_DATA.owner.fullName} betreut jedes Projekt von der Vor-Ort-Begutachtung bis zur sauberen Endübergabe persönlich.
                            </p>

                            <figure className="mt-6 border-l-2 border-tinte pl-6">
                                <blockquote className="text-fs-3 text-tinte">&bdquo;{COMPANY_DATA.motto}&ldquo;</blockquote>
                                <figcaption className="mt-2 block font-mono text-fs-1 text-tinte-2">
                                    — {COMPANY_DATA.owner.fullName}, Inhaber
                                </figcaption>
                            </figure>

                            <ul className="mt-6 flex flex-col gap-3 text-fs-2 text-tinte">
                                <li className="flex items-center gap-3">
                                    <Fugenkreuz className="size-3 text-laser" />
                                    <span>Normgerechte Verbundabdichtung nach DIN 18534</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Fugenkreuz className="size-3 text-laser" />
                                    <span>Garantierter Staubschutz bei Renovierungen</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Fugenkreuz className="size-3 text-laser" />
                                    <span>Eingetragen bei der {COMPANY_DATA.authority.name}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 border-t border-fuge pt-6">
                            <span className="block font-mono text-fs-1 text-tinte-2">Einsatzgebiet:</span>
                            <span className="mt-1 block text-fs-2 text-tinte">Aßlar, Wetzlar, Gießen, Herborn, Dillenburg &amp; ganz Hessen</span>
                            <Link href="/standorte" className={`${linkKlassen} mt-3 inline-flex min-h-11 items-center gap-2 text-fs-2 font-semibold`}>
                                Alle Standorte ansehen
                            </Link>
                        </div>
                    </div>
                </div>
            </Abschnitt>

            {/* Standort & Anfahrt */}
            <Abschnitt
                art="arbeit"
                id="standort-anfahrt"
                titelId="standort-anfahrt-heading"
                flaeche="fliese"
                etikett="Interaktive Karte & Standorte"
                titel="Unser Fachbetrieb & Einsatzgebiet Mittelhessen"
                einleitung={<p>Zentrale in der Hohwardstraße 14, 35614 Aßlar – wählen Sie Ihre Stadt für Fahrtzeiten und Infos.</p>}
            >
                <ContactPremiumMap />
            </Abschnitt>

            {/* Regionaler Kontakt */}
            <div className="mx-auto w-full max-w-seite px-4 py-12 md:px-8 lg:px-12 lg:py-16">
                <LocationContact cityName="Aßlar, Wetzlar &amp; Mittelhessen" className="border border-fuge" />
            </div>

            {/* Terminkalender */}
            <Abschnitt
                art="arbeit"
                id="termin-buchen"
                titelId="termin-buchen-heading"
                kopf="seitlich"
                etikett="Verbindlicher Vor-Ort-Termin"
                titel="Wunschtermin in 2 Schritten reservieren"
                einleitung={<p>Wählen Sie direkt einen freien Tag und eine Uhrzeit für Ihr kostenfreies Aufmaß vor Ort.</p>}
            >
                <BookingCalendar initialServiceType="Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse" />
            </Abschnitt>

            {/* Express-Anfrage */}
            <Abschnitt
                art="arbeit"
                id="express-anfrage"
                titelId="express-anfrage-heading"
                flaeche="fliese"
                kopf="seitlich"
                etikett="Oder detailliert konfigurieren"
                titel="Ihr Vor-Ort-Aufmaß anfordern"
                einleitung={<p>Füllen Sie kurz die Projektdaten aus – Fachbetriebsleiter Deniz Tezgel meldet sich persönlich bei Ihnen.</p>}
            >
                <TezgelAnfrageFunnel />
            </Abschnitt>

            <FinalCTA
                headline="Sie möchten Ihr Bad oder Ihre Fliesen erneuern? Jetzt unverbindlich beraten lassen."
                subtitle="Kostenfreies Vor-Ort-Aufmaß • Feste Terminabsprachen • HWK-Fachbetrieb"
                buttonText="Jetzt Deniz Tezgel anrufen"
            />
        </>
    );
}
