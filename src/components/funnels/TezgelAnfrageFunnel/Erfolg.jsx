import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

// Erfolgsansicht nach dem Absenden (E2-ORCH-08: Darstellung nach KERN; Texte und Verhalten unverändert, ohne Emoji).
export default function Erfolg({ name, email, referenceId, projectTitle, finalArea, locationText, handleNewRequest }) {
    return (
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12" role="status">
          <div className="flex flex-wrap items-center gap-3">
            <span className={etikettKlassen}>
              <Icon name="haken" groesse={4} className="text-abnahme" />
              Anfrage erfolgreich übermittelt
            </span>
            {referenceId && (
              <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                Vorgangsnummer: {referenceId}
              </span>
            )}
          </div>
          <p className="mt-6 font-anzeige text-fs-6 font-semibold text-tinte">Vielen Dank, {name}!</p>
          <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
            Ihre Anfrage für <strong className="font-semibold text-tinte">{projectTitle}</strong> ({finalArea}) in <strong className="font-semibold text-tinte">{locationText}</strong> ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
            {email && (
              <span className="mt-3 block border-l-2 border-tinte pl-4 text-fs-2 text-tinte">
                Eine ausführliche Bestätigung mit allen Angaben wurde an <em>{email}</em> gesendet.
              </span>
            )}
          </p>

          <div className="mt-8 border-t border-fuge pt-6 text-fs-2 text-tinte-2">
            <div className="flex items-center gap-2 font-semibold text-tinte">
              <Icon name="uhr" groesse={4} />
              Nächste Schritte:
            </div>
            <p className="mt-2">
              1. Unser Team prüft Ihre Angaben und schätzt den Aufwand für Material und Zeit.<br />
              2. Herr Tezgel meldet sich binnen <strong className="font-semibold text-tinte">24 bis 48 Stunden</strong> telefonisch und vereinbart den kostenfreien Termin bei Ihnen vor Ort.
            </p>
          </div>

          <figure className="mt-8 border-l-2 border-tinte pl-6">
            <blockquote className="text-fs-3 text-tinte">&bdquo;{COMPANY_DATA.motto}&ldquo;</blockquote>
            <figcaption className="mt-2 font-mono text-fs-1 text-tinte-2">{COMPANY_DATA.owner.fullName}, Fachbetrieb Aßlar</figcaption>
          </figure>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon">
              Direkt anrufen: {COMPANY_DATA.contact.phone}
            </Knopf>
            <Knopf
              variante="neben"
              onClick={handleNewRequest}
            >
              Weitere Anfrage starten
            </Knopf>
          </div>
        </div>
    );
}
