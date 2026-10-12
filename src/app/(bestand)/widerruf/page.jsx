"use client";
// Widerruf (E6-BAU-10, S-29): Lesemodus wie die Ratgeber-Artikel – kompakter Kopf (Einstieg art="arbeit", H1 text-fs-6),
// darunter Hinweis, Muster-Formular als Feld an der Fuge, Aktionen und Widerrufsfolgen im Satzspiegel max-w-mass.
// Rechtstext, Reihenfolge und Wege (Drucken, E-Mail) unverändert; Client bleibt nur wegen des Druck-Knopfs (onClick).
import React from 'react';
import { siteConfig } from '@/config/site';
import SEO from '@/components/SEO';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import Icon from '@/components/icons/Icon';
import { seitenKlassen } from '@/components/kern/stile';

export default function Widerruf() {
    const handlePrint = () => {
        window.print();
    };

    // Schreiblinie zum Ausfüllen auf dem Ausdruck: Strich-Linie (≥ 3:1) auf Kalk, gedruckt auf Weiß
    const fieldLine = "h-12 border-b border-strich bg-kalk print:bg-white";

    return (
        <>
            <SEO
                title="Widerrufsformular"
                description={`Muster-Widerrufsformular gemäß § 246a Abs. 1 EGBGB für ${siteConfig.legalName}.`}
            />

            {/* KOPF: Rückweg zuerst, dann H1 und Rechtsgrundlage (Norm in Mono) */}
            <Einstieg
                art="arbeit"
                pfad={
                    <Knopf variante="text" href="/agb" iconLinks="pfeil-links" className="print:hidden">
                        Zurück zu den AGB
                    </Knopf>
                }
                titel={<>Widerrufsbelehrung &amp; Muster-Widerrufsformular</>}
                vorspann={
                    <p className="text-fs-2 text-tinte-2">gemäß <span className="font-mono">§ 246a Abs. 1 EGBGB</span></p>
                }
            />

            {/* LESEMODUS: alles im Satzspiegel, links an derselben Kante wie die H1 */}
            <div className={`${seitenKlassen} py-12 lg:py-16`}>
                <div className="max-w-mass text-fs-3 text-tinte">
                    {/* Hinweis (Muster wie kern/Hinweis „merk“; die Art steht hier schon im Text) */}
                    <div className="flex items-start gap-4 border border-l-2 border-strich bg-fliese p-6 text-fs-2 text-tinte">
                        <Icon name="info" groesse={5} className="mt-1 text-tinte" />
                        <p>
                            <strong className="font-semibold">Hinweis:</strong> Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie
                            bitte dieses Formular aus und senden Sie es zurück.
                        </p>
                    </div>

                    {/* Muster-Formular: ein Feld, Teile durch Fugen getrennt */}
                    <div className="mt-8 border border-fuge bg-fliese print:border-strich">
                        {/* Anschrift */}
                        <div className="border-b border-fuge p-6 md:p-8">
                            <p className="mb-2 font-semibold text-tinte">An:</p>
                            <p className="text-tinte">
                                {siteConfig.legalName}<br />
                                Inhaber: {siteConfig.legal.owner}<br />
                                {siteConfig.contact.address.street}<br />
                                {siteConfig.contact.address.zipCity}<br />
                                Telefax: <span className="font-mono">{siteConfig.contact.fax}</span><br />
                                E-Mail: {siteConfig.contact.email}
                            </p>
                        </div>

                        {/* Erklärung mit Schreiblinien */}
                        <div className="space-y-6 p-6 md:p-8">
                            <div>
                                <p className="mb-2 font-semibold text-tinte">
                                    Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag
                                    über die Erbringung der folgenden Dienstleistung:
                                </p>
                                <div className={fieldLine} />
                            </div>

                            <div>
                                <p className="mb-2 font-semibold text-tinte">Bestellt am (*) / erhalten am (*):</p>
                                <div className={fieldLine} />
                            </div>

                            <div>
                                <p className="mb-2 font-semibold text-tinte">Name des/der Verbraucher(s):</p>
                                <div className={fieldLine} />
                            </div>

                            <div>
                                <p className="mb-2 font-semibold text-tinte">Anschrift des/der Verbraucher(s):</p>
                                <div className={fieldLine} />
                                <div className={`${fieldLine} mt-2`} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2 font-semibold text-tinte">Datum:</p>
                                    <div className={fieldLine} />
                                </div>
                                <div>
                                    <p className="mb-2 font-semibold text-tinte">Unterschrift:</p>
                                    <div className={fieldLine} />
                                </div>
                            </div>
                        </div>

                        <p className="border-t border-fuge px-6 py-4 text-fs-2 text-tinte-2 md:px-8">
                            (*) Unzutreffendes streichen.
                        </p>
                    </div>

                    {/* Aktionen: ein Hauptknopf (Drucken), E-Mail als Nebenknopf; auf dem Ausdruck ausgeblendet */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap print:hidden">
                        <Knopf onClick={handlePrint} iconLinks="dokument">
                            Formular drucken
                        </Knopf>
                        <Knopf variante="neben" href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Widerruf')}`} iconLinks="mail">
                            Per E-Mail senden
                        </Knopf>
                    </div>

                    {/* Widerrufsfolgen: Text an der Fuge */}
                    <div className="mt-12 border-t border-fuge pt-8">
                        <p className="mb-4 font-semibold text-tinte">Widerrufsfolgen:</p>
                        <p className="mb-4">
                            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
                            erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen,
                            an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                        </p>
                        <p>
                            Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen soll,
                            so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem
                            Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses
                            Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum
                            Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
