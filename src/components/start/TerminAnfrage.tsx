// Startseite · 6 Nächster Schritt (KERN v3 K-009, E-012; Text REF-start): das eine Formular der Startseite.
// H2 mit id „termin“ ist das Ziel aller Hauptknöpfe auf `/`. Links der Satz; rechts die Anfrage mit der vorhandenen Logik
// (HeroContactForm: Pflicht Name und Telefon, Ziel general, Empfänger unverändert, G8) und darunter Anruf, WhatsApp und
// Öffnungszeiten (aus COMPANY_DATA, Zeilen nach den Schreibregeln). Mobil folgt das Formular direkt auf Überschrift und
// Satz, damit es nach dem Sprung zu #termin sofort im Bild steht. Fläche Fliese als Abschluss vor dem Fuß.
// Serverkomponente mit der Formular-Insel.
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import HeroContactForm from '@/components/forms/HeroContactForm';
import Abschnitt from '@/components/kern/Abschnitt';
import { linkKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { oeffnungszeilen } from '@/lib/oeffnungszeiten';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';

export default function TerminAnfrage() {
  const { contact } = COMPANY_DATA;
  return (
    <Abschnitt
      titelId="termin"
      formel="schritt"
      leitachse
      flaeche="fliese"
      kopf="seitlich"
      titel="Termin vor Ort anfragen"
      einleitung={
        <p>
          Schreiben Sie uns Ihren Namen und Ihre Telefonnummer. Deniz Tezgel ruft Sie zurück und macht einen Termin mit
          Ihnen aus.
        </p>
      }
    >
      <HeroContactForm titel={false} />
      <div className="mt-8 grid gap-6 border-t border-fuge pt-6 md:grid-cols-3">
        <div>
          <p className="font-text text-fs-3 text-tinte">Lieber anrufen?</p>
          <a
            href={`tel:${contact.phoneLink}`}
            data-motion="zustand"
            className={`${linkKlassen} mt-1 inline-flex min-h-11 items-center gap-2 font-mono text-fs-3`}
          >
            <Icon name="telefon" groesse={5} />
            {contact.phone}
          </a>
        </div>
        <div>
          <p className="font-text text-fs-3 text-tinte">Lieber schreiben?</p>
          <a
            href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht('/'))}
            target="_blank"
            rel="noopener noreferrer"
            data-motion="zustand"
            className={`${linkKlassen} mt-1 inline-flex min-h-11 items-center gap-2 font-text text-fs-3`}
          >
            <WhatsAppLogo className="size-5" />
            Nachricht per WhatsApp
          </a>
        </div>
        <div>
          <h3 className="font-text text-fs-3 font-semibold text-tinte">Wann Sie uns erreichen</h3>
          <ul className="mt-2 font-text text-fs-2 text-tinte-2">
            {oeffnungszeilen().map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
        </div>
      </div>
    </Abschnitt>
  );
}
