import React from 'react';
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';

export const metadata = {
    title: 'AGB – Allgemeine Geschäftsbedingungen',
    description: 'Allgemeine Geschäftsbedingungen (AGB) der Fliesenverlegung Tezgel für Werk- und Montageleistungen in Aßlar, Wetzlar & Mittelhessen.',
    alternates: { canonical: '/agb' }
};

export default function AGBPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-30" />
            <div className="ambient-glow-red top-96 -right-20 opacity-25" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="glass-surface rounded-tile-xl p-8 sm:p-12 space-y-8 text-slate-700">
                    <div>
                        <span className="eyebrow mb-3">
                            Geschäftsbedingungen für Werk- und Montageleistungen
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1">Allgemeine Geschäftsbedingungen (AGB)</h1>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">§ 1 Geltungsbereich &amp; Vertragspartner</h2>
                        <p>
                            (1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Lieferungen, Montage-, Installations- und Wartungsleistungen zwischen der <strong className="text-slate-900">{COMPANY_DATA.legalName}</strong>, Inhaber {COMPANY_DATA.owner.fullName}, {COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city} (nachfolgend &bdquo;Auftragnehmer&ldquo;) und ihren Kunden (nachfolgend &bdquo;Auftraggeber&ldquo;).
                        </p>
                        <p>
                            (2) Abweichende oder ergänzende Bedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">§ 2 Angebot, Festpreis &amp; Vertragsschluss</h2>
                        <p>
                            (1) Angebote des Auftragnehmers sind, sofern nicht ausdrücklich als verbindlich gekennzeichnet, freibleibend.
                        </p>
                        <p>
                            (2) Ein verbindlicher Vertrag kommt durch schriftliche Auftragsbestätigung oder durch Beginn der Ausführungsarbeiten zustande.
                        </p>
                        <p>
                            (3) Sofern ein Festpreis vereinbart wurde, gilt dieser für die im Angebot exakt beschriebenen Leistungen. Mehrleistungen, die auf nachträglichen Sonderwünschen des Auftraggebers oder unvorhersehbaren bauseitigen Hindernissen beruhen, werden gesondert nach tatsächlichem Aufwand bzw. Nachtragsangebot vergütet.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">§ 3 Ausführungsfristen &amp; Mitwirkungspflichten</h2>
                        <p>
                            (1) Ausführungsfristen sind verbindlich, sofern sie im Bauzeitenplan schriftlich fixiert wurden.
                        </p>
                        <p>
                            (2) Der Auftraggeber sorgt für ungehinderten Zugang zur Baustelle sowie die kostenlose Bereitstellung von Wasser und Baustrom.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">§ 4 Abnahme &amp; Gewährleistung</h2>
                        <p>
                            (1) Nach Fertigstellung der Leistung erfolgt eine gemeinsame förmliche Abnahme.
                        </p>
                        <p>
                            (2) Für Werkleistungen an Bauwerken (Badsanierungen) gilt die gesetzliche Gewährleistungsfrist nach BGB (5 Jahre). Für Wartungs- und Reparaturarbeiten gilt die gesetzliche Frist von 2 Jahren bzw. die Bedingungen des Herstellers.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                        <h2 className="text-base font-black text-slate-900">§ 5 Gerichtsstand &amp; Schlussbestimmungen</h2>
                        <p>
                            (1) Es gilt das Recht der Bundesrepublik Deutschland.
                        </p>
                        <p>
                            (2) Erfüllungsort und Gerichtsstand für alle Streitigkeiten mit Kaufleuten oder juristischen Personen des öffentlichen Rechts ist <strong className="text-slate-900">Wetzlar</strong>.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3 justify-between items-center text-sm font-bold">
                        <Link href="/" className="text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">&larr; Zurück zur Startseite</Link>
                        <Link href="/widerruf" className="text-slate-700 hover:text-orange-700">Zur Widerrufsbelehrung &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
