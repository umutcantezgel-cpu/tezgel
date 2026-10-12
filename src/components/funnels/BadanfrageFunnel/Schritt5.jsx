import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { labelKlassen, linkKlassen, pflichtKlassen } from '@/components/kern/stile';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { COMPANY_DATA } from '@/config/company';
import { frageClass, inputClass, nummerClass } from './stile';

// Schritt 5: Kontaktdaten und Absenden (Q-01: Darstellung nach KERN v2 wie die Express-Anfrage; Texte, IDs, Namen,
// autocomplete und Verhalten unverändert). Die Fehlermeldung steht direkt über den Knöpfen, die sie auslösen
// (Absenden bzw. WhatsApp ohne Name und Telefon): Versatz-Zeichen + Text + role="alert".
export default function Schritt5({ setStep, status, errorMessage, formData, setFormData, handleWhatsApp, handleOnlineSubmit }) {
    return (
        <form onSubmit={handleOnlineSubmit} className="flex flex-col gap-6">
            <div>
                <p className={frageClass}>
                    <span className={nummerClass}>5.</span> Kontaktdaten &amp; Versand Ihrer Anfrage
                </p>
                <p className="mt-2 max-w-mass text-fs-2 text-tinte-2">
                    Senden Sie Ihre Badanfrage direkt online an {COMPANY_DATA.owner.fullName} oder nutzen Sie WhatsApp. Keine
                    Weitergabe an Dritte.
                </p>
            </div>

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

            <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-2 @3xl:gap-4">
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
                    <label htmlFor="badanfrage-email" className={labelKlassen}>
                        E-Mail-Adresse <span className="font-normal text-tinte-2">(optional)</span>
                    </label>
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
                    <label htmlFor="badanfrage-street" className={labelKlassen}>
                        Straße &amp; Hausnummer <span className="font-normal text-tinte-2">(optional)</span>
                    </label>
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
                <label htmlFor="badanfrage-notes" className={labelKlassen}>
                    Anmerkungen oder besondere Wünsche <span className="font-normal text-tinte-2">(optional)</span>
                </label>
                <textarea
                    id="badanfrage-notes"
                    rows={3}
                    placeholder="z. B. Pflegegrad vorhanden, Nischenlösung gewünscht, Altbau-Besonderheiten …"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                />
            </div>

            <div className="flex flex-col gap-4 border-t border-fuge pt-6">
                {errorMessage && (
                    <div className="flex items-start gap-3 border-l-2 border-laser bg-kalk p-4 text-fs-2 text-tinte" role="alert">
                        <Icon name="fehler" groesse={5} className="mt-px text-laser-tief" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <div className="flex flex-col items-stretch gap-3 @2xl:flex-row @2xl:items-center">
                    <Knopf
                        type="submit"
                        laedt={status === 'submitting'}
                        ladeText="Übermittle Anfrage an Fachbetrieb …"
                        icon="pfeil-rechts"
                        className="w-full @2xl:flex-1"
                    >
                        Badanfrage jetzt absenden (Online)
                    </Knopf>
                    <Knopf
                        variante="neben"
                        onClick={handleWhatsApp}
                        deaktiviert={status === 'submitting'}
                        vorne={<WhatsAppLogo className="size-5 shrink-0" />}
                        className="w-full @2xl:w-auto"
                    >
                        Per WhatsApp
                    </Knopf>
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

            <div className="flex justify-start">
                <Knopf variante="text" onClick={() => setStep(4)} iconLinks="pfeil-links">
                    Zurück zu Schritt 4
                </Knopf>
            </div>
        </form>
    );
}
