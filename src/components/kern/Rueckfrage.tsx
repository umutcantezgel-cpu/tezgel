// Rückfrage (KERN K-009; E4-NACH-01): Spalte neben einem Anfrageweg (Funnel, Konfigurator, Formular) – der Ansprechpartner
// und seine direkten Wege als Schriftfeld, ab lg klebend. Ersetzt die leere Rasterspalte neben Formularen in Lesebreite
// (E3-SICHT-ERZ Befunde 15, 30, 34). Alle Werte aus COMPANY_DATA; Wege wie im Fuß (tel:, WhatsApp, mailto:).
import clsx from 'clsx';
import Schriftfeld from './Schriftfeld';
import { linkKlassen } from './stile';
import { COMPANY_DATA } from '@/config/company';

export default function Rueckfrage({ className }: { className?: string }) {
  const { owner, contact, headquarters } = COMPANY_DATA;
  return (
    <aside aria-label="Ansprechpartner" className={clsx('lg:sticky lg:top-24', className)}>
      <Schriftfeld
        spalten={1}
        felder={[
          { etikett: 'Ansprechpartner', wert: <span className="font-semibold">{owner.fullName}</span> },
          {
            etikett: 'Telefon',
            wert: (
              <a href={`tel:${contact.phoneLink}`} className={clsx(linkKlassen, 'font-mono')}>
                {contact.phone}
              </a>
            ),
          },
          {
            etikett: 'Mobil & WhatsApp',
            wert: (
              <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className={clsx(linkKlassen, 'font-mono')}>
                {contact.mobile}
              </a>
            ),
          },
          {
            etikett: 'E-Mail',
            wert: (
              <a href={`mailto:${contact.email}`} className={linkKlassen}>
                {contact.email}
              </a>
            ),
          },
          { etikett: 'Sitz', wert: <>{headquarters.street}, <span className="font-mono">{headquarters.postalCode}</span> {headquarters.city}</> },
        ]}
      />
    </aside>
  );
}
