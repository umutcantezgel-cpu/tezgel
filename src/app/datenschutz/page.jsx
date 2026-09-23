import React from 'react';
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';

export const metadata = {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung der Fliesenverlegung Tezgel nach DSGVO. Informationen zur Erhebung und Verarbeitung personenbezogener Daten.',
    alternates: { canonical: '/datenschutz' }
};

export default function DatenschutzPage() {
    return (
        <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-30" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-25" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="glass-surface rounded-[2.5rem] p-8 sm:p-12 space-y-8 text-slate-700">

                    <div>
                        <span className="eyebrow mb-3">
                            Datenschutz nach der DSGVO &amp; BDSG
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1">Datenschutzerklärung</h1>
                    </div>

                    {/* 1. Datenschutz auf einen Blick */}
                    <div className="space-y-3 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">1. Datenschutz auf einen Blick</h2>
                        <h3 className="font-bold text-emerald-800 text-sm">Allgemeine Hinweise</h3>
                        <p>
                            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                        </p>
                        <h3 className="font-bold text-emerald-800 text-sm pt-2">Datenerfassung auf dieser Website</h3>
                        <p>
                            <strong className="text-slate-900">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber: {COMPANY_DATA.owner.fullName}, {COMPANY_DATA.legalName}, {COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}.
                        </p>
                        <p>
                            <strong className="text-slate-900">Wie erfassen wir Ihre Daten?</strong><br />
                            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. Angaben im Express-Anfrage-Funnel, Kontaktaufnahme per E-Mail oder WhatsApp). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. Browsertyp, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                        </p>
                    </div>

                    {/* 2. Verantwortliche Stelle */}
                    <div className="space-y-2 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">2. Hinweis zur verantwortlichen Stelle</h2>
                        <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800">
                            <p className="font-bold text-slate-900 text-base">{COMPANY_DATA.legalName}</p>
                            <p>Inhaber: {COMPANY_DATA.owner.fullName}</p>
                            <p>{COMPANY_DATA.headquarters.street}</p>
                            <p>{COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}</p>
                            <p className="pt-2">Telefon: <span className="tabular-nums">{COMPANY_DATA.contact.phone}</span></p>
                            <p>Mobilfunk / WhatsApp: <span className="tabular-nums">{COMPANY_DATA.contact.mobile}</span></p>
                            <p>E-Mail: <a href={`mailto:${COMPANY_DATA.contact.email}`} className="text-emerald-800 font-semibold underline underline-offset-2 hover:text-emerald-700">{COMPANY_DATA.contact.email}</a></p>
                        </div>
                    </div>

                    {/* 3. Lokale Schriftarten & DSGVO-Konformität */}
                    <div className="space-y-3 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">3. Lokale Schriften (Next.js Font Optimization)</h2>
                        <p>
                            Diese Website nutzt zur einheitlichen Darstellung von Schriftarten lokale Schriften, die über die Next.js Font-Pipeline bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftdateien direkt von unserem Webserver. Es wird <strong className="text-slate-900">keine</strong> Verbindung zu externen Servern von Drittanbietern (wie Google Fonts) aufgebaut und keine IP-Adresse dorthin übertragen.
                        </p>
                    </div>

                    {/* 4. WhatsApp-Kommunikation */}
                    <div className="space-y-3 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">4. Kontaktaufnahme via WhatsApp</h2>
                        <p>
                            Wir bieten Ihnen die Möglichkeit, über die Anwendung &bdquo;WhatsApp&ldquo; schnell und unkompliziert Kontakt mit Herrn {COMPANY_DATA.owner.fullName} aufzunehmen. Anbieter von WhatsApp ist die WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.
                        </p>
                        <p>
                            Die Nutzung erfolgt auf rein freiwilliger Basis (Art. 6 Abs. 1 lit. a DSGVO). Wenn Sie auf einen WhatsApp-Button klicken, öffnet sich die WhatsApp-Anwendung auf Ihrem Endgerät oder WhatsApp Web. Die Datenübertragung (Telefonnummer, Nachrichtentext) erfolgt direkt zwischen Ihnen und uns über die Ende-zu-Ende-Verschlüsselung von WhatsApp. Details zum Datenschutz bei WhatsApp finden Sie unter: <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-semibold underline underline-offset-2 hover:text-emerald-700 break-words">https://www.whatsapp.com/legal/privacy-policy</a>.
                        </p>
                    </div>

                    {/* 5. Ihre Rechte */}
                    <div className="space-y-3 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">5. Ihre Rechte als betroffene Person</h2>
                        <p>Sie haben im Rahmen der DSGVO jederzeit das Recht auf:</p>
                        <ul className="list-disc list-inside space-y-1.5 text-slate-800 marker:text-emerald-600">
                            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                            <li>Löschung Ihrer Daten (&bdquo;Recht auf Vergessenwerden&ldquo;, Art. 17 DSGVO)</li>
                            <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
                            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                            <li>Widerruf Ihrer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
                            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                        </ul>
                        <h3 className="font-bold text-slate-900 text-sm pt-2">Beschwerderecht bei der Aufsichtsbehörde:</h3>
                        <p className="text-slate-700">
                            Der Hessische Beauftragte für Datenschutz und Informationsfreiheit<br />
                            Gustav-Stresemann-Ring 1, 65189 Wiesbaden<br />
                            Website: <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-semibold underline underline-offset-2 hover:text-emerald-700">https://datenschutz.hessen.de</a>
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3 justify-between items-center text-sm font-bold">
                        <Link href="/" className="text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">&larr; Zurück zur Startseite</Link>
                        <Link href="/impressum" className="text-slate-700 hover:text-emerald-800">Zum Impressum &rarr;</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
