import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Hinweis from '@/components/kern/Hinweis';
import { knopfKlassen, labelKlassen, linkKlassen, pflichtKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { inputClass } from './stile';

// Schritt 5: Kontaktdaten und Absenden (E-011: aus BadanfrageFunnel.jsx verschoben). E3-BAU-17: Darstellung nach dem
// KERN-Formularmuster. V-03: Sendefehler als Hinweis (art fehler, rolle alert), Text unverändert. Texte, IDs, Labels,
// Namen und Nutzlast unverändert.
export default function Schritt5({ setStep, status, errorMessage, formData, setFormData, handleWhatsApp, handleOnlineSubmit }) {
    return (
        <form onSubmit={handleOnlineSubmit} className="space-y-4">
            <p className={`${labelKlassen} mb-1`}>
                5. Kontaktdaten &amp; Versand Ihrer Anfrage
            </p>
            <p className="text-fs-2 text-tinte-2 mb-4">
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
                <Hinweis art="fehler" rolle="alert">
                    {errorMessage}
                </Hinweis>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="badanfrage-name" className={labelKlassen}>
                        Vor- &amp; Nachname <span className={pflichtKlassen}>*</span>
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
                    <label htmlFor="badanfrage-phone" className={labelKlassen}>
                        Telefonnummer für Rückfragen <span className={pflichtKlassen}>*</span>
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
                    <label htmlFor="badanfrage-email" className={labelKlassen}>E-Mail-Adresse (optional)</label>
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
                    <label htmlFor="badanfrage-street" className={labelKlassen}>Straße &amp; Hausnummer (optional)</label>
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
                <label htmlFor="badanfrage-zip" className={labelKlassen}>PLZ &amp; Ort des Bauvorhabens</label>
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
                <label htmlFor="badanfrage-notes" className={labelKlassen}>Anmerkungen oder besondere Wünsche (optional)</label>
                <textarea
                    id="badanfrage-notes"
                    rows={3}
                    placeholder="z. B. Pflegegrad vorhanden, Nischenlösung gewünscht, Altbau-Besonderheiten …"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                />
            </div>

            <div className="pt-4 border-t border-fuge space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={knopfKlassen('haupt', 'w-full sm:flex-1')}
                        data-motion="druck"
                    >
                        {status === 'submitting' ? (
                            <span className="flex flex-col items-center gap-2">
                                <span>Übermittle Anfrage an Fachbetrieb …</span>
                                <span className="laden-fuge w-16" aria-hidden="true" />
                            </span>
                        ) : (
                            <>
                                <span>Badanfrage jetzt absenden (Online)</span>
                                <Icon name="pfeil-rechts" groesse={5} />
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleWhatsApp}
                        disabled={status === 'submitting'}
                        className={knopfKlassen('neben', 'w-full sm:w-auto')}
                        data-motion="druck"
                    >
                        <Icon name="sprechblase" groesse={5} />
                        <span>Per WhatsApp</span>
                    </button>
                </div>

                <p className="flex items-start gap-2 text-fs-1 text-tinte-2">
                    <Icon name="schloss" groesse={4} className="mt-px" />
                    <span>
                        Ihre Angaben werden vertraulich zur Angebotserstellung genutzt. Beim optionalen Versand per WhatsApp gelten
                        zusätzlich die Richtlinien von WhatsApp. Mehr in unserer{' '}
                        <Link href="/datenschutz" className={linkKlassen}>
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
                    className={knopfKlassen('text')}
                    data-motion="druck"
                >
                    <Icon name="pfeil-links" groesse={5} />
                    Zurück zu Schritt 4
                </button>
            </div>
        </form>
    );
}
