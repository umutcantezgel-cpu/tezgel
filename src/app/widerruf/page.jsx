"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, Mail, FileText } from 'lucide-react';
import { siteConfig } from '@/config/site';
import SEO from '@/components/SEO';

export default function Widerruf() {
    const handlePrint = () => {
        window.print();
    };

    const fieldLine = "border-b-2 border-slate-300 h-12 bg-slate-50 rounded print:bg-white";

    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <SEO
                title="Widerrufsformular"
                description={`Muster-Widerrufsformular gemäß § 246a Abs. 1 EGBGB für ${siteConfig.legalName}.`}
            />
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-30 print:hidden" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-25 print:hidden" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="glass-surface rounded-[2.5rem] p-8 md:p-12">
                    {/* Back Link */}
                    <Link href="/agb" className="inline-flex items-center text-sm font-bold text-emerald-800 hover:text-emerald-700 mb-6 transition-colors print:hidden">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück zu den AGB
                    </Link>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="icon-chip w-12 h-12">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Widerrufsbelehrung &amp; Muster-Widerrufsformular</h1>
                            <p className="text-slate-600 text-sm mt-1">gemäß § 246a Abs. 1 EGBGB</p>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-sm text-amber-900">
                        <p>
                            <strong>Hinweis:</strong> Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie
                            bitte dieses Formular aus und senden Sie es zurück.
                        </p>
                    </div>

                    {/* Form Content */}
                    <div className="border-2 border-slate-300 rounded-2xl p-6 md:p-8 space-y-6 bg-white print:border print:shadow-none">
                        {/* Address */}
                        <div className="border-b border-slate-200 pb-4">
                            <p className="font-bold text-slate-900 mb-2">An:</p>
                            <p className="text-slate-700">
                                {siteConfig.legalName}<br />
                                Inhaber: {siteConfig.legal.owner}<br />
                                {siteConfig.contact.address.street}<br />
                                {siteConfig.contact.address.zipCity}<br />
                                Telefax: <span className="tabular-nums">{siteConfig.contact.fax}</span><br />
                                E-Mail: {siteConfig.contact.email}
                            </p>
                        </div>

                        {/* Declaration */}
                        <div className="space-y-4">
                            <div>
                                <p className="font-bold text-slate-900 mb-2">
                                    Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag
                                    über die Erbringung der folgenden Dienstleistung:
                                </p>
                                <div className={fieldLine} />
                            </div>

                            <div>
                                <p className="font-bold text-slate-900 mb-2">Bestellt am (*) / erhalten am (*):</p>
                                <div className={fieldLine} />
                            </div>

                            <div>
                                <p className="font-bold text-slate-900 mb-2">Name des/der Verbraucher(s):</p>
                                <div className={fieldLine} />
                            </div>

                            <div>
                                <p className="font-bold text-slate-900 mb-2">Anschrift des/der Verbraucher(s):</p>
                                <div className={fieldLine} />
                                <div className={`${fieldLine} mt-2`} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-bold text-slate-900 mb-2">Datum:</p>
                                    <div className={fieldLine} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 mb-2">Unterschrift:</p>
                                    <div className={fieldLine} />
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 italic pt-4 border-t border-slate-200">
                            (*) Unzutreffendes streichen.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap gap-3.5 justify-center print:hidden">
                        <button type="button" onClick={handlePrint} className="btn-primary px-7 py-3.5 text-xs">
                            <Printer className="w-4 h-4" />
                            Formular drucken
                        </button>
                        <a href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Widerruf')}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Mail className="w-4 h-4 text-emerald-700" />
                            Per E-Mail senden
                        </a>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 leading-relaxed">
                        <p className="font-bold text-slate-900 mb-2">Widerrufsfolgen:</p>
                        <p className="mb-2">
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
        </div>
    );
}
