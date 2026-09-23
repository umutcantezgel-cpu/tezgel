import React from 'react';
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';

export const metadata = {
    title: 'Impressum',
    description: 'Gesetzliche Anbieterkennzeichnung der Fliesenverlegung Tezgel gemäß § 5 DDG: Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar, HWK Wiesbaden, USt-IdNr. DE 259249094.',
    alternates: { canonical: '/impressum' }
};

export default function ImpressumPage() {
    return (
        <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-30" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-25" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="glass-surface rounded-[2.5rem] p-8 sm:p-12 space-y-8 text-slate-700">

                    <div>
                        <span className="eyebrow mb-3">
                            Rechtliche Pflichtangaben nach § 5 Digitale-Dienste-Gesetz (DDG)
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1">Impressum</h1>
                    </div>

                    {/* Company Details */}
                    <div className="space-y-2 border-b border-slate-200 pb-6 text-sm">
                        <h2 className="text-base font-black text-slate-900">Angaben gemäß § 5 DDG:</h2>
                        <p className="font-black text-slate-900 text-base">{COMPANY_DATA.legalName}</p>
                        <p>Inhaber: <strong className="text-slate-900">{COMPANY_DATA.owner.fullName}</strong></p>
                        <p>{COMPANY_DATA.headquarters.street}</p>
                        <p>{COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}</p>
                        <p className="text-slate-600">Deutschland / Hessen</p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2 border-b border-slate-200 pb-6 text-sm">
                        <h2 className="text-base font-black text-slate-900">Kontakt &amp; Erreichbarkeit:</h2>
                        <p>Telefon: <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="text-emerald-800 font-bold tabular-nums hover:text-emerald-700 hover:underline underline-offset-2">{COMPANY_DATA.contact.phone}</a></p>
                        <p>Mobilfunk / WhatsApp: <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-bold tabular-nums hover:text-emerald-700 hover:underline underline-offset-2">{COMPANY_DATA.contact.mobile}</a></p>
                        <p>Telefax: <span className="tabular-nums">{COMPANY_DATA.contact.fax}</span></p>
                        <p>E-Mail: <a href={`mailto:${COMPANY_DATA.contact.email}`} className="text-emerald-800 font-bold hover:text-emerald-700 hover:underline underline-offset-2">{COMPANY_DATA.contact.email}</a></p>
                    </div>

                    {/* Tax & Identification */}
                    <div className="space-y-2 border-b border-slate-200 pb-6 text-sm">
                        <h2 className="text-base font-black text-slate-900">Umsatzsteuer-Identifikationsnummer:</h2>
                        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                        <p className="font-black text-slate-900 text-base tabular-nums">{COMPANY_DATA.tax.ustId}</p>
                    </div>

                    {/* Chamber & Professional Regulation */}
                    <div className="space-y-2 border-b border-slate-200 pb-6 text-sm">
                        <h2 className="text-base font-black text-slate-900">Zuständige Kammer &amp; Aufsichtsbehörde:</h2>
                        <p className="font-bold text-slate-900">{COMPANY_DATA.authority.name}</p>
                        <p>Bierstadter Straße 45, 65189 Wiesbaden</p>
                        <p className="pt-2">
                            Berufsbezeichnung: Fliesen-, Platten- und Mosaiklegerbetrieb (verliehen in der Bundesrepublik Deutschland)
                        </p>
                        <p>
                            Berufsrechtliche Regelungen: Handwerksordnung (HwO) (einsehbar unter: <a href="https://www.gesetze-im-internet.de/hwo/" target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-semibold underline underline-offset-2 hover:text-emerald-700">www.gesetze-im-internet.de/hwo/</a>)
                        </p>
                    </div>

                    {/* Dispute Resolution */}
                    <div className="space-y-3 border-b border-slate-200 pb-6 text-sm leading-relaxed">
                        <h2 className="text-base font-black text-slate-900">Verbraucherstreitbeilegung / Universalschlichtungsstelle:</h2>
                        <p>
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                        <p>
                            Plattform der EU-Kommission zur Online-Streitbeilegung: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-bold underline underline-offset-2 hover:text-emerald-700">https://ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.
                        </p>
                    </div>

                    {/* Disclaimers */}
                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                        <h3 className="font-black text-slate-900 text-sm">Haftung für Inhalte</h3>
                        <p>
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </p>

                        <h3 className="font-black text-slate-900 text-sm">Haftung für Links</h3>
                        <p>
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        </p>

                        <h3 className="font-black text-slate-900 text-sm">Urheberrecht</h3>
                        <p>
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3 justify-between items-center text-sm font-bold">
                        <Link href="/" className="text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">&larr; Zurück zur Startseite</Link>
                        <Link href="/datenschutz" className="text-slate-700 hover:text-emerald-800">Zur Datenschutzerklärung &rarr;</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
