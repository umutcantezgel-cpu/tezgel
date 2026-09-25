import React from 'react';
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';

export const metadata = {
    title: 'Cookie-Richtlinie (EU)',
    description: 'Informationen über die Verwendung von Cookies und ähnlichen Technologien auf der Website der Fliesenverlegung Tezgel.',
    alternates: { canonical: '/cookie-richtlinie' }
};

export default function CookieRichtliniePage() {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-30" />
            <div className="ambient-glow-red top-96 -right-20 opacity-25" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="glass-surface rounded-tile-xl p-8 sm:p-12 space-y-8 text-slate-700">
                    <div>
                        <span className="eyebrow mb-3">
                            EU-Richtlinie über den Schutz der Privatsphäre in der elektronischen Kommunikation
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1">Cookie-Richtlinie (EU)</h1>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">1. Einführung</h2>
                        <p>
                            Unsere Website, <a href={COMPANY_DATA.contact.website} className="text-orange-700 font-semibold underline underline-offset-2 hover:text-orange-600">{COMPANY_DATA.contact.website}</a> (im Folgenden: &bdquo;Die Website&ldquo;), verwendet Cookies und ähnliche Technologien (der Einfachheit halber werden all diese unter &bdquo;Cookies&ldquo; zusammengefasst). Cookies werden außerdem von uns beauftragten Drittparteien platziert.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">2. Was sind Cookies?</h2>
                        <p>
                            Ein Cookie ist eine kleine, einfache Datei, die mit den Seiten dieser Website gesendet und von Ihrem Browser auf der Festplatte Ihres Computers oder eines anderen Geräts gespeichert wird. Die darin gespeicherten Informationen können bei späteren Besuchen an unsere Server oder die Server der relevanten Drittparteien zurückgesendet werden.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b border-slate-200 pb-6">
                        <h2 className="text-base font-black text-slate-900">3. Cookie-Kategorien</h2>
                        <div className="space-y-3">
                            <div className="p-4 bg-slate-50 rounded-tile-md border border-slate-200">
                                <h3 className="font-bold text-slate-900 text-sm mb-1">Technisch notwendige / Funktionale Cookies (Immer aktiv)</h3>
                                <p>
                                    Einige Cookies stellen sicher, dass bestimmte Teile der Website einwandfrei funktionieren und Ihre Benutzervorlieben bekannt bleiben (z. B. Navigation, Formularzustände). Diese dürfen ohne vorherige Einwilligung gesetzt werden.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-tile-md border border-slate-200">
                                <h3 className="font-bold text-slate-900 text-sm mb-1">Präferenz- &amp; Einstellungs-Cookies</h3>
                                <p>
                                    Präferenz-Cookies ermöglichen es der Website, sich an Informationen zu erinnern, die das Verhalten oder Aussehen der Website verändern (z. B. Ihre bevorzugte Region im Konfigurator).
                                </p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-tile-md border border-slate-200">
                                <h3 className="font-bold text-slate-900 text-sm mb-1">Statistik- &amp; Analyse-Cookies</h3>
                                <p>
                                    Wir verwenden analytische Cookies, um das Nutzungserlebnis für unsere Besucher zu optimieren und anonyme Einblicke in die Nutzung unserer Rechner und Konfiguratoren zu erhalten.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                        <h2 className="text-base font-black text-slate-900">4. Zustimmung verwalten &amp; widerrufen</h2>
                        <p>
                            Wenn Sie unsere Website zum ersten Mal besuchen, zeigen wir Ihnen ein Pop-up mit einer Erklärung zu Cookies an. Sobald Sie auf &bdquo;Einstellungen speichern&ldquo; klicken, geben Sie uns Ihr Einverständnis, die von Ihnen gewählten Kategorien von Cookies zu verwenden. Sie können die Verwendung von Cookies jederzeit über Ihren Browser oder unsere Cookie-Einstellungen deaktivieren bzw. widerrufen.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3 justify-between items-center text-sm font-bold">
                        <Link href="/" className="text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">&larr; Zurück zur Startseite</Link>
                        <Link href="/datenschutz" className="text-slate-700 hover:text-orange-700">Zur Datenschutzerklärung &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
