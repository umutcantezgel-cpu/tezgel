import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Hinweis from '@/components/kern/Hinweis';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { kontrollKlassen, knopfKlassen, pflichtKlassen } from '@/components/kern/stile';
import { TIMING_OPTIONS } from '@/lib/formulare/useFliesenKonfigurator';
import { hintClass, inputClass, labelClass, linkClass, zusatzClass } from './stile';
import OptionGroup from './OptionGroup';
import ResultSummary from './ResultSummary';

// Schritt 4: Zusammenfassung und Kontakt (F-06, Fusion E-039; Grundgerüst B): Ergebnis als Schriftfeld, Felder mit
// Beschriftung darüber und abgesetztem „(optional)“, Zeitraum im Fugenraster mit Haken (A), Sendefehler als Hinweis „fehler“
// mit role="alert" und verstecktem Vorsatz „Fehler:“ (A) direkt über den Knöpfen, ein Hauptknopf (online) mit aria-busy
// beim Senden, WhatsApp als Nebenknopf mit Markenzeichen (B); Einwilligung und Fußnote im Zeilenmaß max-w-mass (A).
// Beide Absende-Knöpfe bleiben type="submit" mit name="channel" (der Hook liest den auslösenden Knopf); Texte, IDs,
// autocomplete, Pflichtfelder und Verhalten unverändert.
export default function Schritt4({ data, update, goToStep, handleSubmit, isSubmitting, errorMessage }) {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <ResultSummary data={data} />

            <div className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @xl:gap-4">
                <div>
                    <label htmlFor="fk-name" className={labelClass}>
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
                    <label htmlFor="fk-phone" className={labelClass}>
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
                    <label htmlFor="fk-email" className={labelClass}>
                        E-Mail-Adresse <span className={zusatzClass}>(optional)</span>
                    </label>
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
                    <label htmlFor="fk-zip" className={labelClass}>PLZ &amp; Ort des Projekts</label>
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

            <OptionGroup
                legend="Gewünschter Zeitraum:"
                options={TIMING_OPTIONS.map((t) => ({ id: t, label: t }))}
                value={data.timing}
                muster="drei"
                onChange={(id) => update({ timing: id })}
            />

            <div>
                <label htmlFor="fk-notes" className={labelClass}>
                    Notiz <span className={zusatzClass}>(optional)</span>
                </label>
                <textarea
                    id="fk-notes"
                    rows={3}
                    placeholder="z. B. Raummaße, Wunschfliese, Besonderheiten am Untergrund …"
                    value={data.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                />
                <p className={hintClass}>Fotos senden Sie gern im Anschluss per WhatsApp nach.</p>
            </div>

            <label className="flex max-w-mass cursor-pointer items-start gap-3 font-text text-fs-2 text-tinte">
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
                <div className="flex flex-col items-stretch gap-3 @xl:flex-row @xl:items-center">
                    <button
                        type="submit"
                        name="channel"
                        value="online"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting || undefined}
                        className={knopfKlassen('haupt', 'w-full @xl:w-auto @xl:flex-1')}
                        data-motion="druck"
                    >
                        {isSubmitting ? (
                            <span className="flex flex-col items-center gap-2">
                                <span>Wird übertragen …</span>
                                <span className="laden-fuge w-16" data-motion="laden" aria-hidden="true" />
                            </span>
                        ) : (
                            <>
                                <span>Online absenden (mit E-Mail-Bestätigung)</span>
                                <Icon name="pfeil-rechts" groesse={5} />
                            </>
                        )}
                    </button>
                    <button
                        type="submit"
                        name="channel"
                        value="whatsapp"
                        disabled={isSubmitting}
                        className={knopfKlassen('neben', 'w-full @xl:w-auto')}
                        data-motion="druck"
                    >
                        <WhatsAppLogo className="size-5 shrink-0" />
                        <span>Per WhatsApp senden</span>
                    </button>
                </div>
                <p className="flex max-w-mass items-start gap-2 font-text text-fs-1 text-tinte-2">
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
