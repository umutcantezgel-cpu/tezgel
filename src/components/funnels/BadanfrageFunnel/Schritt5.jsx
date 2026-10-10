import Link from 'next/link';
import { ArrowLeft, Send, MessageCircle, Lock, Loader2, AlertCircle } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { inputClass } from './stile';

// Schritt 5: Kontaktdaten und Absenden (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
export default function Schritt5({ setStep, status, errorMessage, formData, setFormData, handleWhatsApp, handleOnlineSubmit }) {
    return (
        <form onSubmit={handleOnlineSubmit} className="space-y-4">
            <p className="text-base sm:text-lg font-black text-slate-900 mb-1">
                5. Kontaktdaten &amp; Versand Ihrer Anfrage
            </p>
            <p className="text-sm text-slate-700 mb-4">
                Senden Sie Ihre Badanfrage direkt online an {COMPANY_DATA.owner.fullName} oder nutzen Sie WhatsApp. Keine
                Weitergabe an Dritte.
            </p>

            {/* Anti-spam honeypot */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor="badanfrage-hp">Nicht ausfüllen</label>
                <input
                    type="text"
                    id="badanfrage-hp"
                    name="badanfrage-hp"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5 font-medium" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="badanfrage-name" className="block text-sm font-bold text-slate-800 mb-1.5">
                        Vor- &amp; Nachname <span className="text-orange-600">*</span>
                    </label>
                    <input
                        id="badanfrage-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Vor- und Nachname"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="badanfrage-phone" className="block text-sm font-bold text-slate-800 mb-1.5">
                        Telefonnummer für Rückfragen <span className="text-orange-600">*</span>
                    </label>
                    <input
                        id="badanfrage-phone"
                        type="tel"
                        required
                        minLength={6}
                        autoComplete="tel"
                        placeholder="Für die Rücksprache zum Aufmaß"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="badanfrage-email" className="block text-sm font-bold text-slate-800 mb-1.5">E-Mail-Adresse (optional)</label>
                    <input
                        id="badanfrage-email"
                        type="email"
                        autoComplete="email"
                        placeholder="ihre-adresse@beispiel.de"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="badanfrage-street" className="block text-sm font-bold text-slate-800 mb-1.5">Straße &amp; Hausnummer (optional)</label>
                    <input
                        id="badanfrage-street"
                        type="text"
                        autoComplete="street-address"
                        placeholder="Straße und Hausnummer"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className={inputClass}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="badanfrage-zip" className="block text-sm font-bold text-slate-800 mb-1.5">PLZ &amp; Ort des Bauvorhabens</label>
                <input
                    id="badanfrage-zip"
                    type="text"
                    autoComplete="postal-code"
                    placeholder="z. B. 35614 Aßlar"
                    value={formData.zipCity}
                    onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="badanfrage-notes" className="block text-sm font-bold text-slate-800 mb-1.5">Anmerkungen oder besondere Wünsche (optional)</label>
                <textarea
                    id="badanfrage-notes"
                    rows={3}
                    placeholder="z. B. Pflegegrad vorhanden, Nischenlösung gewünscht, Altbau-Besonderheiten …"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-primary w-full sm:flex-1 text-sm justify-center py-3.5 shadow-md shadow-orange-900/10 disabled:opacity-50"
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Übermittle Anfrage an Fachbetrieb …</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>Badanfrage jetzt absenden (Online)</span>
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleWhatsApp}
                        disabled={status === 'submitting'}
                        className="glass-button-whatsapp w-full sm:w-auto text-sm justify-center py-3.5 disabled:opacity-50"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Per WhatsApp</span>
                    </button>
                </div>

                <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
                    <Lock className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span>
                        Ihre Angaben werden vertraulich zur Angebotserstellung genutzt. Beim optionalen Versand per WhatsApp gelten
                        zusätzlich die Richtlinien von WhatsApp. Mehr in unserer{' '}
                        <Link href="/datenschutz" className="font-bold text-orange-600 underline underline-offset-2 hover:text-orange-700">
                            Datenschutzerklärung
                        </Link>
                        .
                    </span>
                </p>
            </div>

            <div className="pt-1 flex justify-start">
                <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Zurück zu Schritt 4
                </button>
            </div>
        </form>
    );
}
