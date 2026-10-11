import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Hinweis from '@/components/kern/Hinweis';
import { hilfeKlassen, knopfKlassen, kontrollKlassen, labelKlassen, pflichtKlassen } from '@/components/kern/stile';
import { TIMING_OPTIONS } from '@/lib/formulare/useFliesenKonfigurator';
import { inputClass, linkClass } from './stile';
import Auswahlgruppe from './Auswahlgruppe';
import ResultSummary from './ResultSummary';

// Schritt 4: Zusammenfassung und Kontakt (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
// E3-BAU-14: Darstellung nach KERN wie Schritt1–3 (Felder mit Pflichtmarke, Auswahlgruppe, Hinweis für den Sendefehler,
// Knöpfe über knopfKlassen mit data-motion); Texte, IDs, name/value der Absende-Knöpfe, ARIA, Bedingungen, Reihenfolge
// und Nutzlast unverändert.
export default function Schritt4({ data, update, goToStep, handleSubmit, isSubmitting, errorMessage }) {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <ResultSummary data={data} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
                <div>
                    <label htmlFor="fk-name" className={labelKlassen}>
                        Name <span className={pflichtKlassen}>*</span>
                    </label>
                    <input
                        id="fk-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Vor- und Nachname"
                        value={data.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="fk-phone" className={labelKlassen}>
                        Telefon- oder Mobilnummer <span className={pflichtKlassen}>*</span>
                    </label>
                    <input
                        id="fk-phone"
                        type="tel"
                        required
                        minLength={6}
                        autoComplete="tel"
                        placeholder="Für die Rücksprache zum Aufmaß"
                        value={data.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="fk-email" className={labelKlassen}>E-Mail-Adresse (optional)</label>
                    <input
                        id="fk-email"
                        type="email"
                        autoComplete="email"
                        placeholder="ihre-adresse@beispiel.de"
                        value={data.email}
                        onChange={(e) => update({ email: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="fk-zip" className={labelKlassen}>PLZ &amp; Ort des Projekts</label>
                    <input
                        id="fk-zip"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="PLZ und Ort"
                        value={data.zipCity}
                        onChange={(e) => update({ zipCity: e.target.value })}
                        className={inputClass}
                    />
                </div>
            </div>

            <Auswahlgruppe
                legend="Gewünschter Zeitraum:"
                options={TIMING_OPTIONS.map((t) => ({ id: t, label: t }))}
                value={data.timing}
                columns="grid-cols-1 sm:grid-cols-3"
                onChange={(id) => update({ timing: id })}
            />

            <div>
                <label htmlFor="fk-notes" className={labelKlassen}>Notiz (optional)</label>
                <textarea
                    id="fk-notes"
                    rows={3}
                    placeholder="z. B. Raummaße, Wunschfliese, Besonderheiten am Untergrund …"
                    value={data.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                />
                <p className={hilfeKlassen}>Fotos senden Sie gern im Anschluss per WhatsApp nach.</p>
            </div>

            <label className="flex items-start gap-3 text-fs-2 text-tinte">
                <input
                    type="checkbox"
                    required
                    checked={data.privacyConsent}
                    onChange={(e) => update({ privacyConsent: e.target.checked })}
                    className={kontrollKlassen}
                />
                <span>
                    Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der{' '}
                    <Link href="/datenschutz" className={linkClass}>Datenschutzerklärung</Link>.{' '}
                    <span className={pflichtKlassen}>*</span>
                </span>
            </label>

            {errorMessage && (
                <Hinweis art="fehler" rolle="alert">
                    {errorMessage}
                </Hinweis>
            )}

            <div className="flex flex-col gap-4 border-t border-fuge pt-6">
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                    <button
                        type="submit"
                        name="channel"
                        value="online"
                        disabled={isSubmitting}
                        className={knopfKlassen('haupt', 'w-full sm:flex-1')}
                        data-motion="druck"
                    >
                        {isSubmitting ? (
                            <span className="flex flex-col items-center gap-2">
                                <span>Wird übertragen …</span>
                                <span className="laden-fuge w-16" data-motion="laden" aria-hidden="true" />
                            </span>
                        ) : (
                            <>
                                Online absenden (mit E-Mail-Bestätigung)
                                <Icon name="pfeil-rechts" groesse={5} />
                            </>
                        )}
                    </button>
                    <button
                        type="submit"
                        name="channel"
                        value="whatsapp"
                        disabled={isSubmitting}
                        className={knopfKlassen('neben', 'w-full sm:w-auto')}
                        data-motion="druck"
                    >
                        <Icon name="sprechblase" groesse={5} />
                        Per WhatsApp senden
                    </button>
                </div>
                <p className="flex items-start gap-2 text-fs-1 text-tinte-2">
                    <Icon name="schloss" groesse={4} className="mt-px" />
                    <span>
                        Bei Online-Absendung erhalten Sie unmittelbar eine schriftliche Zusammenfassung per E-Mail. Bei Auswahl von WhatsApp öffnet sich WhatsApp mit Ihren vorbereiteten Angaben.
                    </span>
                </p>
            </div>

            <div className="flex justify-start">
                <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className={knopfKlassen('text')}
                    data-motion="druck"
                >
                    <Icon name="pfeil-links" groesse={5} />
                    Zurück zu Schritt 3
                </button>
            </div>
        </form>
    );
}
